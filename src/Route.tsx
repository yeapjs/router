import { Component, ComponentProps, createComputed, useContext } from "yeap/app"
import { Dynamic } from "yeap/components"
import { h } from "yeap/web"

import { RouterContext } from "./context"

interface RouteProps<T> {
  path: string
  component: Component<T>
}

export function Route<T>({
  path,
  component,
  ...props
}: ComponentProps<T & RouteProps<T>>) {
  const history = useContext(RouterContext)

  if (history === null)
    throw new Error(
      "A <Route> is only ever to be used as the child of a Router element, never rendered directly. Please wrap your <Route> in a Router."
    )

  const show = createComputed(() => {
    return history.location() === path
  }, history.location)

  return <Dynamic component={component as any} {...props} when={show} />
}
