import {
  Component,
  ComponentProps,
  createComputed,
  createPersistor,
  createReactor,
  useContext,
} from "yeap/app"
import { Dynamic } from "yeap/components"
import { h } from "yeap/web"

import { GroupRoutesContext, RouteContext, RouterContext } from "./context"
import { getParams, testRoute } from "./helpers"

interface RouteProps<T> {
  once?: boolean
  id?: string
  path: string
  component: Component<T>
}

export function Route<T>({
  path,
  component,
  once,
  id,
  ...props
}: ComponentProps<T & RouteProps<T>>) {
  const { parentPath } = useContext(GroupRoutesContext)
  const context = useContext(RouterContext)
  const params = createReactor<Record<string, string>>({})

  if (context === null)
    throw new Error(
      "A <Route> is only ever to be used as the child of a Router element, never rendered directly. Please wrap your <Route> in a Router."
    )

  // use to be called once only (like onFirstMount)
  createPersistor(() => {
    if (id) context.ids[id] = parentPath + path
  })

  const show = createComputed(() => {
    if (once && context.alreadyCalled(true)) return false
    if (testRoute(parentPath + path, context.location())) {
      params(getParams(parentPath + path, context.location()))

      return true
    }
  }, context.location)

  return (
    <RouteContext.Provider value={{ params: params.reader() }}>
      <Dynamic component={component as any} {...props} when={show} />
    </RouteContext.Provider>
  )
}
