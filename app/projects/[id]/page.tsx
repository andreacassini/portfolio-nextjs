import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectPage from '@/components/ProjectPage';
import { allProjects } from '@/lib/projects';

export const dynamicParams = false;

export function generateStaticParams() {
  return allProjects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = allProjects.find((x) => x.id === id);
  if (!p) return {};
  return {
    title: `${p.title} | Andrea Cassini`,
    description: p.one.en,
    alternates: { canonical: `/projects/${p.id}` },
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!allProjects.some((p) => p.id === id)) notFound();
  return <ProjectPage id={id} />;
}
