'use client';

import { useMemo, useState } from 'react';
import type { Lang } from '@/lib/projects';

type Kind = 'Happy path' | 'Negative' | 'Boundary' | 'Edge';
type Case = { id: string; title: string; kind: Kind; priority: 'High' | 'Medium' | 'Low'; pre: string; steps: string[]; expected: string };
type Raw = Omit<Case, 'id'>;

const SAMPLE = 'The user can register with an email address and a password. The email must be unique and a valid address. The password must be at least 8 characters and contain a number. The age must be between 18 and 99. The verification link expires after 24 hours.';

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const sample = (field: string, len: number) => (/pass/.test(field) ? ('Aa1' + 'x'.repeat(Math.max(0, len - 3))).slice(0, Math.max(len, 0)) : 'x'.repeat(Math.max(len, 0)));
const open = 'Open the screen where this requirement applies';

/** Rule-based preview. The real TestCraft AI uses an LLM; these rules cover the patterns QA writes by hand. */
export function generate(text: string): Raw[] {
  const out: Raw[] = [];
  const sentences = text.split(/(?<=[.!?])\s+|\n+/).map((s) => s.trim()).filter(Boolean);
  for (const raw of sentences) {
    const s = raw.replace(/[.!?]+$/, '');
    const low = s.toLowerCase();
    const field = low.match(/^(?:the |a |an )?([a-z][a-z -]{1,28}?) (?:must|should|has to|needs to|cannot|can't|can not|can|is able to|may)\b/)?.[1]?.trim() ?? 'value';
    let matched = false;

    const can = low.match(/^(?:the |a |an )?([a-z][a-z -]{1,28}?) (?:can|is able to|may) (.+)$/);
    if (can) {
      matched = true;
      out.push({ title: `${cap(can[1])} can ${can[2]}`, kind: 'Happy path', priority: 'High', pre: 'The system is available and test data is prepared', steps: [open, `Perform the action: ${can[2]}`, 'Submit'], expected: 'The action completes successfully and the result is visible to the user' });
    }
    const min = low.match(/at least (\d+) (?:character|char|digit|letter)s?/);
    if (min) {
      matched = true; const n = +min[1];
      out.push({ title: `${cap(field)} with ${n - 1} characters is rejected`, kind: 'Boundary', priority: 'High', pre: 'The form is empty', steps: [open, `Enter "${sample(field, n - 1)}" in the ${field} field`, 'Submit'], expected: `An error states that the ${field} needs at least ${n} characters` });
      out.push({ title: `${cap(field)} with exactly ${n} characters is accepted`, kind: 'Boundary', priority: 'Medium', pre: 'The form is empty', steps: [open, `Enter "${sample(field, n)}" in the ${field} field`, 'Submit'], expected: `The ${field} is accepted` });
    }
    const max = low.match(/(?:at most|no more than|up to|maximum of|max(?:imum)?(?: of)?) (\d+) (?:character|char|digit|letter)s?/);
    if (max) {
      matched = true; const n = +max[1];
      out.push({ title: `${cap(field)} with exactly ${n} characters is accepted`, kind: 'Boundary', priority: 'Medium', pre: 'The form is empty', steps: [open, `Enter ${n} characters in the ${field} field`, 'Submit'], expected: `The ${field} is accepted` });
      out.push({ title: `${cap(field)} with ${n + 1} characters is rejected`, kind: 'Boundary', priority: 'High', pre: 'The form is empty', steps: [open, `Enter ${n + 1} characters in the ${field} field`, 'Submit'], expected: `An error states that the ${field} is too long` });
    }
    const between = low.match(/between (\d+) and (\d+)/);
    if (between) {
      matched = true; const a = +between[1], b = +between[2];
      for (const [v, ok] of [[a - 1, false], [a, true], [b, true], [b + 1, false]] as [number, boolean][]) {
        out.push({ title: `${cap(field)} = ${v} is ${ok ? 'accepted' : 'rejected'}`, kind: 'Boundary', priority: ok ? 'Medium' : 'High', pre: 'The form is empty', steps: [open, `Enter ${v} in the ${field} field`, 'Submit'], expected: ok ? `The ${field} is accepted` : `An error states that the ${field} must be between ${a} and ${b}` });
      }
    }
    const atLeast = !min && low.match(/at least (\d+)(?! *(?:character|char|digit|letter))/);
    if (atLeast) {
      matched = true; const n = +atLeast[1];
      out.push({ title: `${cap(field)} = ${n - 1} is rejected`, kind: 'Boundary', priority: 'High', pre: 'The form is empty', steps: [open, `Enter ${n - 1} in the ${field} field`, 'Submit'], expected: `An error states that the ${field} must be at least ${n}` });
      out.push({ title: `${cap(field)} = ${n} is accepted`, kind: 'Boundary', priority: 'Medium', pre: 'The form is empty', steps: [open, `Enter ${n} in the ${field} field`, 'Submit'], expected: `The ${field} is accepted` });
    }
    if (/\bunique\b|already (?:exists?|registered|used)|duplicate/.test(low)) {
      matched = true;
      out.push({ title: `Duplicate ${field} is rejected`, kind: 'Negative', priority: 'High', pre: `A record with the same ${field} already exists`, steps: [open, `Enter the existing ${field}`, 'Submit'], expected: `An error states that this ${field} is already in use and no second record is created` });
    }
    if (/\b(required|mandatory)\b|(?:cannot|must not|can't) be (?:empty|blank)/.test(low)) {
      matched = true;
      out.push({ title: `Empty ${field} is rejected`, kind: 'Negative', priority: 'High', pre: 'The form is empty', steps: [open, `Leave the ${field} field empty`, 'Submit'], expected: `An error states that the ${field} is required` });
    }
    const cls = low.match(/contain(?:s)? (?:at least )?(?:one |a |an )?(number|digit|uppercase letter|uppercase|capital letter|lowercase letter|special character|symbol)/);
    if (cls) {
      matched = true;
      out.push({ title: `${cap(field)} without a ${cls[1]} is rejected`, kind: 'Negative', priority: 'High', pre: 'The form is empty', steps: [open, `Enter a long ${field} that has no ${cls[1]}`, 'Submit'], expected: `An error states that the ${field} must contain a ${cls[1]}` });
    }
    if (/e-?mail/.test(low) && /\b(valid|format)\b/.test(low)) {
      matched = true;
      for (const bad of ['user@', 'user.example.com', 'user @example.com']) {
        out.push({ title: `Invalid email "${bad}" is rejected`, kind: 'Negative', priority: 'Medium', pre: 'The form is empty', steps: [open, `Enter "${bad}" in the email field`, 'Submit'], expected: 'An error states that the email address is not valid' });
      }
    }
    const time = low.match(/(?:expires?|valid|within|after) (?:for |in )?(?:the next )?(\d+) (second|minute|hour|day|week)s?/);
    if (time) {
      matched = true; const n = +time[1], u = time[2];
      out.push({ title: `${cap(field)} still works ${n - 1 > 0 ? n - 1 : 1} ${u}(s) after it was issued`, kind: 'Boundary', priority: 'Medium', pre: `The ${field} has just been issued`, steps: [`Wait ${n - 1 > 0 ? n - 1 : 1} ${u}(s) (or move the clock forward)`, `Use the ${field}`], expected: 'The action is accepted' });
      out.push({ title: `${cap(field)} is refused ${n + 1} ${u}(s) after it was issued`, kind: 'Boundary', priority: 'High', pre: `The ${field} has just been issued`, steps: [`Wait ${n + 1} ${u}(s) (or move the clock forward)`, `Use the ${field}`], expected: 'The action is refused and the user can request a new one' });
    }
    if (!matched && /\b(must|should|shall)\b/.test(low)) {
      out.push({ title: `Behaviour: ${s}`, kind: 'Happy path', priority: 'High', pre: 'The system is available and test data is prepared', steps: [open, 'Exercise the described behaviour with valid data'], expected: s });
      out.push({ title: `Violation of: ${s}`, kind: 'Negative', priority: 'Medium', pre: 'The system is available and test data is prepared', steps: [open, 'Exercise the behaviour with data that breaks the rule'], expected: 'The system refuses the input and explains why' });
    }
  }
  if (out.length) {
    out.push({ title: 'Leading and trailing spaces in text fields are handled', kind: 'Edge', priority: 'Low', pre: 'The form is empty', steps: [open, 'Enter valid values surrounded by spaces', 'Submit'], expected: 'The spaces are trimmed or a clear error is shown' });
    out.push({ title: 'Submitting twice quickly does not create duplicates', kind: 'Edge', priority: 'Medium', pre: 'The form is filled with valid data', steps: ['Press Submit twice within one second'], expected: 'Only one record is created' });
  }
  const seen = new Set<string>();
  return out.filter((k) => (seen.has(k.title) ? false : (seen.add(k.title), true)));
}

const T = {
  en: { req: 'Requirement', gen: 'Generate test cases', sample: 'Load the sample', all: 'All', count: (n: number) => `${n} test cases`, pre: 'Preconditions', steps: 'Steps', exp: 'Expected result', csv: 'Download CSV', empty: 'Write or paste a requirement. Sentences with "must", "can", "at least", "between", "unique" or "expires after" give the best results.', note: 'This preview applies fixed rules in your browser. The real TestCraft AI reads PDF, DOCX or text with an LLM and covers much more ground.' },
  it: { req: 'Requisito', gen: 'Genera i test case', sample: 'Carica l\'esempio', all: 'Tutti', count: (n: number) => `${n} test case`, pre: 'Precondizioni', steps: 'Passi', exp: 'Risultato atteso', csv: 'Scarica CSV', empty: 'Scrivi o incolla un requisito, in inglese. Le frasi con "must", "can", "at least", "between", "unique" o "expires after" danno i risultati migliori.', note: 'Questa anteprima applica regole fisse nel browser. Il vero TestCraft AI legge PDF, DOCX o testo con un LLM e copre molto di più.' },
};

export default function TestCraftDemo({ lang }: { lang: Lang }) {
  const c = T[lang];
  const [text, setText] = useState(SAMPLE);
  const [cases, setCases] = useState<Case[]>(() => generate(SAMPLE).map((x, i) => ({ ...x, id: `TC-${String(i + 1).padStart(3, '0')}` })));
  const [filter, setFilter] = useState<'all' | Kind>('all');

  const run = (t: string) => { setCases(generate(t).map((x, i) => ({ ...x, id: `TC-${String(i + 1).padStart(3, '0')}` }))); setFilter('all'); };
  const counts = useMemo(() => { const m: Record<string, number> = {}; cases.forEach((k) => { m[k.kind] = (m[k.kind] ?? 0) + 1; }); return m; }, [cases]);
  const shown = cases.filter((k) => filter === 'all' || k.kind === filter);

  const csv = () => {
    const q = (v: string) => `"${v.replace(/"/g, '""')}"`;
    const rows = [['ID', 'Title', 'Type', 'Priority', 'Preconditions', 'Steps', 'Expected Result'], ...cases.map((k) => [k.id, k.title, k.kind, k.priority, k.pre, k.steps.map((s, i) => `${i + 1}. ${s}`).join(' | '), k.expected])];
    const url = URL.createObjectURL(new Blob([rows.map((r) => r.map(q).join(',')).join('\n')], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a'); a.href = url; a.download = 'testcraft-preview.csv'; a.click(); URL.revokeObjectURL(url);
  };

  return (
    <div className="dm tc-demo">
      <label className="mo" htmlFor="tc-req">{c.req}</label>
      <textarea id="tc-req" rows={5} value={text} onChange={(e) => setText(e.target.value)} />
      <div className="dm-f">
        <button className="btn p" onClick={() => run(text)}>{c.gen} →</button>
        <button className="btn" onClick={() => { setText(SAMPLE); run(SAMPLE); }}>{c.sample}</button>
        {cases.length > 0 && <button className="btn" onClick={csv}>{c.csv} ↓</button>}
      </div>
      {cases.length === 0 ? <p className="dm-note">{c.empty}</p> : (
        <>
          <div className="dm-sg">
            <span className="mo">{c.count(cases.length)}</span>
            <button aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>{c.all}</button>
            {(Object.keys(counts) as Kind[]).map((k) => <button key={k} aria-pressed={filter === k} onClick={() => setFilter(k)}>{k} · {counts[k]}</button>)}
          </div>
          <div className="tcs">
            {shown.map((k) => (
              <article key={k.id} className="tcase">
                <header><span className="mo">{k.id}</span><span className={`kd ${k.kind.replace(' ', '')}`}>{k.kind}</span><span className="mo">{k.priority}</span></header>
                <h3>{k.title}</h3>
                <dl>
                  <dt>{c.pre}</dt><dd>{k.pre}</dd>
                  <dt>{c.steps}</dt><dd><ol>{k.steps.map((s, i) => <li key={i}>{s}</li>)}</ol></dd>
                  <dt>{c.exp}</dt><dd>{k.expected}</dd>
                </dl>
              </article>
            ))}
          </div>
        </>
      )}
      <p className="dm-note">{c.note}</p>
    </div>
  );
}
