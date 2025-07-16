import type { CustomValidator } from "./custom";

type Primitive = null | void | bigint | boolean | number | string | symbol;

export type ValynInstance<T> =
    T extends BooleanConstructor ? boolean :
    T extends BigIntConstructor ? bigint :
    T extends NumberConstructor ? number :
    T extends StringConstructor ? string :
    T extends SymbolConstructor ? symbol :
    T extends RegExp ? string :
    T extends Primitive ? T :
    T extends CustomValidator<infer R> ? R :
    T extends readonly unknown[] ? ValynInstance<T[number]> :
    T extends new (...args: unknown[]) => infer R ? R :
    T extends {[key: string]: unknown} ? {
        [key in keyof T]: ValynInstance<T[key]>
    } : never;

export type ValynValidator<T> = ((value: unknown) => value is ValynInstance<T>) & {
    type?: string;
};

export interface Valyn<T> {
    schema: T,
    isValid(value: unknown): value is ValynInstance<T>,
    parse(value: unknown): ValynInstance<T>,
}

export type Infer<T extends Valyn<unknown>> =
    T extends Valyn<infer R> ? ValynInstance<R> : never;
