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