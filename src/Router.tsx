import { createReactor } from "yeap/app"
import { RouterContext } from "./context"

export function Router(_: any, children: any) {
  const location = createReactor(window.location.pathname)

  return (
    <RouterContext.Provider
      value={{
        location,
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
