import type { Context } from "grammy";
import type { ConversationFlavor, ConversationFn } from "grammy/conversations";

export type MyContext = Context & ConversationFlavor;
export type MyConversationFn = ConversationFn<MyContext>;
