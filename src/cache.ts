export const createValidatorCache = () => {
    const map = new WeakMap<Function, (value: unknown) => boolean>();

    return {
        get(k: Function){
            return map.get(k);
        },
        set(k: Function, v: (value: unknown) => boolean){
            return map.set(k, v), v;
        }
    }
}
