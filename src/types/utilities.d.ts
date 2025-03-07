/** Widen start */
type OptionalKeys<T> = T extends any
    ? { [K in keyof T]-?: {} extends Pick<T, K> ? K : never }[keyof T]
    : never;

type Idx<T, K extends PropertyKey, D = never> = T extends any
    ? K extends keyof T
        ? T[K]
        : D
    : never;

type AllKeys<T> = T extends any ? keyof T : never;

type PartialKeys<T, K extends keyof T> = Omit<T, K> &
    Partial<Pick<T, K>> extends infer O
    ? { [P in keyof O]: O[P] }
    : never;

export type Widen<T> = [T] extends [Array<infer E>]
    ? { [K in keyof T]: Widen<T[K]> }
    : [T] extends [object]
      ? PartialKeys<
            { [K in AllKeys<T>]: Widen<Idx<T, K>> },
            Exclude<AllKeys<T>, keyof T> | OptionalKeys<T>
        >
      : T;
/** Widen end */

export type FilterByType<Source, Condition> = {
    [K in keyof Source]: Source[K] extends Condition ? K : never;
}[keyof Source];

export type StringOfLength<Min, Max> = string & {
    __value__: never;
};

export type NestedKeyOf<ObjectType extends object> = {
    [Key in keyof ObjectType &
        (string | number)]: ObjectType[Key] extends object
        ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
        : `${Key}`;
}[keyof ObjectType & (string | number)];
