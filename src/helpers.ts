export function normalize(str: string) {
  return "/" + str
    .replace(/^\/+|\/+$/g, "")
    .replace(/\/{2,}/g, "/")
}

export function testRoute(route: string, url: string) {
  const matcher = RegExp(`^${normalize(route).replace(/(:\w+)/g, "([a-zA-Z0-9_-]+)")}\$`)

  return matcher.test(normalize(url))
}

export function getParams(route: string, url: string) {
  const matcher = `^${normalize(route).replace(/(:(\w+))/g, "(?<$2>[a-zA-Z0-9_-]+)")}\$`

  const matches = normalize(url).match(matcher)?.groups ?? {}

  return matches
}