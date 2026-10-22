'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/lib/i18n';
import { Defs, EMAIL, Footer, GITHUB, LINKEDIN, Nav, Seal } from './Chrome';
import { earlier, featured, type Lang, type Project } from '@/lib/projects';


const t = {
  en: {
    nav: ['Work', 'Method', 'Path', 'Contact'],
    role: 'Junior software developer · Torino',
    h1a: 'Three years finding what breaks.',
    h1b: "Now building what doesn't.",
    sub: 'Computer Engineering graduate with three years validating automotive software at Reply. I build web apps and AI tools, and I test everything I ship.',
    seeWork: 'See the work',
    touch: 'Get in touch',
    hint: 'click anywhere to stamp',
    seal: '検査済 · inspected',
    facts: [
      ['Base', 'Torino · open to relocate abroad'],
      ['Education', 'Computer Engineering, 2026'],
      ['Experience', '3 yrs software validation'],
      ['Looking for', 'Junior developer · backend, AI'],
    ],
    workT: 'Selected work',
    workP: 'Each project is inspected: what it solves, how it works and what is still open.',
    problem: 'Problem',
    approach: 'Approach',
    stackStatus: 'Stack · status',
    readCase: 'Read the full write-up',
    demosT: 'Try it yourself',
    demosP: 'Small interactive versions of what the private projects do. They run in your browser on sample data.',
    tryIt: 'Open the demo',
    demoCards: [
      ['jarvis-core', 'Jarvis Core', 'Ask the assistant to open an app or shut the PC down and watch the planner, the clarifying question and the safety policy.'],
      ['testcraft', 'TestCraft AI', 'Paste a requirement and get boundary, negative and happy-path test cases, ready to export as CSV.'],
      ['bug-ticket-creation', 'Jira Ticket Creator', 'Describe a defect, validate the row and see the most similar existing defects ranked.'],
    ],
    earlierT: 'Live previews and earlier work',
    earlierP: 'Open a live preview inside the page, read the write-up, or go to the code.',
    demo: 'Live preview',
    details: 'Details',
    code: 'Code',
    methodT: 'How I work',
    methodP: 'Habits from validation, visible in the code.',
    principle: 'Principle',
    evidence: 'Evidence',
    method: [
      ['Reproduce first', 'I find the root cause before I touch the fix. Three years of reading traces and writing defect reports made it automatic.', 'Jira ticket creator, 67 unit tests'],
      ['Make it verifiable', 'Fixtures, tests and statuses that tell planned work from executed work, so nobody has to trust my word.', 'Proofline, Travel Intelligence'],
      ['Say what is not done', 'An alpha stays labelled alpha. A demo built on mock data says so on the first page.', 'TestCraft AI'],
    ],
    pathT: 'Path',
    pathP: 'From the web, to cars, back to building.',
    path: [
      ['Dec 2023 — now', 'Software & Systems Validation · Reply', 'End-to-end infotainment and connectivity testing, defect triage and test case management for Italdesign/Audi, Lamborghini, Aston Martin and Stellantis. Trace analysis and release readiness on e-Traction, powertrain and battery projects.'],
      ['Oct 2026', 'B.Sc. Computer Engineering · Universitas Mercatorum', 'Thesis: manual and automated software testing and their differences.'],
      ['2023', 'Full-stack web programming · Boolean', 'PHP, Laravel, JavaScript, Vue.js, HTML, CSS and SQL, with individual and team projects.'],
      ['2020 — 2021', 'Full-stack web developer · Freelance', 'Frontend, backend and database development with PHP, Laravel, JavaScript and SQL.'],
    ],
    open: 'Open to work · open to relocate abroad',
    contactH: "Let's build something that holds up.",
    email: 'Send an email',
    foot: 'built and tested in Torino',
  },
  it: {
    nav: ['Lavori', 'Metodo', 'Percorso', 'Contatti'],
    role: 'Junior software developer · Torino',
    h1a: 'Tre anni a cercare cosa si rompe.',
    h1b: 'Ora costruisco ciò che regge.',
    sub: 'Laureato in Ingegneria Informatica, con tre anni di validazione software automotive in Reply. Sviluppo web app e strumenti AI e collaudo tutto ciò che consegno.',
    seeWork: 'Vedi i lavori',
    touch: 'Contattami',
    hint: 'clicca ovunque per timbrare',
    seal: '検査済 · ispezionato',
    facts: [
      ['Base', 'Torino · disponibile a trasferirmi all\'estero'],
      ['Studi', 'Ingegneria Informatica, 2026'],
      ['Esperienza', '3 anni di validazione software'],
      ['Cerco', 'Ruolo junior · backend, AI'],
    ],
    workT: 'Lavori selezionati',
    workP: 'Ogni progetto viene ispezionato: cosa risolve, come funziona e cosa resta aperto.',
    problem: 'Problema',
    approach: 'Approccio',
    stackStatus: 'Stack · stato',
    readCase: 'Leggi la scheda completa',
    demosT: 'Provalo tu',
    demosP: 'Piccole versioni interattive di ciò che fanno i progetti privati. Girano nel tuo browser su dati di esempio.',
    tryIt: 'Apri la demo',
    demoCards: [
      ['jarvis-core', 'Jarvis Core', 'Chiedi all\'assistente di aprire un\'app o spegnere il PC e osserva planner, domanda di chiarimento e policy di sicurezza.'],
      ['testcraft', 'TestCraft AI', 'Incolla un requisito e ottieni test case di confine, negativi e del percorso felice, esportabili in CSV.'],
      ['bug-ticket-creation', 'Jira Ticket Creator', 'Descrivi un difetto, valida la riga e guarda i difetti esistenti più simili in ordine.'],
    ],
    earlierT: 'Anteprime live e lavori precedenti',
    earlierP: 'Apri un\'anteprima live nella pagina, leggi la scheda o vai al codice.',
    demo: 'Anteprima live',
    details: 'Dettagli',
    code: 'Codice',
    methodT: 'Come lavoro',
    methodP: 'Abitudini della validazione, visibili nel codice.',
    principle: 'Principio',
    evidence: 'Prova',
    method: [
      ['Prima riproduco', 'Trovo la causa radice prima di toccare la correzione. Tre anni di tracce e report di difetti lo hanno reso automatico.', 'Jira ticket creator, 67 test unitari'],
      ['Lo rendo verificabile', 'Fixture, test e stati che distinguono il lavoro pianificato da quello eseguito, così nessuno deve fidarsi sulla parola.', 'Proofline, Travel Intelligence'],
      ['Dico cosa non è fatto', 'Un alpha resta etichettato alpha. Una demo con dati simulati lo dice già nella prima pagina.', 'TestCraft AI'],
    ],
    pathT: 'Percorso',
    pathP: 'Dal web alle auto, e di nuovo a costruire.',
    path: [
      ['Dic 2023 — oggi', 'Software & Systems Validation · Reply', 'Test end-to-end di infotainment e connettività, analisi dei difetti e gestione dei test case per Italdesign/Audi, Lamborghini, Aston Martin e Stellantis. Analisi delle tracce e release readiness su progetti e-Traction, powertrain e batterie.'],
      ['Ott 2026', 'Laurea in Ingegneria Informatica · Universitas Mercatorum', 'Tesi: test software manuale e automatizzato e le loro differenze.'],
      ['2023', 'Programmazione web full-stack · Boolean', 'PHP, Laravel, JavaScript, Vue.js, HTML, CSS e SQL, con progetti individuali e di gruppo.'],
      ['2020 — 2021', 'Sviluppatore web full-stack · Freelance', 'Sviluppo frontend, backend e database con PHP, Laravel, JavaScript e SQL.'],
    ],
    open: 'Disponibile · anche all\'estero',
    contactH: 'Costruiamo qualcosa che regga.',
    email: 'Scrivimi una email',
    foot: 'costruito e collaudato a Torino',
  },
};

