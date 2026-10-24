export type Locale = 'es' | 'en';

export interface RouteDefinition {
  id: string;
  paths: Record<Locale, string>;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
}
