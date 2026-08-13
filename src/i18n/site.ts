export type Lang = 'es' | 'en';

// TODO: replace with the real production domain before launch.
export const SITE_URL = 'https://www.akai.ai';

export const DEFAULT_LANG: Lang = 'es';

export const nav = {
  es: {
    home: 'Inicio',
    vision: 'Visión',
    process: 'Proceso',
    caseStudies: 'Casos de estudio',
    casePalm: 'Palma de aceite',
    caseRoots: 'Rosas de exportación',
    technology: 'Tecnología',
    carbon: 'Carbono',
    trackRecord: 'Trayectoria',
    team: 'Equipo',
    contact: 'Contacto',
    cta: 'Necesito más información',
    menu: 'Menú',
    langEs: 'ES',
    langEn: 'EN',
  },
  en: {
    home: 'Home',
    vision: 'Vision',
    process: 'Process',
    caseStudies: 'Case Studies',
    casePalm: 'Oil Palm',
    caseRoots: 'Export Roses',
    technology: 'Technology',
    carbon: 'Carbon',
    trackRecord: 'Track Record',
    team: 'Team',
    contact: 'Contact',
    cta: 'I need more information',
    menu: 'Menu',
    langEs: 'ES',
    langEn: 'EN',
  },
} as const;

export interface RouteDef {
  slug: string; // path segment under /es/ and /en/, '' for home
  es: string;
  en: string;
}

// Single source of truth for the site map — used to build nav links,
// hreflang alternates, and the sitemap.
export const routes: RouteDef[] = [
  { slug: '', es: '/es/', en: '/en/' },
  { slug: 'vision', es: '/es/vision/', en: '/en/vision/' },
  { slug: 'process', es: '/es/process/', en: '/en/process/' },
  { slug: 'case-studies/palm', es: '/es/case-studies/palm/', en: '/en/case-studies/palm/' },
  { slug: 'case-studies/roots', es: '/es/case-studies/roots/', en: '/en/case-studies/roots/' },
  { slug: 'technology', es: '/es/technology/', en: '/en/technology/' },
  { slug: 'carbon', es: '/es/carbon/', en: '/en/carbon/' },
  { slug: 'track-record', es: '/es/track-record/', en: '/en/track-record/' },
  { slug: 'team', es: '/es/team/', en: '/en/team/' },
  { slug: 'contact', es: '/es/contact/', en: '/en/contact/' },
];

export function altPath(slug: string, lang: Lang): string {
  const r = routes.find((rt) => rt.slug === slug);
  return r ? r[lang] : lang === 'es' ? '/es/' : '/en/';
}
