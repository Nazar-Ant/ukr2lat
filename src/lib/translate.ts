import * as alphabets from "./alphabets/index.ts";
import { AlphabetName } from "../types.ts";

export const translate = (text: string, alphabetName: AlphabetName) =>
  alphabets[alphabetName].translate(text);
