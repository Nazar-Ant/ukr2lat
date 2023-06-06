import "https://deno.land/std@0.190.0/dotenv/load.ts";
import { Bot, session } from "grammy";
import { conversations } from "grammy/conversations";
import type { MyContext } from "./types.ts";
import { translate } from "./lib/translate.ts";

const bot = new Bot<MyContext>(Deno.env.get("BOT_TOKEN") || "");

bot.use(session({ initial: () => ({ alphabetName: "prudeus" }) }));
bot.use(conversations());

bot.command("start", (ctx) => ctx.reply("hello"));
bot.on("message:text", (ctx) => ctx.reply(translate(ctx.message.text, ctx.session.alphabetName)));

bot.start();
