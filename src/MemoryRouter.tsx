import { createReactor } from "yeap/app"
import { RouterContext } from "./context"

interface MemoryRouterProps {
  initialLocation?: string
}

export function MemoryRouter(
  { initialLocation = "/" }: MemoryRouterProps,
  children: any
) {
  const location = createReactor(initialLocation)
  let history = [initialLocation]
  let i = 0

  const called = createReactor(false)

  location.subscribe(() => {
    called(false)
  })

  return (
    <RouterContext.Provider
      value={{
        location,
        alreadyCalled: called,
        push(newLocation) {
          location(newLocation)
          history = [...history.slice(0, i + 1), newLocation]
          i++
        },
        replace(newLocation) {
          location(newLocation)
          history[i] = newLocation
        },
        back() {
          if (i <= 0) return
          location(history[--i])
        },
        forward() {
          if (i + 1 >= history.length) return
          location(history[++i])
        },
      }}
    >
      {children}
    </RouterContext.Provider>
  )
}
