import { assertEquals } from "std/testing";
import { translate } from "../src/lib/translate.ts";

const data = {
  anthem: `Ще не вмерла України ні слава, ні воля.
Ще нам, браття молодії, усміхнеться доля.
Згинуть наші воріженьки, як роса на сонці,
Запануєм і ми, браття, у своїй сторонці.

Душу й тіло ми положим за нашу свободу
І покажем, що ми, браття, козацького роду!`,
  pangram: `Жебракують філософи при ґанку церкви в Гадячі, ще й шатро їхнє п'яне знаємо`,
  emoji: "Україна 🇺🇦",
  prudeus: {
    anthem: `Šče ne vmerla Ukrajiny ni slava, ni volja.
Šče nam, brattja molodiji, usmihnet'sja dolja.
Zgynut' naši vorižen'ky, jak rosa na sonсi,
Zapanujem i my, brattja, u svojij storonсi.

Dušu j tilo my položym za našu svobodu
I pokažem, ščo my, brattja, kozaс'kogo rodu!`,
    pangram: `Žebrakujut' filosofy pry ĝanku сerkvy v Gadjači, šče j šatro jihnje p'jane znajemo`,
    emoji: "Ukrajina 🇺🇦",
  },
};

Deno.test("Prudeus", async (t) => {
  await t.step("Anthem", () => {
    const translation = translate(data.anthem, "prudeus");
    assertEquals(translation, data.prudeus.anthem);
  });
  await t.step("Pangram", () => {
    const translation = translate(data.pangram, "prudeus");
    assertEquals(translation, data.prudeus.pangram);
  });
  await t.step("Emoji", () => {
    const translation = translate(data.emoji, "prudeus");
    assertEquals(translation, data.prudeus.emoji);
  });
});
