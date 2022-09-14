import { createContext, Reactor, ReadOnlyReactor } from "yeap/app";

interface RouterContextInteface {
  location: Reactor<string>
  alreadyCalled: Reactor<boolean>
  push(newLocation: string): void
  replace(newLocation: string): void
  back(): void
  forward(): void
}

interface RouteContextInteface {
  params: ReadOnlyReactor<Record<string, string>>
}

export const RouterContext = createContext<RouterContextInteface | null>(null)
export const RouteContext = createContext<RouteContextInteface | null>(null)