function Skyline() {
  return (
    <svg className="skyline" viewBox="0 0 1000 90" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 90V60h40V44h30v16h30V30h26v60h34V52h40V38h24v52h50V56h36V20l8-16 8 16v70h40V64h30V48h38v42h60V58h30V40h34v50h50V62h42V46h30v44h60V54h40V66h34v24h60V50h30V36h28v54h70V62h40V70h60V90z" fill="none" stroke="#222733" strokeWidth="1.4" />
      <g fill="#ffb347" opacity=".7"><rect x="120" y="50" width="3" height="3" /><rect x="330" y="46" width="3" height="3" /><rect x="520" y="50" width="3" height="3" /><rect x="770" y="54" width="3" height="3" /><rect x="900" y="44" width="3" height="3" /></g>
    </svg>
  );
}

function Case({ p, lang, open, onToggle }: { p: Project; lang: Lang; open: boolean; onToggle: () => void }) {
  const c = t[lang];
  return (
    <details className="pj" open={open}>
      <summary onClick={(e) => { e.preventDefault(); onToggle(); }}>
        <span className="yr">{p.year}</span>
        <div><h3>{p.title}</h3><p className="one">{p.one[lang]}</p></div>
        <Seal className="stm" />
      </summary>
      <div className="cs">
        <div />
        <div><h4>{c.problem}</h4><p>{p.problem?.[lang]}</p></div>
        <div><h4>{c.approach}</h4><p>{p.approach?.[lang]}</p></div>
        <div>
          <h4>{c.stackStatus}</h4>
          <ul className="chips">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
          {p.status && <span className="lk">{p.status[lang]}</span>}
          <div><Link className="more-l" href={`/projects/${p.id}`}>{c.readCase} →</Link></div>
        </div>
      </div>
    </details>
  );
}

