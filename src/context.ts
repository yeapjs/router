import { createContext, Reactor, ReadOnlyReactor } from "yeap/app";
import { HistoryGesture } from "../types/app";

interface RouterContextInteface extends HistoryGesture {
  location: Reactor<string>
  alreadyCalled: Reactor<boolean>
  ids: Record<string, string>
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