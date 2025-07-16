import { custom } from "./custom";
import { instanceCache, schemaToValidator } from "./validator";
import type { ValynInstance } from "./types";
import { createValidatorCache } from "./cache";

const anyCustom = custom<any>((value): value is any => true);
export const any = () => anyCustom;

const unknownCustom = custom<unknown>((value): value is unknown => true);
export const unknown = () => unknownCustom;

export const instance = <T>(constructor: new (...args: unknown[]) => T) =>
    custom<T>(instanceCache.get(constructor) ??
        instanceCache.set(constructor, (value): value is T =>
            value instanceof constructor) as any);

const arrayCache = createValidatorCache();

export const array = <T>(child: T) => {
    const child_validate = schemaToValidator(child);
    
    return custom<ValynInstance<T>[]>(arrayCache.get(child_validate) ??
        arrayCache.set(child_validate, (value): value is ValynInstance<T>[] =>
            Array.isArray(value) && value.every(e=>child_validate(e))) as any);
}
