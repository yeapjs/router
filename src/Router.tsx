import { createReactor } from "yeap/app"
import { h } from "yeap/web"

import { RouterContext } from "./context"

export function Router(_: any, children: any) {
  const location = createReactor(window.location.pathname)
  const called = createReactor(false)

  location.subscribe(() => {
    called(false)
  })

  return (
    <RouterContext.Provider
      value={{
        location,
        alreadyCalled: called,
        ids: {},
        push(newLocation) {
          location(newLocation)
          window.history.pushState({}, "", newLocation)
        },
        replace(newLocation) {
          location(newLocation)
          window.history.replaceState({}, "", newLocation)
        },
        back() {
          window.history.back()
          location(window.location.pathname)
        },
        forward() {
          window.history.forward()
          location(window.location.pathname)
        },
      }}
    >
      {children}
    </RouterContext.Provider>
  )
}
