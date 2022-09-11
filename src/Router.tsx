import { createReactor } from "yeap/app"
import { RouterContext } from "./context"

export function Router(_: any, children: any) {
  const location = createReactor(window.location.pathname)

  return (
    <RouterContext.Provider
      value={{
        location,
        navigateTo(newLocation) {
          location(newLocation)
        },
      }}
    >
      {children}
    </RouterContext.Provider>
  )
}
