import { custom } from "./custom";
import { fetchInstanceValidator, schemaToValidator } from "./validator";
import type { ValynInstance } from "./types";
import { createValidatorCache } from "./cache";

const returnTrue = () => true;

const anyCustom = custom<any>(returnTrue as any);
export const any = () => anyCustom;

const unknownCustom = custom<unknown>(returnTrue as any);
export const unknown = () => unknownCustom;

export const instance = <T>(constructor: new (...args: unknown[]) => T) =>
    custom<T>(fetchInstanceValidator(constructor, (value: unknown): value is T =>
            value instanceof constructor) as any);

const fetchArrayValidator = createValidatorCache();

export const array = <T>(child: T) => {
    const child_validate = schemaToValidator(child);
    
    return custom<ValynInstance<T>[]>(fetchArrayValidator(child_validate, 
        (value): value is ValynInstance<T>[] =>
            Array.isArray(value) && value.every(e=>child_validate(e))) as any);
}
