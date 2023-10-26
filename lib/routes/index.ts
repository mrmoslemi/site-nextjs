import { Element } from "@/lib/core/elements";
export type Route = Element & {
  route: string;
  element?: Element;
  children?: Route[];
  exact?: boolean;
};

export type App = Element & {
  routes: Route[];
};
