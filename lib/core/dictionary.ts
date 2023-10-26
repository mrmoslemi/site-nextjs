import { Data } from "./data";
import { Builder } from "./types";

export type Language = "fa" | "en";
export type Phrase = Data & { [lang in Language]: string };

export type Dictionary = {
  phrases: { [key in string]: Phrase };
  builders: { [key in string]: Builder<Phrase> };
};
