import { createPersistentCallback, useContext } from "yeap/app"
import { h } from "yeap/web"

import { RouterContext } from "./context"
import { resolvePath } from "./helpers"
import { LinkProps } from "../types/app"

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

  const href = resolvePath(to, history.ids)

  const handleClick = createPersistentCallback(
    (e: MouseEvent & { currentTarget: HTMLAnchorElement }) => {
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
  )

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
