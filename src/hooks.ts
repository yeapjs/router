import { ReadOnlyReactor, useContext } from "yeap/app";
import { LinkTo } from "../types/app";
import { HistoryGesture, RouteContext, RouterContext } from "./context";
import { resolvePath } from "./helpers";

export function redirect(to: LinkTo | string) {
  const v = useContext(RouterContext)!

  if (v === null) throw new Error("useLocation is only ever to be used as the child of a <Router>. Please wrap your component in a <Router>.")

  v.push(resolvePath(to, v.ids))
}

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

export function useUrlSearchParams(): ReadOnlyReactor<Map<string, string>> {
  const v = useContext(RouterContext)
  if (v === null) throw new Error("useUrlSearchParams is only ever to be used as the child of a <Router>. Please wrap your component in a <Router>.")

  return v.location.compute<Map<string, string>>((location) => {
    const params = (location.split("?")[1] ?? "").split("&")
    const searchParams = new Map()

    for (const param of params) {
      if (param.length === 0) continue

      const [key, value] = param.split("=")
      searchParams.set(decodeURI(key), decodeURI(value ?? ""))
    }

    return searchParams
  })
}