function Earlier({ p, lang }: { p: Project; lang: Lang }) {
  const c = t[lang];
  return (
    <article className="ec">
      <div className="top"><span className="mo">{p.year}</span></div>
      <h3>{p.title}</h3>
      <p>{p.one[lang]}</p>
      <ul className="chips">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
      <div className="acts">
        {p.demo && <Link className="d" href={`/projects/${p.id}#live`}>{c.demo} →</Link>}
        <Link href={`/projects/${p.id}`}>{c.details}</Link>
        {p.repo && <a href={p.repo} target="_blank" rel="noopener noreferrer">{c.code} ↗</a>}
      </div>
    </article>
  );
}

export default function Site() {
  const { lang, setLang } = useLang();
  const c = t[lang];
  const [open, setOpen] = useState<string | null>(featured[0].id);
  const [stamps, setStamps] = useState<{ id: number; x: number; y: number; r: number }[]>([]);

  const stamp = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('a, button')) return;
    const r = e.currentTarget.getBoundingClientRect();
    const id = Date.now() + Math.random();
    setStamps((s) => [...s.slice(-13), { id, x: e.clientX - r.left, y: e.clientY - r.top, r: Math.random() * 40 - 20 }]);
    setTimeout(() => setStamps((s) => s.filter((x) => x.id !== id)), 7200);
  };

  return (
    <>
      <Defs />
      <Nav />

      <main id="top">
        <div className="w">
          <div className="hero" onPointerDown={stamp}>
            <div>
              <div className="mo">{c.role}</div>
              <h1>{c.h1a} <em>{c.h1b}</em></h1>
              <p className="sub">{c.sub}</p>
              <div className="cta">
                <a className="btn p" href="#work">{c.seeWork} ↓</a>
                <a className="btn" href="#contact">{c.touch}</a>
              </div>
            </div>
            <div className="sealbox">
              <svg className="seal-big" viewBox="0 0 100 100" role="img" aria-label="Inspection seal"><use href="#seal" /></svg>
              <span className="mo tag">{c.seal}</span>
              <span className="mo hint">{c.hint}</span>
            </div>
            <Skyline />
            {stamps.map((s) => (
              <svg key={s.id} className="stamp" style={{ left: s.x, top: s.y, ['--r' as string]: `${s.r}deg` }} aria-hidden="true"><use href="#mini" /></svg>
            ))}
          </div>

          <div className="facts">
            {c.facts.map(([k, v]) => <div key={k}><span className="mo">{k}</span><b>{v}</b></div>)}
          </div>

          <section className="sec" id="work">
            <div className="sh"><h2>{c.workT}</h2><p>{c.workP}</p></div>
            {featured.map((p) => (
              <Case key={p.id} p={p} lang={lang} open={open === p.id} onToggle={() => setOpen(open === p.id ? null : p.id)} />
            ))}
          </section>

          <section className="sec" id="demos" style={{ paddingTop: 0 }}>
            <div className="sh"><h2>{c.demosT}</h2><p>{c.demosP}</p></div>
            <div className="dg">
              {c.demoCards.map(([id, name, text]) => (
                <Link key={id} className="dc" href={`/projects/${id}#demo`}>
                  <span className="mo">{c.tryIt}</span>
                  <h3>{name}</h3>
                  <p>{text}</p>
                  <span className="go">→</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="sec" id="earlier" style={{ paddingTop: 0 }}>
            <div className="sh"><h2>{c.earlierT}</h2><p>{c.earlierP}</p></div>
            <div className="eg">{earlier.map((p) => <Earlier key={p.id} p={p} lang={lang} />)}</div>
          </section>

          <section className="sec" id="method">
            <div className="sh"><h2>{c.methodT}</h2><p>{c.methodP}</p></div>
            <div className="pr">
              {c.method.map(([h, p, ev]) => (
                <article key={h}><span className="mo">{c.principle}</span><h3>{h}</h3><p>{p}</p><div className="ev">{c.evidence}: {ev}</div></article>
              ))}
            </div>
          </section>

          <section className="sec" id="path">
            <div className="sh"><h2>{c.pathT}</h2><p>{c.pathP}</p></div>
            <div className="tl">
              {c.path.map(([when, what, text]) => (
                <div className="r" key={what}><span className="mo">{when}</span><div><h3>{what}</h3><p>{text}</p></div></div>
              ))}
            </div>
          </section>

          <section className="sec ct" id="contact">
            <span className="mo">{c.open}</span>
            <h2>{c.contactH}</h2>
            <div className="row">
              <a className="btn p" href={`mailto:${EMAIL}`}>{c.email} →</a>
              <a className="btn" href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
              <a className="btn" href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            </div>
            <div className="em">{EMAIL}</div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
