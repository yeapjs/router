import {
  Component,
  ComponentProps,
  createComputed,
  createReactor,
  useContext,
} from "yeap/app"
import { Dynamic } from "yeap/components"
import { h } from "yeap/web"

import { RouteContext, RouterContext } from "./context"
import { getParams, testRoute } from "./helpers"

interface RouteProps<T> {
  once?: boolean
  path: string
  component: Component<T>
}

export function Route<T>({
  path,
  component,
  once,
  ...props
}: ComponentProps<T & RouteProps<T>>) {
  const history = useContext(RouterContext)
  const params = createReactor<Record<string, string>>({})

  if (history === null)
    throw new Error(
      "A <Route> is only ever to be used as the child of a Router element, never rendered directly. Please wrap your <Route> in a Router."
    )

  const show = createComputed(() => {
    if (once && history.alreadyCalled(true)) return false
    if (testRoute(path, history.location())) {
      params(getParams(path, history.location()))

      return true
    }
  }, history.location)

  return (
    <RouteContext.Provider value={{ params: params.reader() }}>
      <Dynamic component={component as any} {...props} when={show} />
    </RouteContext.Provider>
  )
}
