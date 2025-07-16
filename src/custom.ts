export class CustomValidator<T>{
    validate: (value: unknown) => value is T;
    constructor(validator: (value: unknown) => value is T){
        this.validate = validator;
    }
}

export const custom = <T>(validator: (value: unknown) => value is T) =>
    new CustomValidator<T>(validator);
