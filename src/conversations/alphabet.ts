import { InlineKeyboard } from "grammy";
import type { AlphabetName, MyConversationFn } from "../types.ts";

export const alphabetConvesation: MyConversationFn = async (conversation, ctx) => {
  const alphabets = new InlineKeyboard([
    [
      { text: "Проєкт Прудеуса", callback_data: "prudeus" },
      { text: "Паспортна", callback_data: "passport" },
    ],
    [
      { text: "Географічна", callback_data: "geography" },
      { text: "ISO 9", callback_data: "iso9" },
    ],
  ]);
  await ctx.reply(
    `Оберіть абетку, яка буде типово для перекладу.
P.S. Спочатку типова абетка - Проєкт Прудеуса`,
    { reply_markup: alphabets },
  );
  const { match: alphabetName } = await conversation.waitForCallbackQuery(
    ["prudeus", "passport", "geography", "iso9"],
  );
  conversation.session.alphabetName = alphabetName as AlphabetName;
  await ctx.reply("Чудово! Типова абетка оновлена.");
};
