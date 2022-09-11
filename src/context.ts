import { createContext, Reactor } from "yeap/app";

interface RouterContextInteface {
  location: Reactor<string>
  push(newLocation: string): void
  replace(newLocation: string): void
  back(): void
  forward(): void
}

export const RouterContext = createContext<RouterContextInteface | null>(null)