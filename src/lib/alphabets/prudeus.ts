import { Alphabet, Translate } from "../../types.ts";

const alphabet: Alphabet = {
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
export const translate: Translate = (text) => {
  const chars = text.split("");
  const translatedChars = chars.map((char) => {
    const lowerCaseChar = char.toLowerCase();
    const traslatedChar = alphabet[lowerCaseChar];
    if (traslatedChar === undefined) return char;
    if (char === lowerCaseChar) return traslatedChar;
    if (traslatedChar.length === 1) return traslatedChar.toUpperCase();
    else {
      const { 0: first, 1: second } = traslatedChar.split("");
      return first.toUpperCase() + second;
    }
  });
  return translatedChars.join("");
};
