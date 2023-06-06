const UKRAINIAN_REGEXP = /[А-ЩЬЮЯҐЄІЇа-щьюяґєії]/;
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
export const translate = (text: string) => {
  const chars = text.split("");
  const translatedChars = chars.map((char) => {
    const isUkrainianLetter = UKRAINIAN_REGEXP.test(char);
    if (!isUkrainianLetter) return char;
    const lowerCaseChar = char.toLowerCase();
    const traslatedChar = ukrLatAlphabet[lowerCaseChar];
    if (char === lowerCaseChar) return traslatedChar;
    if (traslatedChar.length === 1) return traslatedChar.toUpperCase();
    else {
      const [first, second] = traslatedChar.split("");
      return first.toUpperCase() + second;
    }
  });
  return translatedChars.join("");
};