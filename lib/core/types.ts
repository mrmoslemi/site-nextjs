export type ArraySet<Class> = Class | Class[] | undefined;
export type Builder<Class> = (...args: any[]) => Class;
export type Resolver<Class> = Class | Builder<Class> | Promise<Class>;
export type Nullable<Class> = Class | null;
export function toArray<Class>(arraySet: ArraySet<Class>): Class[] {
  if (arraySet === undefined) {
    return [];
  } else if (Array.isArray(arraySet)) {
    return arraySet as Class[];
  } else {
    return [arraySet as Class];
  }
}
