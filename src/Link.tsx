import { Reactor, useContext } from "yeap/app"
import { h } from "yeap/web"

import { RouterContext } from "./context"

interface LinkTo {
  id?: string
  path?: string
  params?: Record<string, string>
}

interface LinkProps extends JSX.ReactivableHTMLAttributes<HTMLAnchorElement> {
  back?: boolean
  forward?: boolean
  replace?: boolean
  native?: boolean
  to?: string | LinkTo
  ref: Reactor<HTMLAnchorElement>
}

export function Link(
  {
    back,
    forward,
    native = false,
    replace = false,
    to = "/",
    ref,
    ...rest
  }: LinkProps,
  children: any
) {
  const history = useContext(RouterContext)!

  let href = ""
  if (typeof to === "string") href = to
  else {
    if (to.path) href = to.path
    else if (to.id) href = history.ids[to.id]

    if (to.params)
      for (const key of Object.keys(to.params))
        href = href.replace(`:${key}`, to.params[key])
  }

  function handleClick(e: MouseEvent & { currentTarget: HTMLAnchorElement }) {
    if (native) return

    e.preventDefault()

    if (rest.onClick) {
      if (typeof rest.onClick === "function") rest.onClick(e)
      else rest.onClick[0](rest.onClick.slice(1))
    }
    if (back) history.back()
    else if (forward) history.forward()
    else history[replace ? "replace" : "push"](href)
  }

  return (
    <a
      {...rest}
      ref={ref}
      href={href}
      onClick={handleClick}
      data-active={history.location.compute((v) => v === href)}
    >
      {children}
    </a>
  )
}
