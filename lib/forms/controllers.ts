import { Data } from "@/lib/core/data";
import { Nullable, ArraySet, toArray } from "@/lib/core/types";
import { Controller } from "@/lib/core/controllers";
import { Subscribable } from "@/lib/core/subscription";
import { FieldElement } from "./elements";
import { FieldState } from "./states";
import { Validation, Validator } from "./enums";
export class FieldController<
  D extends Data,
  E extends FieldElement<D>,
  S extends FieldState<D>
> extends Controller<E, S> {
  constructor(element: E, initialValue: Nullable<D> = null) {
    super(element, {
      value: initialValue,
      validation: FieldController.getValidation(element, initialValue),
      touched: false,
      focused: false,
    } as S);
  }

  private _dataChange: Subscribable<Nullable<D>> = new Subscribable();
  public get dataChange() {
    return this._dataChange;
  }

  //setters
  public set value(data: Nullable<D>) {
    this.state.value = data;
    this.state.validation = FieldController.getValidation(this.element, data);
    this._dataChange.notify(data);
    this.save();
  }

  public set field(element: E) {
    this.element = element;
    this.state.validation = FieldController.getValidation(
      this.element,
      this.state.value
    );
    this.save();
  }

  static getValidation<D extends Data>(
    field: FieldElement<D>,
    value: Nullable<D>
  ): Validation {
    let validator: ArraySet<Validator<D>> = field.validator;
    let validators = toArray(validator);
    let validation: Validation = { valid: true, message: [] };
    validators.forEach((validator: Validator<D>) => {
      let v = validator(value);
      validation.valid = validation.valid && v.valid;
      validation.message = [
        ...toArray(validation.message),
        ...toArray(v.message),
      ];
    });

    return validation;
  }
}
