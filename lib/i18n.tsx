'use client';

import { createContext, useContext } from 'react';
import type { Lang } from './projects';

/* The site is English only. The context stays so components keep a single way to read the language. */
const Ctx = createContext<{ lang: Lang }>({ lang: 'en' });

export function LangProvider({ children }: { children: React.ReactNode }) {
  return <Ctx.Provider value={{ lang: 'en' }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
