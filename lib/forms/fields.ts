import { ArraySet, Builder, toArray } from "@/lib/core/types";
import { Phrase } from "@/lib/core/dictionary";
import { Data } from "@/lib/core/data";

import { Validators } from "./validators";
import {
  ListFieldElement,
  VarcharField,
  FieldElement,
  FormElement,
} from "./elements";
import { FieldWidget, FieldType, Validator } from "./enums";
import { dict } from "./dictionary";

export const Fields = {
  group: <D extends { [key in string]: Data }>(args: {
    label: Phrase;
    name: string;
    validator?: Validator<D>[];
    widget?: FieldWidget;
    fields: { [key in string]: FieldElement<any> };
  }) =>
    ({
      name: args.name,
      label: args.label,
      validator: args.validator || [],

      type: FieldType.GROUP,
      widget: args.widget || FieldWidget.DEFAULT,
    } as FormElement<D>),
  list: <D extends Data[]>(args: {
    label: Phrase;
    name: string;
    validators?: Validator<D[]>[];
    widget?: FieldWidget;
    child: FieldElement<D>;
  }) =>
    ({
      ...args,
      type: FieldType.LIST,
      widget: args.widget || FieldWidget.DEFAULT,
      validator: args.validators || [],
    } as ListFieldElement<D>),
  varchar: (args: {
    name: string;
    label?: Phrase;
    placholder: Phrase;
    widget?: FieldWidget;
    validator?: ArraySet<Validator<string>>;
  }) =>
    ({
      name: args.name,
      label: args.label,
      placeholder: args.placholder,
      validator: args.validator || undefined,
      type: FieldType.VARCHAR,
      widget: args.widget || FieldWidget.TEXT,
    } as VarcharField),
  email: (args: {
    name?: string;
    label?: Phrase;
    placholder?: Phrase;
    validator?: ArraySet<Validator<string>>;
  }) =>
    ({
      name: args.name || "email",
      label: args.label || dict.phrases.emailLabel,
      placeholder: args.placholder || dict.phrases.emailPlaceholder,
      validator: [Validators.email, ...toArray(args.validator)],
      type: FieldType.VARCHAR,
      widget: FieldWidget.EMAIL,
    } as VarcharField),
};
