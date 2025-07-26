import { run, bench } from "mitata";

import z from "zod";
import v, { array, type Infer } from "../src";

const createZodSchema = () => z.object({
  id: z.string(),
  author: z.object({
    id: z.string(),
    username: z.string().min(3),
    displayName: z.string().optional(),
    verified: z.boolean(),
    metadata: z.object({
      badges: z.array(z.string()),
      createdAt: z.date(),
    }),
  }),
  content: z.string().max(1000),
  tags: z.array(z.string()),
  reactions: z.object({
    like: z.number(),
    dislike: z.number(),
    laugh: z.number(),
    custom: z.record(z.string(), z.number()),
  }),
  isPublic: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  comments: z.array(z.object({
    id: z.string(),
    userId: z.string(),
    messages: z.string().max(300),
    createdAt: z.date(),
  })),
});

const createValynSchema = () => v({
  id: String,
  author: {
    id: String,
    username: String,
    displayName: [String, undefined],
    verified: Boolean,
    metadata: {
      badges: array(String),
      createdAt: Date,
    },
  },
  content: String,
  tags: array(String),
  reactions: {
    like: Number,
    dislike: Number,
    laugh: Number,
    custom: {},
  },
  isPublic: Boolean,
  createdAt: Date,
  updatedAt: Date,
  comments: array({
    id: String,
    userId: String,
    messages: String,
    createdAt: Date,
  }),
});


const obj = (): Infer<typeof valynSchema> => ({
  id: "TNTOS",
  author: {
    id: "AAEEVVRR",
    username: "TNTSuperMan",
    displayName: undefined,
    verified: true,
    metadata: {
      badges: ["BombBadge"],
      createdAt: new Date(),
    },
  },
  content: "Ultimate TNT Operating System",
  tags: ["os", "cpp", "tnt", "mikanos"],
  reactions: {
    like: 255,
    dislike: -1,
    laugh: 128,
    custom: {},
  },
  isPublic: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  comments: [{
    id: "AABBCCDD",
    userId: "TNTSuperMan",
    messages: "Good!",
    createdAt: new Date(),
  },{
    id: "DDEEGGCC",
    userId: "sktryo",
    messages: "wow",
    createdAt: new Date(),
  },],
});

bench("Create zod schema", createZodSchema);
bench("Create valyn schema", createValynSchema);

const zodSchema = createZodSchema();
const valynSchema = createValynSchema();

bench("Validate zod schema", () => zodSchema.parse(obj()));
bench("Validate valyn schema", () => valynSchema.parse(obj()));

await run();
