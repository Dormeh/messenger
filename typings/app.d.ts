declare global {
  export type Nullable<T> = T | null;

  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];
  interface ImportMeta {
    url: string;
  }
}
declare module '*.hbs';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module "*.svg";
declare module '*.json';

export {}
