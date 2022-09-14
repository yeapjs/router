import { h } from "yeap/web"
import { GroupRoutesContext } from "./context"

interface GroupRoutesProps {
  path: string
}

export function GroupRoutes({ path }: GroupRoutesProps, children: any) {
  return (
    <GroupRoutesContext.Provider value={{ parentPath: path }}>
      {children}
    </GroupRoutesContext.Provider>
  )
}
