'use client';

import { useEffect, useMemo, useState } from 'react';
import GlyphField from './GlyphField';
import { useLang } from '@/lib/i18n';
import { projects, type Lang, type Project } from '@/lib/projects';

const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

const t = {
  en: {
    nav: ['Projects', 'About', 'Contact'],
    hi: 'Hi, my name is',
    roles: ['full-stack developer', 'builder of AI tools', 'Vue, React and Laravel', 'based in Bordighera, Italy'],
    lead: 'I build web apps, AI-powered tools and automation. Below you can browse my projects, read the code on GitHub and open the live demos.',
    seeWork: 'See projects',
    getInTouch: 'Get in touch',
    projects: 'Projects',
    count: (n: number) => `${n} selected from GitHub`,
    all: 'All',
    kinds: { ai: 'AI', web: 'Web', app: 'Apps', ui: 'UI' },
    demo: 'Live demo',
    code: 'Code',
    priv: 'Private repository',
    about: 'About',
    p1: 'I am a full-stack developer from Bordighera, on the Italian Riviera. I started with HTML and CSS, moved through JavaScript, Vue and Laravel, and now spend most of my time on Next.js, Python and LLM-based tools.',
    p2: 'I like projects where a messy manual process becomes a tool someone actually uses. Recent work includes a multi-model iOS assistant, a trip decision engine and test-case generation for QA teams.',
    skills: [
      ['Front end', ['TypeScript', 'React', 'Next.js', 'Vue', 'Tailwind', 'Bootstrap']],
      ['Back end', ['Node.js', 'NestJS', 'Laravel', 'PHP', 'Python', 'PostgreSQL']],
      ['AI and automation', ['LLM orchestration', 'LangGraph', 'OpenAI API', 'n8n', 'Temporal']],
      ['Tools', ['Git', 'Docker', 'Swift', 'pytest']],
    ] as [string, string[]][],
    contact: "Let's build something.",
    contactLead: 'Open to freelance work and full-time roles. The fastest way to reach me is below.',
    email: 'Send an email',
    github: 'GitHub profile',
    top: 'Back to top',
    built: 'Built with Next.js',
  },
  it: {
    nav: ['Progetti', 'Chi sono', 'Contatti'],
    hi: 'Ciao, mi chiamo',
    roles: ['sviluppatore full-stack', 'creo strumenti con AI', 'Vue, React e Laravel', 'di Bordighera, Italia'],
    lead: 'Sviluppo web app, strumenti basati su AI e automazioni. Qui sotto trovi i progetti, il codice su GitHub e le demo online.',
    seeWork: 'Vedi i progetti',
    getInTouch: 'Contattami',
    projects: 'Progetti',
    count: (n: number) => `${n} selezionati da GitHub`,
    all: 'Tutti',
    kinds: { ai: 'AI', web: 'Web', app: 'App', ui: 'UI' },
    demo: 'Demo live',
    code: 'Codice',
    priv: 'Repository privato',
    about: 'Chi sono',
    p1: 'Sono uno sviluppatore full-stack di Bordighera, sulla Riviera ligure. Ho iniziato con HTML e CSS, sono passato per JavaScript, Vue e Laravel, e oggi lavoro soprattutto con Next.js, Python e strumenti basati su LLM.',
    p2: 'Mi piacciono i progetti in cui un processo manuale e caotico diventa uno strumento che qualcuno usa davvero. Tra i lavori recenti: un assistente iOS multi-modello, un motore decisionale per viaggi e la generazione di test case per team QA.',
    skills: [
      ['Front end', ['TypeScript', 'React', 'Next.js', 'Vue', 'Tailwind', 'Bootstrap']],
      ['Back end', ['Node.js', 'NestJS', 'Laravel', 'PHP', 'Python', 'PostgreSQL']],
      ['AI e automazione', ['Orchestrazione LLM', 'LangGraph', 'API OpenAI', 'n8n', 'Temporal']],
      ['Strumenti', ['Git', 'Docker', 'Swift', 'pytest']],
    ] as [string, string[]][],
    contact: 'Costruiamo qualcosa.',
    contactLead: 'Disponibile per lavori freelance e ruoli full-time. Qui sotto il modo più veloce per contattarmi.',
    email: 'Scrivimi una email',
    github: 'Profilo GitHub',
    top: 'Torna su',
    built: 'Realizzato con Next.js',
  },
};

function useTyped(words: string[]) {
  const [text, setText] = useState(words[0]);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setText(words[0]); return; }
    let w = 0, i = 0, del = false;
    let id: ReturnType<typeof setTimeout>;
    const tick = () => {
      const word = words[w];
      i += del ? -1 : 1;
      setText(word.slice(0, i));
      let wait = del ? 28 : 65;
      if (!del && i === word.length) { del = true; wait = 1600; }
      else if (del && i === 0) { del = false; w = (w + 1) % words.length; wait = 350; }
      id = setTimeout(tick, wait);
    };
    id = setTimeout(tick, 400);
    return () => clearTimeout(id);
  }, [words]);
  return text;
}

