import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'Andrea Cassini, junior software developer in Torino';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const KANJI = "M49.3 39.4Q51.6 39.5 54.1 39.6H57.9L58.7 38.3Q58.9 38 59.2 37.7Q59.4 37.3 59.6 37.1Q59.7 37 59.9 37Q60.1 37 60.9 37.6Q61.8 38.3 62.5 39.1Q63.2 39.8 63.2 40.1Q63 40.8 62.2 40.8H58.2V44.4H61.6L62.4 43.1Q62.6 42.9 62.9 42.5Q63.1 42.2 63.3 42Q63.4 41.8 63.6 41.8Q63.8 41.8 64.7 42.5Q65.6 43.2 66.4 44Q67.2 44.8 67.2 45Q66.8 45.6 65.8 45.8V48.5Q65.9 51.8 66.1 53.7Q65.8 54 64.8 54.4Q63.8 54.8 62.4 54.8H61.7V53.3H58.2Q59.5 56.2 62.2 58.1Q64.9 60 68.4 60.6V61Q67.1 61.4 66.3 62.6Q65.4 63.8 65 65.6Q62 63.9 60.3 61.2Q58.5 58.6 57.6 54.4Q56.7 58.2 53.6 61Q50.5 63.8 44 65.6L43.8 65.1Q48.6 62.8 50.9 59.9Q53.2 57 53.7 53.3H50.6V54.4Q50.6 54.6 50.2 54.8Q49.8 55.1 49 55.3Q48.2 55.4 47.3 55.4Q46.8 55.4 46.6 55.2Q46.4 55 46.4 54.6Q46.6 53.2 46.6 51V48.8Q46.4 49.4 46 49.7Q45.5 50 45 50Q44.1 50 43.3 49.2Q43.2 47.9 42.8 46.3Q42.3 44.8 41.6 43.5V54.6Q41.7 59.6 41.9 64Q41.6 64.5 40.4 65Q39.2 65.6 38.1 65.6Q37.5 65.6 37.1 65.3Q36.8 65.1 36.8 64.8Q37 62.6 37.1 60.4Q37.2 58.3 37.2 55V49.6Q35.1 53.4 32 56.2L31.5 55.8Q35.3 49.5 36.8 39.1H35.4Q34.3 39.1 33 39.6L32 37.6Q33.4 37.8 35.5 37.9H37.2V36.1Q37.2 31 36.7 27.9Q40 28.6 41.3 29.1Q42.6 29.5 42.6 29.8Q42.6 30 42.3 30.2L41.6 30.6V37.9H41.8L42.6 36.4Q42.8 36.2 43 35.8Q43.3 35.4 43.5 35.1Q43.7 34.9 43.8 34.9Q44.1 34.9 44.9 35.7Q45.7 36.4 46.5 37.3Q47.2 38.2 47.2 38.4Q47 39.1 46.2 39.1H41.6V42.6L41.6 42.5Q43.8 43.3 45 44.4Q46.2 45.5 46.6 46.6Q46.6 44.2 46.4 42.4L51 44.4H54V40.8H52.4Q51.2 40.8 49.8 41.3L48.9 39.6Q47.2 40.8 45.4 41.6L45.1 41.2Q47.8 39 50 35.2Q51 33.5 51.8 31.4Q52.5 29.3 52.6 27.6Q58.4 29.2 58.4 29.8Q58.4 29.9 58.1 30.1L57.3 30.4Q59.1 32.6 62.1 34.2Q65.1 35.8 68.4 36.5L68.4 37Q66.4 37.9 66 41.3Q63 39.6 60.7 36.8Q58.3 34.1 56.8 30.8Q55.7 33.2 53.8 35.4Q51.8 37.6 49.3 39.4ZM54 45.5H50.6V52.2H53.9Q54 50.8 54 49.3ZM58.2 49.2Q58.2 50.9 58 52.2H61.7V45.5H58.2Z";

export default async function Image() {
  const font = await readFile(join(process.cwd(), 'app/fonts/ShipporiMincho-ExtraBold-latin.ttf'));
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#0b0d12', color: '#e8eaf0', fontFamily: 'Shippori', padding: '64px 72px', position: 'relative' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: 700 }}>
          <div style={{ display: 'flex', fontSize: 22, letterSpacing: 3, color: '#8a92a3' }}>JUNIOR SOFTWARE DEVELOPER · TORINO</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontSize: 120, lineHeight: 1.02, letterSpacing: -3 }}>Andrea</div>
            <div style={{ display: 'flex', fontSize: 120, lineHeight: 1.02, letterSpacing: -3 }}>Cassini</div>
            <div style={{ display: 'flex', fontSize: 34, color: '#8a92a3', marginTop: 28 }}>Three years finding what breaks. Now building what doesn&apos;t.</div>
          </div>
          <div style={{ display: 'flex', fontSize: 28, color: '#ffb347', letterSpacing: 2 }}>andreacassini.com</div>
        </div>
        <div style={{ display: 'flex', position: 'absolute', right: 70, top: 130, width: 380, height: 380, transform: 'rotate(-8deg)' }}>
          <svg width="380" height="380" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" fill="none" stroke="#e2382c" strokeWidth="4.5" />
            <circle cx="50" cy="50" r="38" fill="none" stroke="#e2382c" strokeWidth="1.4" />
            <path d={KANJI} fill="#e2382c" />
          </svg>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: 'Shippori', data: font, weight: 800, style: 'normal' }] },
  );
}
