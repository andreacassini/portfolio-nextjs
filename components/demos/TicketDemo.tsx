'use client';

import { useMemo, useState } from 'react';
import type { Lang } from '@/lib/projects';

/* Invented sample defects. The real tool ranks defects from a Jira instance with OpenAI embeddings or a local model. */
const DEFECTS = [
  ['DEF-2101', 'Navigation route recalculation freezes after leaving a tunnel'],
  ['DEF-2102', 'Bluetooth audio drops when an incoming call is rejected'],
  ['DEF-2103', 'Head unit reboots when a second phone is connected over USB'],
  ['DEF-2104', 'Voice command does not recognise street names with accents'],
  ['DEF-2105', 'Map tiles flicker when zooming quickly on the instrument cluster'],
  ['DEF-2106', 'Wireless projection disconnects after 20 minutes of streaming'],
  ['DEF-2107', 'Climate controls are unresponsive for several seconds after wake from sleep'],
  ['DEF-2108', 'Navigation voice guidance repeats the same instruction twice'],
  ['DEF-2109', 'Media metadata shows the previous track title after skipping'],
  ['DEF-2110', 'Touchscreen registers ghost touches when the screen is wiped with a cloth'],
  ['DEF-2111', 'System reboots during the over-the-air update download'],
  ['DEF-2112', 'Hands-free call volume resets to default after each call'],
] as const;

const STOP = new Set('a an the of on in to when after with for is are and or at by from does not its it each several second again'.split(' '));
const tokens = (s: string) => s.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w && !STOP.has(w)).map((w) => (w.length > 4 ? w.replace(/(ing|ed|es|s)$/, '') : w));

function rank(query: string) {
  const docs = DEFECTS.map(([, t]) => tokens(t));
  const N = docs.length;
  const df = new Map<string, number>();
  docs.forEach((d) => new Set(d).forEach((w) => df.set(w, (df.get(w) ?? 0) + 1)));
  const idf = (w: string) => Math.log((N + 1) / ((df.get(w) ?? 0) + 1)) + 1;
  const vec = (ws: string[]) => { const v = new Map<string, number>(); ws.forEach((w) => v.set(w, (v.get(w) ?? 0) + idf(w))); return v; };
  const dot = (a: Map<string, number>, b: Map<string, number>) => { let s = 0; a.forEach((x, k) => { s += x * (b.get(k) ?? 0); }); return s; };
  const q = vec(tokens(query));
  return DEFECTS.map(([id, title], i) => { const d = vec(docs[i]); const den = Math.sqrt(dot(q, q)) * Math.sqrt(dot(d, d)); return { id, title, score: den ? dot(q, d) / den : 0 }; })
    .sort((a, b) => b.score - a.score).filter((r) => r.score > 0.05).slice(0, 5);
}

const T = {
  en: {
    desc: 'Defect description', priority: 'Priority', type: 'Incident type', stab: 'Stability type', occ: 'Stability occurrence', pick: 'Select',
    ok: 'This row would be processed and a ticket created.', skip: 'This row would be skipped and listed in the final summary:',
    r1: 'Priority is mandatory and must be Very High, High, Medium or Low.', r2: 'Incident type is mandatory: Stability or Functionality.', r3: 'Stability type is mandatory when the incident type is Stability.', r4: 'Stability occurrence is mandatory when the incident type is Stability.', r5: 'The description is empty.',
    sim: 'Similar existing defects', dup: 'Possible duplicate', rel: 'Related', none: 'Nothing similar yet.',
    note: 'Validation follows the rules of the real tool (priority and incident type are mandatory, stability fields are required for stability incidents). Ranking here is TF-IDF cosine similarity on invented sample defects. The real tool uses OpenAI embeddings or a local model on your Jira data.',
  },
  it: {
    desc: 'Descrizione del difetto', priority: 'Priorità', type: 'Tipo di incident', stab: 'Tipo di stabilità', occ: 'Occorrenza di stabilità', pick: 'Seleziona',
    ok: 'Questa riga verrebbe elaborata e creerebbe un ticket.', skip: 'Questa riga verrebbe saltata ed elencata nel riepilogo finale:',
    r1: 'La priorità è obbligatoria: Very High, High, Medium o Low.', r2: 'Il tipo di incident è obbligatorio: Stability o Functionality.', r3: 'Il tipo di stabilità è obbligatorio quando il tipo è Stability.', r4: 'L\'occorrenza di stabilità è obbligatoria quando il tipo è Stability.', r5: 'La descrizione è vuota.',
    sim: 'Difetti esistenti simili', dup: 'Possibile duplicato', rel: 'Correlato', none: 'Ancora nulla di simile.',
    note: 'La validazione segue le regole dello strumento vero (priorità e tipo obbligatori, campi di stabilità richiesti per gli incident di stabilità). Qui il ranking è una similarità coseno TF-IDF su difetti di esempio inventati. Lo strumento vero usa gli embedding OpenAI o un modello locale sui dati Jira.',
  },
};