function Card({ p, lang }: { p: Project; lang: Lang }) {
  const c = t[lang];
  const [tilt, setTilt] = useState('');
  return (
    <article
      className="card"
      style={{ transform: tilt }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return;
        const r = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        setTilt(`perspective(900px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg)`);
      }}
      onPointerLeave={() => setTilt('')}
    >
      <div className="card-top"><span>{c.kinds[p.kind]}</span><span>{p.year}</span></div>
      <h3>{p.title}</h3>
      <div className="tag">{p.tag[lang]}</div>
      <p className="sum">{p.summary[lang]}</p>
      <div className="stack">{p.stack.map((s) => <span key={s}>{s}</span>)}</div>
      <div className="acts">
        {p.demo && <a className="demo" href={p.demo} target="_blank" rel="noopener noreferrer">{c.demo} ↗</a>}
        {p.repo && <a href={p.repo} target="_blank" rel="noopener noreferrer">{c.code} ↗</a>}
        {p.private && <span>{c.priv}</span>}
      </div>
    </article>
  );
}

export default function Site() {
  const { lang, setLang } = useLang();
  const c = t[lang];
  const typed = useTyped(c.roles);
  const [filter, setFilter] = useState<'all' | Project['kind']>('all');
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);

  useEffect(() => {
    try {
      const s = localStorage.getItem('theme');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (s === 'light' || s === 'dark') { setTheme(s); document.documentElement.dataset.theme = s; }
    } catch {}
  }, []);

  const toggleTheme = () => {
    const dark = document.documentElement.dataset.theme === 'dark' ||
      (!document.documentElement.dataset.theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const next = dark ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch {}
  };

  const kinds = useMemo(() => Array.from(new Set(projects.map((p) => p.kind))), []);
  const shown = projects.filter((p) => filter === 'all' || p.kind === filter);

  return (
    <>
      <header className="nav">
        <div className="wrap nav-in">
          <a className="logo" href="#top">andrea<b>.</b>cassini</a>
          <nav className="links" aria-label="Main">
            <a href="#projects">{c.nav[0]}</a>
            <a href="#about">{c.nav[1]}</a>
            <a href="#contact">{c.nav[2]}</a>
          </nav>
          <div className="tools">
            <button className="chip" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
            <button className="chip" aria-pressed={lang === 'it'} onClick={() => setLang('it')}>IT</button>
            <button className="chip" onClick={toggleTheme} aria-label="Toggle theme" data-theme-state={theme ?? 'system'}>◐</button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <GlyphField />
          <div className="wrap hero-in">
            <span className="eyebrow">{c.hi}</span>
            <h1>Andrea<br />Cassini<span>.</span></h1>
            <div className="role" aria-live="off">{typed}</div>
            <p className="lead">{c.lead}</p>
            <div className="cta">
              <a className="btn primary" href="#projects">{c.seeWork} ↓</a>
              <a className="btn" href="#contact">{c.getInTouch}</a>
            </div>
          </div>
        </section>

        <section className="block" id="projects">
          <div className="wrap">
            <div className="sec-head">
              <h2>{c.projects}</h2>
              <span className="mono">{c.count(projects.length)}</span>
            </div>
            <div className="filters" role="group" aria-label="Filter">
              <button className="chip" aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>{c.all}</button>
              {kinds.map((k) => (
                <button key={k} className="chip" aria-pressed={filter === k} onClick={() => setFilter(k)}>{c.kinds[k]}</button>
              ))}
            </div>
            <div className="grid">
              {shown.map((p) => <Card key={p.id} p={p} lang={lang} />)}
            </div>
          </div>
        </section>

        <section className="block" id="about">
          <div className="wrap about">
            <div>
              <div className="sec-head"><h2>{c.about}</h2></div>
              <p>{c.p1}</p>
              <p>{c.p2}</p>
            </div>
            <div className="skills">
              {c.skills.map(([name, items]) => (
                <div key={name}>
                  <h3>{name}</h3>
                  <div className="stack">{items.map((s) => <span key={s}>{s}</span>)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="block contact" id="contact">
          <div className="wrap">
            <h2>{c.contact}</h2>
            <p className="lead">{c.contactLead}</p>
            <div className="cta">
              {EMAIL && <a className="btn primary" href={`mailto:${EMAIL}`}>{c.email}</a>}
              <a className={EMAIL ? 'btn' : 'btn primary'} href="https://github.com/andreacassini" target="_blank" rel="noopener noreferrer">{c.github} ↗</a>
            </div>
            {EMAIL && <p className="mono" style={{ marginTop: 18, color: 'var(--muted)' }}>{EMAIL}</p>}
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap foot">
          <span>© {new Date().getFullYear()} Andrea Cassini · {c.built}</span>
          <a href="#top">{c.top} ↑</a>
        </div>
      </footer>
    </>
  );
}
