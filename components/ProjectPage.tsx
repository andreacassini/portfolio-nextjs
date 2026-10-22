'use client';

import Link from 'next/link';
import { useLang } from '@/lib/i18n';
import { details } from '@/lib/details';
import { allProjects, type Lang } from '@/lib/projects';
import { Defs, Footer, Nav } from './Chrome';
import LivePreview from './LivePreview';
import JarvisDemo from './demos/JarvisDemo';
import TestCraftDemo from './demos/TestCraftDemo';
import TicketDemo from './demos/TicketDemo';

const T = {
  en: {
    back: 'All projects', overview: 'What it is', highlights: 'What it does', how: 'How it is built', status: 'Status', notYet: 'Not done yet',
    stack: 'Stack', demo: 'Try it', demoNote: 'Runs in your browser on sample data.', live: 'Live preview', code: 'Code on GitHub', privateRepo: 'Private repository',
    next: 'Next project', prev: 'Previous project',
  },
};

function InteractiveDemo({ kind, lang }: { kind: 'jarvis' | 'testcraft' | 'tickets'; lang: Lang }) {
  if (kind === 'jarvis') return <JarvisDemo lang={lang} />;
  if (kind === 'testcraft') return <TestCraftDemo lang={lang} />;
  return <TicketDemo lang={lang} />;
}

export default function ProjectPage({ id }: { id: string }) {
  const { lang } = useLang();
  const c = T[lang];
  const i = allProjects.findIndex((p) => p.id === id);
  const p = allProjects[i];
  const d = details[id];
  if (!p || !d) return null;
  const prev = allProjects[(i + allProjects.length - 1) % allProjects.length];
  const next = allProjects[(i + 1) % allProjects.length];

  return (
    <>
      <Defs />
      <Nav />
      <main className="w pp">
        <Link className="back mo" href="/#work">← {c.back}</Link>
        <header className="pp-h">
          <span className="mo">{p.year}{p.status ? ` · ${p.status[lang]}` : ''}</span>
          <h1>{p.title}</h1>
          <p className="lead">{p.one[lang]}</p>
          <div className="cta">
            {d.demo && <a className="btn p" href="#demo">{c.demo} ↓</a>}
            {p.demo && <a className="btn p" href="#live">{c.live} ↓</a>}
            {p.repo ? <a className="btn" href={p.repo} target="_blank" rel="noopener noreferrer">{c.code} ↗</a> : <span className="btn dis">{c.privateRepo}</span>}
          </div>
        </header>

        <div className="pp-g">
          <section>
            <h2>{c.overview}</h2>
            <p className="body">{d.overview[lang]}</p>
          </section>
          <section>
            <h2>{c.highlights}</h2>
            <ul className="hl">{d.highlights[lang].map((h) => <li key={h}>{h}</li>)}</ul>
          </section>
          {d.how && (
            <section>
              <h2>{c.how}</h2>
              <p className="body">{d.how[lang]}</p>
            </section>
          )}
          <section>
            <h2>{c.status}</h2>
            <p className="body">{d.status[lang]}</p>
            {d.notYet && (
              <>
                <h3 className="mo nt">{c.notYet}</h3>
                <ul className="hl">{d.notYet[lang].map((h) => <li key={h}>{h}</li>)}</ul>
              </>
            )}
          </section>
          <section>
            <h2>{c.stack}</h2>
            <ul className="chips big">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
          </section>
        </div>

        {d.demo && (
          <section className="pp-demo" id="demo">
            <div className="sh"><h2>{c.demo}</h2><p>{c.demoNote}</p></div>
            <InteractiveDemo kind={d.demo} lang={lang} />
          </section>
        )}

        {p.demo && (
          <section className="pp-demo" id="live">
            <div className="sh"><h2>{c.live}</h2></div>
            <LivePreview url={p.demo} title={p.title} lang={lang} />
          </section>
        )}

        <nav className="pn" aria-label="Projects">
          <Link href={`/projects/${prev.id}`}><span className="mo">← {c.prev}</span><b>{prev.title}</b></Link>
          <Link href={`/projects/${next.id}`}><span className="mo">{c.next} →</span><b>{next.title}</b></Link>
        </nav>
      </main>
      <Footer />
    </>
  );
}
