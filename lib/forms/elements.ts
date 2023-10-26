import { Data, Entity } from "@/lib/core/data";
import { Phrase } from "@/lib/core/dictionary";
import { ArraySet } from "@/lib/core/types";
import { Element } from "../core/elements";
import { Validator, FieldType, FieldWidget } from "./enums";

export type FieldElement<D extends Data> = Element & {
  name: string;
  label?: Phrase;
  validator: ArraySet<Validator<D>>;
  type: FieldType;
  widget: FieldWidget;
};

export type FormElement<D extends { [key in string]: Data }> =
  FieldElement<D> & {
    fields: { [key in keyof D]: FieldElement<any> };
  };

export type ListFieldElement<D extends Data> = FieldElement<D[]> & {
  child: FieldElement<D>;
};

export type VarcharField = FieldElement<string> & {
  placeholder: Phrase;
};

export type EntityFormElement<E extends Entity> = FieldElement<E>;
