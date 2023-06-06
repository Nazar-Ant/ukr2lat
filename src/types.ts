import type { Context, SessionFlavor } from "grammy";
import type { ConversationFlavor, ConversationFn } from "grammy/conversations";

export type MyContext =
  & Context
  & SessionFlavor<{ alphabetName: AlphabetName }>
  & ConversationFlavor;
export type MyConversationFn = ConversationFn<MyContext>;
export type AlphabetName = "prudeus";
export type Alphabet = Record<string, string>;
export type Translate = (text: string) => string;
