# Valyn
Zod的なバリデーションライブラリです。

## 特徴
### 1. シンプル
Zodだと...
```js
const schema = z.object({
    id: z.number(),
    name: z.string(),
    created: z.date(),
    icon: z.instanceof(Blob),
    posts: z.array(z.object({
        text: z.string(),
        postAt: z.date(),
        image: z.instanceof(Blob).optional(),
    })),
});
```
長ーいめんどくさーい

Valynだと...
```js
const schema = V({
    id: Number,
    name: String,
    created: Date,
    icon: Blob,
    posts: array({
        text: String,
        postAt: Date,
        image: [Blob, undefined]
    })
})
```
シンプル！

### 2. 速い
あくまで作者のベンチマークだけど(us/iter)
|状況|Zod|Valyn|
|-|-|-|
|スキーマ作成|296.53|4.13|
|バリデーション|4.97|1.13|

バリデーションライブラリは5倍、スキーマ作成は70倍ぐらい速い

...大した事ねえな
