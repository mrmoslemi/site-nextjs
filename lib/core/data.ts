import { Nullable, Resolver } from "./types";

/**
 * Base Data types
 */

export type DateTime = string; // TODO make a validated type for DateTime
export type Location = { lat: number; long: number };

export type PrimitiveData = string | number | boolean | DateTime | Location;
export type Data = PrimitiveData | Data[] | { [k in string]: Data };

export type Request = { url: string; data: Data; method: string };

export type Entity = Data & { id: Nullable<string | number> };
export type Hyperlink<D extends Data> = Data & { resolve: Resolver<D> };
/**
 * Related<E extends Data>
 * An instance for a link to a Data, or a Hyperlink that resolves into a Data.
 */
export type Related<D extends Data> = Hyperlink<D> | D;

/**
 * Related<E extends Data>
 * A reference for the root of a Tree of instances
 */
export type TreeNode<D extends Data> = {
  data: D;
  children?: TreeNode<D>[];
};
