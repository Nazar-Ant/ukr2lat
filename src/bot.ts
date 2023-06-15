import "https://deno.land/std@0.190.0/dotenv/load.ts";
import { Bot, session } from "grammy";
import { conversations, createConversation } from "grammy/conversations";
import type { MyContext } from "./types.ts";
import { translate } from "./lib/translate.ts";
import { alphabetConvesation } from "./conversations/alphabet.ts";

const bot = new Bot<MyContext>(Deno.env.get("BOT_TOKEN") || "");
// @ts-expect-error: some problem with recognizing a string as an AlphabetName type
bot.use(session({ initial: () => ({ alphabetName: "prudeus" }) }));
bot.use(conversations());
bot.use(createConversation(alphabetConvesation, "alphabet"));

bot.command("start", (ctx) => ctx.reply("hello"));
bot.command("alphabet", (ctx) => ctx.conversation.enter("alphabet"));
bot.command("cancel", async (ctx) => {
  await ctx.conversation.exit();
  await ctx.reply("Операція скасована.");
});
bot.on("message:text", (ctx) => ctx.reply(translate(ctx.message.text, ctx.session.alphabetName)));
bot.on("edited_message:text", (ctx) => {
  const messageIdToEdit = ctx.editedMessage.message_id + 1;
  const translation = translate(ctx.editedMessage.text, ctx.session.alphabetName);
  return ctx.api.editMessageText(ctx.chat.id, messageIdToEdit, translation);
});

bot.start();