export default function TicketDemo({ lang }: { lang: Lang }) {
  const c = T[lang];
  const [desc, setDesc] = useState('Navigation freezes for a few seconds after the vehicle exits a tunnel');
  const [pr, setPr] = useState('High');
  const [ty, setTy] = useState('Stability');
  const [st, setSt] = useState('Freeze');
  const [oc, setOc] = useState('Sporadic');
  const sim = useMemo(() => (desc.trim() ? rank(desc) : []), [desc]);
  const errs = [
    !desc.trim() && c.r5,
    !['Very High', 'High', 'Medium', 'Low'].includes(pr) && c.r1,
    !['Stability', 'Functionality'].includes(ty) && c.r2,
    ty === 'Stability' && !st.trim() && c.r3,
    ty === 'Stability' && !oc.trim() && c.r4,
  ].filter(Boolean) as string[];

  return (
    <div className="dm td">
      <div className="td-g">
        <div className="td-f">
          <label className="mo" htmlFor="td-d">{c.desc}</label>
          <textarea id="td-d" rows={4} value={desc} onChange={(e) => setDesc(e.target.value)} />
          <div className="td-r">
            <div><label className="mo" htmlFor="td-p">{c.priority}</label>
              <select id="td-p" value={pr} onChange={(e) => setPr(e.target.value)}><option value="">{c.pick}</option>{['Very High', 'High', 'Medium', 'Low'].map((x) => <option key={x}>{x}</option>)}</select></div>
            <div><label className="mo" htmlFor="td-t">{c.type}</label>
              <select id="td-t" value={ty} onChange={(e) => setTy(e.target.value)}><option value="">{c.pick}</option>{['Stability', 'Functionality'].map((x) => <option key={x}>{x}</option>)}</select></div>
          </div>
          <div className="td-r">
            <div><label className="mo" htmlFor="td-s">{c.stab}</label><input id="td-s" value={st} onChange={(e) => setSt(e.target.value)} /></div>
            <div><label className="mo" htmlFor="td-o">{c.occ}</label><input id="td-o" value={oc} onChange={(e) => setOc(e.target.value)} /></div>
          </div>
          <div className={`td-v ${errs.length ? 'bad' : 'good'}`} role="status">
            {errs.length === 0 ? c.ok : <><b>{c.skip}</b><ul>{errs.map((e) => <li key={e}>{e}</li>)}</ul></>}
          </div>
        </div>
        <div className="td-s">
          <h3 className="mo">{c.sim}</h3>
          {sim.length === 0 ? <p className="dm-note">{c.none}</p> : sim.map((s) => (
            <div key={s.id} className="sim">
              <div className="sim-h"><span className="mo">{s.id}</span><span className={`kd ${s.score >= 0.3 ? 'Negative' : 'Edge'}`}>{s.score >= 0.3 ? c.dup : c.rel}</span><b>{Math.round(s.score * 100)}%</b></div>
              <p>{s.title}</p>
              <div className="bar"><i style={{ width: `${Math.round(s.score * 100)}%` }} /></div>
            </div>
          ))}
        </div>
      </div>
      <p className="dm-note">{c.note}</p>
    </div>
  );
}
