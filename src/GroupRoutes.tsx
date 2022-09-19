import { h } from "yeap/web"

import { GroupRoutesContext } from "./context"
import { Route } from "./Route"
import { GroupRoutesProps } from "../types/app"

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
