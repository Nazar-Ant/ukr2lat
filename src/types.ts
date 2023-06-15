import type { Context, SessionFlavor } from "grammy";
import type { ConversationFlavor, ConversationFn } from "grammy/conversations";

export type MyContext =
  & Context
  & SessionFlavor<{ alphabetName: AlphabetName }>
  & ConversationFlavor;
export type MyConversationFn = ConversationFn<MyContext>;
export type AlphabetName = "prudeus" | "passport" | "geography" | "iso9";
export type Alphabet = Record<string, string | { start: string; other: string }>;
export type Alphabets = Record<AlphabetName, Alphabet>;
