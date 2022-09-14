import { ReadOnlyReactor, useContext } from "yeap/app";
import { HistoryGesture, RouteContext, RouterContext } from "./context";

export function useUrlParams() {
  const v = useContext(RouteContext)
  if (v === null) throw new Error("useUrlParams is only ever to be used as the child of a <Route>. Please wrap your component in a <Route>.")
  return v.params
}

export function useHistory(): HistoryGesture {
  const v = useContext(RouterContext)
  if (v === null) throw new Error("useHistory is only ever to be used as the child of a <Router>. Please wrap your component in a <Router>.")
  return {
    replace: v.replace,
    push: v.push,
    back: v.back,
    forward: v.forward,
  }
}

export function useLocation(): ReadOnlyReactor<string> {
  const v = useContext(RouterContext)
  if (v === null) throw new Error("useLocation is only ever to be used as the child of a <Router>. Please wrap your component in a <Router>.")
  return v.location
}
