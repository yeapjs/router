import { createContext, Reactor } from "yeap/app";

interface RouterContextInteface {
  location: Reactor<string>
  navigateTo(newLocation: string): void
}

export const RouterContext = createContext<RouterContextInteface | null>(null)