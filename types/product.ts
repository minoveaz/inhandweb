import { Locale } from './routes';

export interface ProductVariant {
  id: string;
  name: Record<Locale, string>;
  colorHex: string;
  accentHex?: string;
  inStock: boolean;
}

export interface ProductMeaningValue {
  iconPath: string;
  label: Record<Locale, string>;
}

export interface ProductSpecs {
  materials: Record<Locale, string>;
  dimensions: Record<Locale, string>;
  weight: string;
  care: Record<Locale, string>;
  packaging: Record<Locale, string>;
}

export interface ProductBiblicalReference {
  citation: Record<Locale, string>;
  verseText: Record<Locale, string>;
}

export interface ProductBehindTheMeaning {
  headline: Record<Locale, string>;
  story: Record<Locale, string>;
  designNote: Record<Locale, string>;
  values: ProductMeaningValue[];
}

export interface ProductImages {
  main: string;
  angle: string;
  detail: string;
  inhand: string;
  box: string;
  lifestyle?: string;
}

export interface Product {
  id: string;
  sku: string;
  slug: string;
  categorySlug: string;
  categoryEditorial: string;
  name: Record<Locale, string>;
  shortDescriptor: Record<Locale, string>;
  priceEur: number;
  featuredInFirstDrop: boolean;
  badge?: Record<Locale, string>;
  images: ProductImages;
  variants: ProductVariant[];
  description: Record<Locale, string>;
  biblicalReference: ProductBiblicalReference;
  behindTheMeaning: ProductBehindTheMeaning;
  specs: ProductSpecs;
}

export interface ProductCategory {
  id: string;
  number: string;
  slug: string;
  editorialName: string;
  iconPath: string;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  itemsSummary: Record<Locale, string[]>;
}
