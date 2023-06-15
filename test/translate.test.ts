import { assertEquals } from "std/testing";
import { translate } from "../src/lib/translate.ts";
import { AlphabetName } from "../src/types.ts";

const data: Record<"pangram" | AlphabetName, string> = {
  pangram: "Жебракують філософи при ґанку церкви в Гадячі, ще й шатро їхнє п'яне знаємо",
  prudeus: "Žebrakujut' filosofy pry ĝanku сerkvy v Gadjači, šče j šatro jihnje p'jane znajemo",
  passport:
    "Zhebrakuiut filosofy pry ganku tserkvy v Hadiachi, shche y shatro yikhnie pyane znaiemo",
  geography:
    "Zhebrakuiut' filosofy pry ganku tserkvy v Hadiachi, sche y shatro yikhnie p'yane znaiemo",
  iso9: "Žebrakuût´ fìlosofi pri ģanku cerkvi v Hadâčì, šče j šatro їhnê p'âne znaêmo",
};

Deno.test("translate", async (t) => {
  await t.step("prudeus", () => {
    const translation = translate(data.pangram, "prudeus");
    assertEquals(translation, data.prudeus);
  });

  await t.step("passport", () => {
    const translation = translate(data.pangram, "passport");
    assertEquals(translation, data.passport);
  });

  await t.step("geography", () => {
    const translation = translate(data.pangram, "geography");
    assertEquals(translation, data.geography);
  });

  await t.step("iso9", () => {
    const translation = translate(data.pangram, "iso9");
    assertEquals(translation, data.iso9);
  });
});
