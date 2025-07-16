import { createValidatorCache } from "./cache";
import { CustomValidator } from "./custom";
import { type ValynValidator } from "./types";

const isFunction = (v: unknown) => typeof v === "function";
const isBoolean = (v: unknown) => typeof v === "boolean";
const isBigint = (v: unknown) => typeof v === "bigint";
const isNumber = (v: unknown) => typeof v === "number";
const isString = (v: unknown) => typeof v === "string";
const isSymbol = (v: unknown) => typeof v === "symbol";

export const fetchInstanceValidator = createValidatorCache();

const isNull = (v: unknown) => v === null;

const aniedSchemaToValidator = (schema: unknown): (v: unknown) => boolean => {
    switch(typeof schema){
        case "function":
            if(schema === Function) return isFunction;
            else if(schema === Boolean) return isBoolean;
            else if(schema === BigInt) return isBigint;
            else if(schema === Number) return isNumber;
            else if(schema === String) return isString;
            else if(schema === Symbol) return isSymbol;
            else return fetchInstanceValidator(schema, v => v instanceof schema);
        case "object":
            if(schema === null)
                return isNull;
            else if(schema instanceof RegExp)
                return v => typeof v === "string" && schema.test(v);
            else if(schema instanceof CustomValidator)
                return schema.validate;
            else if(schema instanceof Array){ // Union
                const validators = schema.map(e=>aniedSchemaToValidator(e));
                return v => validators.some(e=>e(v));
            }else{
                const entryValidators = Object.entries(schema).map(([k, schema])=>{
                    const validator = aniedSchemaToValidator(schema);
                    return (v:Record<keyof any, unknown>) => validator(v[k]);
                });
                return v =>
                    typeof v === "object" &&
                    v !== null &&
                    entryValidators.every(e=>e(v as any));
            }
        default:
            return v => v === schema;
    }
}

export const schemaToValidator = <T>(schema: T): ValynValidator<T> =>
    aniedSchemaToValidator(schema) as any;
