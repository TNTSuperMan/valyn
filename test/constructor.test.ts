import { describe, expect, it, test } from "bun:test";
import type { Valyn, ValynInstance } from "../src/types";
import v from "../src";

describe("プリミティブ型", () => {
    function testPrimitive<T>(schema: Valyn<T>, correct: ValynInstance<T>, incorrect: unknown){
        it("成功ケース", () => {
            expect(schema.isValid(correct)).toBe(true);
        })
        it("失敗ケース", () => {
            expect(schema.isValid(incorrect)).toBe(false);
        })
    }

    test("Boolean", () => testPrimitive(v(Boolean), true, Symbol()));
    test("Bigint", () => testPrimitive(v(BigInt), 10n, 10));
    test("Number", () => testPrimitive(v(Number), 114514, "1919"));
    test("String", () => testPrimitive(v(String), "hello", 4649));
    test("Symbol", () => testPrimitive(v(Symbol), Symbol(), "symbol()"));
})
