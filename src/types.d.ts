declare type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]> | null;
    }
  : T;

declare type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
