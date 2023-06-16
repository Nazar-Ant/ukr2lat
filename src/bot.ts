import "https://deno.land/std@0.190.0/dotenv/load.ts";
import { Bot, session } from "grammy";
import type { MyContext } from "./types.ts";
import { translate } from "./lib/translate.ts";
import { alphabetsMenu } from "./menus/alphabets.ts";

const bot = new Bot<MyContext>(Deno.env.get("BOT_TOKEN") || "");
// @ts-expect-error: some problem with recognizing a string as an AlphabetName type
bot.use(session({ initial: () => ({ alphabetName: "prudeus" }) }));
bot.use(alphabetsMenu);

bot.command("start", (ctx) =>
  ctx.reply(
    `Вітаю! Я - бот, який перекладе україномовний текст латинкою.
Просто надішли мені текстове повідомлення.
Якщо хочеш змінити своє повідмолення, відредагуй його, а я синхронізую переклад.
До кожного перекладу я додаю кілька кнопок, щоб ти мав змогу перемикатися між різними абетками.
Щоб побачити приклади перекладів, надішли мені /help.`,
  ));
bot.on("message:text", (ctx) =>
  ctx.reply(
    translate(ctx.message.text, ctx.session.alphabetName),
    {
      reply_markup: alphabetsMenu,
      reply_to_message_id: ctx.message.message_id,
    },
  ));
bot.on("edited_message:text", (ctx) =>
  ctx.api.editMessageText(
    ctx.chat.id,
    ctx.editedMessage.message_id + 1,
    translate(ctx.editedMessage.text, ctx.session.alphabetName),
  ));

bot.start();
