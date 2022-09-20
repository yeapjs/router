import { LinkTo } from "../types/app"

export function normalize(str: string) {
  return "/" + str
    .replace(/^\/+|\/+$/g, "")
    .replace(/\/{2,}/g, "/")
}

export function testRoute(route: string, url: string) {
  const matcher = RegExp(`^${normalize(route).replace(/(:\w+)/g, "([\\w-]+)")}\$`)

  return matcher.test(normalize(url.split("?")[0]))
}

export function getParams(route: string, url: string) {
  const matcher = `^${normalize(route).replace(/(:(\w+))/g, "(?<$2>[\\w-]+)")}\$`

  const matches = normalize(url.split("?")[0]).match(matcher)?.groups ?? {}

  return matches
}

export function resolvePath(to: LinkTo | string, ids: Record<string, string>) {
  let href = ""

  if (typeof to === "string") href = to
  else {
    if (to.path) href = to.path
    else if (to.id) href = ids[to.id]

    if (to.params)
      for (const key of Object.keys(to.params))
        href = href!.replace(`:${key}`, to.params[key])
  }

  return normalize(href)
}