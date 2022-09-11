import { Reactor, useContext } from "yeap/app"
import { h } from "yeap/web"

import { RouterContext } from "./context"

interface LinkProps extends JSX.ReactivableHTMLAttributes<HTMLAnchorElement> {
  back?: boolean
  forward?: boolean
  replace?: boolean
  to?: string
  ref: Reactor<HTMLAnchorElement>
}

export function Link(
  { back, forward, replace = false, to = "/", ref, ...rest }: LinkProps,
  children: any
) {
  const history = useContext(RouterContext)!

  function handleClick(e: any) {
    if (rest["onClick:prevent"]) {
      if (typeof rest["onClick:prevent"] === "function")
        rest["onClick:prevent"](e)
      else rest["onClick:prevent"][0](rest["onClick:prevent"].slice(1))
    }
    if (back) history.back()
    else if (forward) history.forward()
    else history[replace ? "replace" : "push"](to)
  }

  return (
    <a
      {...rest}
      ref={ref}
      href={to}
      onClick:prevent={handleClick}
      data-active={history.location.compute((v) => v === to)}
    >
      {children}
    </a>
  )
}
