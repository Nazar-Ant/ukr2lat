import { Menu } from "grammy/menu";
import { alphabetNames, translate } from "../lib/translate.ts";
import type { AlphabetName, MyContext } from "../types.ts";

export const alphabetsMenu = new Menu<MyContext>("alphabets")
  .dynamic((ctx, range) => {
    Object.entries(alphabetNames).forEach(({ 0: alphabet, 1: name }, index) => {
      const alphabetName = alphabet as AlphabetName;
      if (ctx.session.alphabetName !== alphabet) {
        range.text(name, async (ctx) => {
          const { message } = ctx.callbackQuery;
          if (message === undefined) return;
          const originalText = message.reply_to_message?.text;
          if (originalText === undefined) return;
          const translation = translate(originalText, alphabetName);
          try {
            await ctx.api.editMessageText(
              ctx.chat?.id as number,
              message.message_id,
              translation,
            );
          } catch (_error) {
            // sometimes the translations of different alphabets are the same,
            // so the content for updating the message is the same, which causes an error
          }
          ctx.session.alphabetName = alphabetName;
          await ctx.menu.update({ immediate: true });
        });
      }
      if (index === 1) range.row();
    });
  });
