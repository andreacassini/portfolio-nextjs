'use client';

import Link from 'next/link';
import { useLang } from '@/lib/i18n';

export const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@andreacassini.com';
export const LINKEDIN = 'https://www.linkedin.com/in/andrea-cassini-a316161ba';
export const GITHUB = 'https://github.com/andreacassini';

const NAV = {
  en: { items: ['Work', 'Demos', 'Method', 'Path', 'Contact'], foot: 'built and tested in Torino' },
};

export function Seal({ className, big }: { className?: string; big?: boolean }) {
  return <svg className={className} viewBox="0 0 100 100" aria-hidden="true"><use href={big ? '#seal' : '#mini'} /></svg>;
}

export function Nav() {
  const { lang } = useLang();
  const c = NAV[lang];
  const hrefs = ['/#work', '/#demos', '/#method', '/#path', '/#contact'];
  return (
    <header className="nav">
      <div className="w">
        <Link className="brand" href="/"><Seal /><span className="bn">Andrea Cassini</span></Link>
        <nav className="links" aria-label="Main">
          {c.items.map((label, i) => <Link key={label} href={hrefs[i]}>{label}</Link>)}
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  const { lang } = useLang();
  return (
    <footer>
      <div className="w foot"><span>© {new Date().getFullYear()} Andrea Cassini</span><span className="mo">検査済 · {NAV[lang].foot}</span></div>
    </footer>
  );
}

export function Defs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <filter id="ink" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="3" seed="4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="3.2" />
        </filter>
        <symbol id="seal" viewBox="0 0 100 100">
          <g filter="url(#ink)" fill="none" stroke="#e2382c">
            <circle cx="50" cy="50" r="46" strokeWidth="4.5" />
            <circle cx="50" cy="50" r="38" strokeWidth="1.4" />
            <path id="arc" d="M50 50 m-31 0 a31 31 0 1 1 62 0 a31 31 0 1 1 -62 0" stroke="none" />
            <text fill="#e2382c" stroke="none" fontFamily="var(--font-body), sans-serif" fontWeight="700" fontSize="7.2" letterSpacing="1.6">
              <textPath href="#arc">ANDREA CASSINI · INSPECTED ·</textPath>
            </text>
            <path d="M49.3 39.4Q51.6 39.5 54.1 39.6H57.9L58.7 38.3Q58.9 38 59.2 37.7Q59.4 37.3 59.6 37.1Q59.7 37 59.9 37Q60.1 37 60.9 37.6Q61.8 38.3 62.5 39.1Q63.2 39.8 63.2 40.1Q63 40.8 62.2 40.8H58.2V44.4H61.6L62.4 43.1Q62.6 42.9 62.9 42.5Q63.1 42.2 63.3 42Q63.4 41.8 63.6 41.8Q63.8 41.8 64.7 42.5Q65.6 43.2 66.4 44Q67.2 44.8 67.2 45Q66.8 45.6 65.8 45.8V48.5Q65.9 51.8 66.1 53.7Q65.8 54 64.8 54.4Q63.8 54.8 62.4 54.8H61.7V53.3H58.2Q59.5 56.2 62.2 58.1Q64.9 60 68.4 60.6V61Q67.1 61.4 66.3 62.6Q65.4 63.8 65 65.6Q62 63.9 60.3 61.2Q58.5 58.6 57.6 54.4Q56.7 58.2 53.6 61Q50.5 63.8 44 65.6L43.8 65.1Q48.6 62.8 50.9 59.9Q53.2 57 53.7 53.3H50.6V54.4Q50.6 54.6 50.2 54.8Q49.8 55.1 49 55.3Q48.2 55.4 47.3 55.4Q46.8 55.4 46.6 55.2Q46.4 55 46.4 54.6Q46.6 53.2 46.6 51V48.8Q46.4 49.4 46 49.7Q45.5 50 45 50Q44.1 50 43.3 49.2Q43.2 47.9 42.8 46.3Q42.3 44.8 41.6 43.5V54.6Q41.7 59.6 41.9 64Q41.6 64.5 40.4 65Q39.2 65.6 38.1 65.6Q37.5 65.6 37.1 65.3Q36.8 65.1 36.8 64.8Q37 62.6 37.1 60.4Q37.2 58.3 37.2 55V49.6Q35.1 53.4 32 56.2L31.5 55.8Q35.3 49.5 36.8 39.1H35.4Q34.3 39.1 33 39.6L32 37.6Q33.4 37.8 35.5 37.9H37.2V36.1Q37.2 31 36.7 27.9Q40 28.6 41.3 29.1Q42.6 29.5 42.6 29.8Q42.6 30 42.3 30.2L41.6 30.6V37.9H41.8L42.6 36.4Q42.8 36.2 43 35.8Q43.3 35.4 43.5 35.1Q43.7 34.9 43.8 34.9Q44.1 34.9 44.9 35.7Q45.7 36.4 46.5 37.3Q47.2 38.2 47.2 38.4Q47 39.1 46.2 39.1H41.6V42.6L41.6 42.5Q43.8 43.3 45 44.4Q46.2 45.5 46.6 46.6Q46.6 44.2 46.4 42.4L51 44.4H54V40.8H52.4Q51.2 40.8 49.8 41.3L48.9 39.6Q47.2 40.8 45.4 41.6L45.1 41.2Q47.8 39 50 35.2Q51 33.5 51.8 31.4Q52.5 29.3 52.6 27.6Q58.4 29.2 58.4 29.8Q58.4 29.9 58.1 30.1L57.3 30.4Q59.1 32.6 62.1 34.2Q65.1 35.8 68.4 36.5L68.4 37Q66.4 37.9 66 41.3Q63 39.6 60.7 36.8Q58.3 34.1 56.8 30.8Q55.7 33.2 53.8 35.4Q51.8 37.6 49.3 39.4ZM54 45.5H50.6V52.2H53.9Q54 50.8 54 49.3ZM58.2 49.2Q58.2 50.9 58 52.2H61.7V45.5H58.2Z" fill="#e2382c" stroke="none" />
          </g>
        </symbol>
        <symbol id="mini" viewBox="0 0 100 100">
          <g filter="url(#ink)" fill="none" stroke="#e2382c">
            <circle cx="50" cy="50" r="44" strokeWidth="7" />
            <path d="M49 36.3Q52.3 36.5 55.7 36.6H61L62.2 34.8Q62.5 34.5 62.8 34Q63.2 33.4 63.4 33.2Q63.6 32.9 63.8 32.9Q64.2 32.9 65.3 33.9Q66.5 34.8 67.5 35.9Q68.5 37 68.5 37.4Q68.3 38.3 67 38.3H61.4V43.3H66.2L67.4 41.5Q67.6 41.2 68 40.7Q68.4 40.2 68.6 40Q68.8 39.7 69 39.7Q69.4 39.7 70.6 40.7Q71.9 41.7 73 42.8Q74.1 43.9 74.1 44.3Q73.6 45 72.2 45.3V49.1Q72.3 53.7 72.5 56.4Q72.2 56.9 70.8 57.4Q69.4 57.9 67.4 57.9H66.4V55.8H61.4Q63.3 59.8 67.1 62.5Q70.9 65.1 75.7 66V66.7Q74 67.2 72.8 68.8Q71.6 70.5 71.1 73Q66.9 70.6 64.4 66.9Q61.9 63.2 60.6 57.3Q59.4 62.6 55.1 66.6Q50.7 70.5 41.6 73L41.3 72.3Q48 69.1 51.2 65Q54.4 61 55.2 55.8H50.8V57.4Q50.8 57.6 50.3 58Q49.7 58.3 48.6 58.6Q47.5 58.8 46.2 58.8Q45.6 58.8 45.3 58.5Q45 58.1 45 57.7Q45.2 55.7 45.3 52.7V49.6Q45 50.4 44.3 50.8Q43.7 51.3 42.9 51.3Q41.7 51.3 40.6 50.1Q40.5 48.2 39.9 46.1Q39.2 43.9 38.2 42.1V57.6Q38.4 64.6 38.7 70.8Q38.3 71.5 36.6 72.2Q34.9 73 33.3 73Q32.5 73 32 72.6Q31.5 72.3 31.5 71.9Q31.7 68.8 31.9 65.8Q32 62.8 32.1 58.1V50.7Q29.1 55.9 24.8 59.9L24.1 59.3Q29.4 50.5 31.6 35.9H29.6Q28 36 26.3 36.7L24.8 33.8Q26.8 34.2 29.7 34.3H32.1V31.7Q32.1 24.7 31.4 20.2Q36.1 21.3 37.8 21.9Q39.6 22.5 39.6 22.9Q39.6 23.1 39.2 23.4L38.2 24.1V34.3H38.5L39.7 32.2Q39.9 31.9 40.3 31.3Q40.6 30.7 40.9 30.4Q41.2 30.1 41.4 30.1Q41.7 30.1 42.9 31.2Q44 32.2 45 33.4Q46.1 34.6 46.1 35Q45.9 35.9 44.6 35.9H38.2V40.8L38.3 40.7Q41.3 41.8 43 43.4Q44.7 44.9 45.3 46.5Q45.3 43 45 40.5L51.4 43.3H55.6V38.3H53.4Q51.7 38.3 49.7 39L48.5 36.6Q46.1 38.3 43.5 39.4L43.2 38.8Q46.9 35.7 50 30.5Q51.5 28.1 52.5 25.1Q53.5 22.2 53.7 19.9Q61.8 22.1 61.8 22.9Q61.8 23.1 61.3 23.3L60.2 23.8Q62.8 26.8 67 29.1Q71.2 31.4 75.8 32.3L75.8 33Q73 34.2 72.3 39Q68.3 36.6 64.9 32.7Q61.6 28.9 59.6 24.3Q58 27.7 55.3 30.8Q52.6 33.8 49 36.3ZM55.6 44.9H50.8V54.2H55.4Q55.6 52.3 55.6 50.2ZM61.4 50.1Q61.4 52.4 61.2 54.2H66.4V44.9H61.4Z" fill="#e2382c" stroke="none" />
          </g>
        </symbol>
      </defs>
    </svg>
  );
}
