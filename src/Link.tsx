import { Reactor, useContext } from "yeap/app"
import { h } from "yeap/web"

import { RouterContext } from "./context"

interface LinkProps extends JSX.ReactivableHTMLAttributes<HTMLAnchorElement> {
  back?: boolean
  forward?: boolean
  replace?: boolean
  native?: boolean
  to?: string
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

  function handleClick(e: MouseEvent & { currentTarget: HTMLAnchorElement }) {
    if (native) return

    e.preventDefault()

    if (rest.onClick) {
      if (typeof rest.onClick === "function") rest.onClick(e)
      else rest.onClick[0](rest.onClick.slice(1))
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
      onClick={handleClick}
      data-active={history.location.compute((v) => v === to)}
    >
      {children}
    </a>
  )
}
