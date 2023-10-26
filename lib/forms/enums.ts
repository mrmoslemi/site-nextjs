import { Phrase } from "@/lib/core/dictionary";
import { ArraySet, Nullable } from "@/lib/core/types";
import { Data } from "@/lib/core/data";
export type Validation = {
  valid: boolean;
  message: ArraySet<Phrase>;
};
export type Validator<D extends Data> = (value: Nullable<D>) => Validation;

export enum FieldType {
  LIST,
  GROUP,
  VARCHAR,
  TEXT,

  DATETIME,
  TIME,
  SELECT,
  MULTI_SELECT,
  BOOLEAN,
  RATE,
  FILE,
  MULTI_FILE,
}

export enum FieldWidget {
  DEFAULT,

  NUMBER,
  TEXT,
  EMAIL,
  PASSWORD,
  PHONE_NUMBER,

  RICH,
  RAW,

  DATETIME,
  DATE,
  TIME,

  DROPDOWN,
  BULLET,
  CHECKLIST,

  STAR,
  SLIDER,

  CHECKBOX,
  RADIO,
  SWITCH,

  FILE,
  IMAGE,
}

export const Widgets = {
  [FieldType.LIST]: [FieldWidget.DEFAULT],
  [FieldType.GROUP]: [FieldWidget.DEFAULT],
  [FieldType.VARCHAR]: [
    FieldWidget.NUMBER,
    FieldWidget.TEXT,
    FieldWidget.EMAIL,
    FieldWidget.PASSWORD,
    FieldWidget.PHONE_NUMBER,
  ],
  [FieldType.TEXT]: [FieldWidget.RAW, FieldWidget.RICH],
  [FieldType.DATETIME]: [FieldWidget.DATETIME, FieldWidget.DATE],
  [FieldType.TIME]: [FieldWidget.DEFAULT],
  [FieldType.SELECT]: [FieldWidget.DROPDOWN, FieldWidget.BULLET],
  [FieldType.MULTI_SELECT]: [FieldWidget.DROPDOWN, FieldWidget.CHECKLIST],
  [FieldType.BOOLEAN]: [
    FieldWidget.CHECKBOX,
    FieldWidget.RADIO,
    FieldWidget.SWITCH,
  ],
  [FieldType.RATE]: [FieldWidget.SLIDER, FieldWidget.STAR],
  [FieldType.FILE]: [FieldWidget.FILE, FieldWidget.IMAGE],
  [FieldType.MULTI_FILE]: [FieldWidget.FILE, FieldWidget.IMAGE],
};
