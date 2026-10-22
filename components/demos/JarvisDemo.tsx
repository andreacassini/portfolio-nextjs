'use client';

import { useRef, useState } from 'react';
import type { Lang } from '@/lib/projects';

/* TypeScript port of jarvis-core: core/planner.py, core/policy.py and the skills' specs. */
type Action = { type: string; params: Record<string, unknown> };
type Plan = { actions: Action[]; needs_clarification: boolean; question?: string };
type Pending = { actionType: string; params: Record<string, unknown>; missing: string; question: string };
type Risk = 'low' | 'medium' | 'high';

const RISK: Record<string, Risk> = { 'system.help': 'low', 'system.status': 'low', 'pc.open_app': 'medium', 'pc.shutdown': 'high' };
const VERB_OPEN = ['apri', 'lancia', 'avvia', 'start'];
const VERB_STATUS = ['stato', 'status', 'come va', 'come sta'];
const VERB_SHUTDOWN = ['spegni', 'arresta', 'shutdown'];

const norm = (t: string) => t.trim().toLowerCase().replace(/\s+/g, ' ');
const mentionsPc = (t: string) => ['pc', 'computer', 'fisso', 'windows'].some((x) => t.includes(x));
const extractApp = (t: string) => t.match(/\b(?:apri|lancia|avvia|start)\b\s+([a-z0-9._-]+)/)?.[1] ?? null;

function plan(text: string, pending: Pending | null): { plan: Plan; pending: Pending | null } {
  const t = norm(text);
  if (pending) {
    if (pending.missing === 'confirm') {
      const confirm = ['confermo', 'si', 'ok'].some((x) => t.includes(x));
      if (!confirm) return { plan: { actions: [], needs_clarification: true, question: 'Ok, annullato. Dimmi cosa vuoi fare.' }, pending: null };
      return { plan: { actions: [{ type: pending.actionType, params: { ...pending.params, confirm: true } }], needs_clarification: false }, pending: null };
    }
    return { plan: { actions: [{ type: pending.actionType, params: { ...pending.params, [pending.missing]: t } }], needs_clarification: false }, pending: null };
  }
  if (t === 'help' || t === 'aiuto' || t.includes('cosa sai fare')) return { plan: { actions: [{ type: 'system.help', params: {} }], needs_clarification: false }, pending: null };
  if (VERB_STATUS.some((v) => t.includes(v))) return { plan: { actions: [{ type: 'system.status', params: { target: mentionsPc(t) ? 'pc' : 'system' } }], needs_clarification: false }, pending: null };
  if (VERB_OPEN.some((v) => t.includes(v))) {
    const app = extractApp(t);
    if (app) {
      if (!mentionsPc(t)) {
        const q = 'Vuoi che lo faccia sul PC Windows fisso? (si/no)';
        return { plan: { actions: [], needs_clarification: true, question: q }, pending: { actionType: 'pc.open_app', params: { app }, missing: 'confirm', question: q } };
      }
      return { plan: { actions: [{ type: 'pc.open_app', params: { app } }], needs_clarification: false }, pending: null };
    }
  }
  if (VERB_SHUTDOWN.some((v) => t.includes(v)) && mentionsPc(t)) {
    const q = 'Azione critica: vuoi spegnere davvero il PC? (di: CONFERMO)';
    return { plan: { actions: [], needs_clarification: true, question: q }, pending: { actionType: 'pc.shutdown', params: {}, missing: 'confirm', question: q } };
  }
  return { plan: { actions: [], needs_clarification: true, question: 'Non ho capito. Puoi riformulare?' }, pending: null };
}

function policy(a: Action): [boolean, string] {
  if (a.type === 'pc.shutdown' && a.params.confirm !== true) return [false, 'Mi serve una conferma esplicita (CONFERMO).'];
  return [true, ''];
}

