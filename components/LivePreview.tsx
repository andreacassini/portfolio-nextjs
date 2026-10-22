'use client';

import { useState } from 'react';
import type { Lang } from '@/lib/projects';

const T = {
  en: { load: 'Load the live preview', note: 'The page below is the real deployed site, running inside this frame.', desktop: 'Desktop', phone: 'Phone', reload: 'Reload', open: 'Open in a new tab' },
  it: { load: 'Carica l\'anteprima live', note: 'La pagina qui sotto è il sito vero online, in esecuzione dentro questo riquadro.', desktop: 'Desktop', phone: 'Telefono', reload: 'Ricarica', open: 'Apri in una nuova scheda' },
};

export default function LivePreview({ url, title, lang }: { url: string; title: string; lang: Lang }) {
  const c = T[lang];
  const [on, setOn] = useState(false);
  const [phone, setPhone] = useState(false);
  const [key, setKey] = useState(0);
  const host = url.replace(/^https?:\/\//, '').replace(/\/$/, '');

  return (
    <div className="lv">
      <div className="lv-bar">
        <span className="lv-dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="lv-url mo">{host}</span>
        <span className="lv-tools">
          <button aria-pressed={!phone} onClick={() => setPhone(false)}>{c.desktop}</button>
          <button aria-pressed={phone} onClick={() => setPhone(true)}>{c.phone}</button>
          <button onClick={() => { setOn(true); setKey((k) => k + 1); }}>{c.reload}</button>
          <a href={url} target="_blank" rel="noopener noreferrer" aria-label={c.open}>↗</a>
        </span>
      </div>
      <div className="lv-stage">
        {on ? (
          <iframe key={key} className={phone ? 'phone' : ''} src={url} title={title} loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" />
        ) : (
          <div className="lv-poster">
            <p>{c.note}</p>
            <button className="btn p" onClick={() => setOn(true)}>{c.load} →</button>
          </div>
        )}
      </div>
    </div>
  );
}
