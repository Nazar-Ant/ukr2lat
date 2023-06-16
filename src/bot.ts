import "https://deno.land/std@0.190.0/dotenv/load.ts";
import { Bot, InlineKeyboard, session } from "grammy";
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
bot.command("help", (ctx) =>
  ctx.reply(
    `Наразі я підтримую ось ці абетки: Проєкт Прудеуса, Паспортна, Географічна та ISO 9\\.
Зараз я наведу приклади використання кожно абетки на основі панграми, речення, яке містить усі літери української кириличної абетки, "Жебракують філософи при ґанку церкви в Гадячі, ще й шатро їхнє п'яне знаємо"\\.

*Проєкт Прудеуса*: _Žebrakujut' filosofy pry ĝanku сerkvy v Gadjači, šče j šatro jihnje p'jane znajemo_\\.

*Паспортна*: _Zhebrakuiut filosofy pry ganku tserkvy v Hadiachi, shche y shatro yikhnie pyane znaiemo_\\.

*Географічна*: _Zhebrakuiut' filosofy pry ganku tserkvy v Hadiachi, sche y shatro yikhnie p'yane znaiemo_\\.

*ISO 9*: _Žebrakuût´ fìlosofi pri ģanku cerkvi v Hadâčì, šče j šatro їhnê p'âne znaêmo_\\.

Нижче ти можеш побачити посилання на відповідні абетки\\.
`,
    {
      reply_markup: new InlineKeyboard([[
        { text: "Проєкт Прудеуса", url: "https://youtu.be/nHeE2x2UNw4/" },
        // deno-fmt-ignore
        { text: "Інші", url: "https://uk.wikipedia.org/wiki/%D0%9B%D0%B0%D1%82%D0%B8%D0%BD%D1%96%D0%B7%D0%B0%D1%86%D1%96%D1%8F_%D1%83%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D1%81%D1%8C%D0%BA%D0%BE%D1%97_%D0%BC%D0%BE%D0%B2%D0%B8#%D0%97%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B0_%D1%96%D1%81%D1%82%D0%BE%D1%80%D1%96%D1%8F_%D0%B2%D0%BF%D0%BE%D1%80%D1%8F%D0%B4%D0%BA%D1%83%D0%B2%D0%B0%D0%BD%D0%BD%D1%8F/" },
      ]]),
      parse_mode: "MarkdownV2",
    },
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
