import { createContext, Reactor, ReadOnlyReactor } from "yeap/app";

export interface HistoryGesture {
  push(newLocation: string): void
  replace(newLocation: string): void
  back(): void
  forward(): void
}

interface RouterContextInteface extends HistoryGesture {
  location: Reactor<string>
  alreadyCalled: Reactor<boolean>
}

interface RouteContextInteface {
  params: ReadOnlyReactor<Record<string, string>>
}

interface GroupRoutesContextInteface {
  parentPath: string
}

export const GroupRoutesContext = createContext<GroupRoutesContextInteface>({ parentPath: "/" })
export const RouterContext = createContext<RouterContextInteface | null>(null)
export const RouteContext = createContext<RouteContextInteface | null>(null)