export const createValidatorCache = <T extends (value: unknown) => boolean>() => {
    const map = new WeakMap<Function, T>();

    return (k: Function, v: T): T =>
        map.get(k) ?? (map.set(k, v), v);
}
