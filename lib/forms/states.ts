import { State } from "@/lib/core/states";
import { Nullable } from "@/lib/core/types";
import { Data } from "@/lib/core/data";
import { Validation } from "./enums";

export type FieldState<D extends Data> = State & {
  value: Nullable<D>;
  validation: Validation;
  touched: boolean;
  focused: boolean;
};
