import "https://deno.land/std@0.190.0/dotenv/load.ts";
import { Bot, session } from "grammy";
import { conversations } from "grammy/conversations";
import type { MyContext } from "./types.ts";

const bot = new Bot<MyContext>(Deno.env.get("BOT_TOKEN") || "");
const ukrLatAlphabet: Record<string, string> = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  ґ: "ĝ",
  д: "d",
  е: "e",
  є: "je",
  з: "z",
  ж: "ž",
  и: "y",
  і: "i",
  ї: "ji",
  й: "j",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "h",
  ц: "с",
  ч: "č",
  ш: "š",
  щ: "šč",
  ь: "'",
  ю: "ju",
  я: "ja",
};

bot.use(session());
bot.use(conversations());

bot.command("start", (ctx) => ctx.reply("hello"));
bot.on("message:text", (ctx) => {
  const translation = ctx.message.text.split("").map((char) => {
    const isUkrainianLetter = /[А-ЩЬЮЯҐЄІЇа-щьюяґєії]/.test(char);
    if (!isUkrainianLetter) return char;
    const lowerCaseChar = char.toLowerCase();
    const traslatedChar = ukrLatAlphabet[lowerCaseChar];
    if (char === lowerCaseChar) return traslatedChar;
    if (traslatedChar.length === 1) return traslatedChar.toUpperCase();
    else {
      const [first, second] = traslatedChar.split("");
      return first.toUpperCase() + second;
    }
  }).join("");
  ctx.reply(translation);
});

bot.start();
