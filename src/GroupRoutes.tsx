import { h } from "yeap/web"
import { GroupRoutesContext } from "./context"
import { Route, RouteProps } from "./Route"

type Optional<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>

type GroupRoutesProps<T> = Optional<RouteProps<T>, "component">

export function GroupRoutes<T>(
  { path, component, ...props }: GroupRoutesProps<T>,
  children: any
) {
  return (
    <GroupRoutesContext.Provider value={{ parentPath: path }}>
      {component ? (
        <Route path="/" component={component} {...(props as any)}>
          {children}
        </Route>
      ) : (
        children
      )}
    </GroupRoutesContext.Provider>
  )
}
