import type { Context, SessionFlavor } from "grammy";

export type MyContext = Context & SessionFlavor<{ alphabetName: AlphabetName }>;
export type AlphabetName = "prudeus" | "passport" | "geography" | "iso9";
export type Alphabet = Record<string, string | { start: string; other: string }>;
export type Alphabets = Record<AlphabetName, Alphabet>;
