import { Element } from "./elements";
import { State } from "./states";

export abstract class Controller<E extends Element, S extends State> {
  initialState?: S;
  element: E;
  state: S;
  constructor(element: E, state?: S) {
    this.element = element;
    if (state) {
      this.state = state;
    } else if (this.initialState) {
      this.state = this.initialState;
    } else {
      throw Error(
        `Neither initialState or state were given to create controller ${this.constructor.name}`
      );
    }
  }
  save() {}
}