function run(a: Action): string {
  if (a.type === 'pc.open_app') return `Ok. Richiesta apertura '${a.params.app ?? ''}' inviata al PC.`;
  if (a.type === 'pc.shutdown') return 'Ok. Richiesta di spegnimento inviata al PC.';
  if (a.type === 'system.help') return "Sono Jarvis Core. Posso orchestrare skill modulari. Esempi: 'apri chrome', 'stato', 'spegni pc'. Quando e' ambiguo, faccio domande.";
  if (a.type === 'system.status') return `Tutto ok. Target richiesto: ${a.params.target ?? 'system'}.`;
  return 'Azione non gestita.';
}

type Msg = { who: 'me' | 'ai'; text: string; plan?: Plan; blocked?: boolean };

const T = {
  en: { hint: 'The assistant speaks Italian, like the original. Try:', ph: 'Type a command, e.g. apri chrome', send: 'Send', plan: 'Plan produced', risk: 'risk', none: 'no actions (clarification needed)', blocked: 'blocked by policy', note: 'This is a TypeScript port of the planner and policy from the repository. The Windows connector is a simulation there too: nothing is executed.', reset: 'Reset session' },
};

export default function JarvisDemo({ lang }: { lang: Lang }) {
  const c = T[lang];
  const [msgs, setMsgs] = useState<Msg[]>([{ who: 'ai', text: "Sono Jarvis Core. Scrivi 'aiuto' per vedere cosa so fare." }]);
  const [text, setText] = useState('');
  const pending = useRef<Pending | null>(null);
  const log = useRef<HTMLDivElement>(null);

  const send = (q: string) => {
    if (!q.trim()) return;
    const r = plan(q, pending.current);
    pending.current = r.pending;
    const out: Msg[] = [{ who: 'me', text: q }];
    if (r.plan.needs_clarification) {
      out.push({ who: 'ai', text: r.plan.question ?? 'Mi serve un chiarimento.', plan: r.plan });
    } else {
      const speeches: string[] = [];
      let blocked = false;
      for (const a of r.plan.actions) {
        const [ok, why] = policy(a);
        if (!ok) { speeches.length = 0; speeches.push(why); blocked = true; break; }
        speeches.push(run(a));
      }
      out.push({ who: 'ai', text: speeches.join(' ') || 'Ok.', plan: r.plan, blocked });
    }
    setMsgs((m) => [...m, ...out]);
    setText('');
    setTimeout(() => log.current?.scrollTo({ top: log.current.scrollHeight }), 30);
  };

  return (
    <div className="dm">
      <div className="dm-log" ref={log} aria-live="polite">
        {msgs.map((m, i) => (
          <div key={i} className={`bub ${m.who}`}>
            <div>{m.text}</div>
            {m.plan && (
              <div className="plan mo">
                <b>{c.plan}</b>
                {m.plan.actions.length === 0 ? <span>{c.none}</span> : m.plan.actions.map((a, k) => (
                  <span key={k}>{a.type} {JSON.stringify(a.params)} <i className={`rk ${RISK[a.type]}`}>{c.risk}: {RISK[a.type]}</i>{m.blocked ? <i className="rk high"> {c.blocked}</i> : null}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="dm-sg"><span className="mo">{c.hint}</span>{['aiuto', 'apri chrome', 'stato del pc', 'spegni il pc'].map((s) => <button key={s} onClick={() => send(s)}>{s}</button>)}</div>
      <form className="dm-f" onSubmit={(e) => { e.preventDefault(); send(text); }}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder={c.ph} aria-label={c.ph} autoComplete="off" />
        <button className="btn p" type="submit">{c.send}</button>
        <button className="btn" type="button" onClick={() => { pending.current = null; setMsgs([{ who: 'ai', text: "Sessione azzerata. Scrivi 'aiuto'." }]); }}>{c.reset}</button>
      </form>
      <p className="dm-note">{c.note}</p>
    </div>
  );
}
