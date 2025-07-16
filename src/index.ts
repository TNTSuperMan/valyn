import { schemaToValidator } from "./validator";
import type { Valyn } from "./types";

export type { Infer } from "./types";
export * from "./customs";
export { custom } from "./custom";

const v = <T>(schema: T): Valyn<T> => {
    const validate = schemaToValidator(schema);
    return {
        schema,
        isValid: validate,
        parse(value){
            if(validate(value)) return value;
            else throw new Error("Validation failed");
        }
    }
}

export default v;
