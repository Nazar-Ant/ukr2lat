import { assertEquals } from "std/testing";
import { translate } from "../src/lib/translate.ts";
import { AlphabetName } from "../src/types.ts";

const data: Record<"pangram" | AlphabetName, string> = {
  pangram: "Жебракують філософи при ґанку церкви в Гадячі, ще й шатро їхнє п'яне знаємо",
  prudeus: "Žebrakujut' filosofy pry ĝanku сerkvy v Gadjači, šče j šatro jihnje p'jane znajemo",
  // deno-fmt-ignore
  passport: "Zhebrakuiut filosofy pry ganku tserkvy v Hadiachi, shche y shatro yikhnie pyane znaiemo",
  // deno-fmt-ignore
  geography: "Zhebrakuiut' filosofy pry ganku tserkvy v Hadiachi, sche y shatro yikhnie p'yane znaiemo",
  iso9: "Žebrakuût´ fìlosofi pri ģanku cerkvi v Hadâčì, šče j šatro їhnê p'âne znaêmo",
};
const removeNoteAboutUsedAlphabet = (translation: string) => {
  const noteIndex = translation.indexOf("\n\nВикористана абетка");
  return translation.slice(0, noteIndex);
};

Deno.test("translate", async (t) => {
  await t.step("prudeus", () => {
    const translation = translate(data.pangram, "prudeus");
    assertEquals(removeNoteAboutUsedAlphabet(translation), data.prudeus);
  });
  await t.step("passport", () => {
    const translation = translate(data.pangram, "passport");
    assertEquals(removeNoteAboutUsedAlphabet(translation), data.passport);
  });
  await t.step("geography", () => {
    const translation = translate(data.pangram, "geography");
    assertEquals(removeNoteAboutUsedAlphabet(translation), data.geography);
  });
  await t.step("iso9", () => {
    const translation = translate(data.pangram, "iso9");
    assertEquals(removeNoteAboutUsedAlphabet(translation), data.iso9);
  });
});
