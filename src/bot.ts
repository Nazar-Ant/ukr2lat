import "https://deno.land/std@0.185.0/dotenv/load.ts";
import { Bot, session } from "grammy";
import { conversations } from "grammy/conversations";
import type { MyContext } from "./types.ts";

const bot = new Bot<MyContext>(Deno.env.get("BOT_TOKEN") || "");

bot.use(session({ initial: () => ({}) }));
bot.use(conversations());

bot.command("start", (ctx) => ctx.reply("hello"));

bot.start();
