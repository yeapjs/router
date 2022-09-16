import { Component, ComponentProps } from "yeap/app";

type Optional<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>
interface LinkTo {
  id?: string
  path?: string
  params?: Record<string, string>
}

export interface LinkProps extends JSX.ReactivableHTMLAttributes<HTMLAnchorElement> {
  back?: boolean
  forward?: boolean
  replace?: boolean
  native?: boolean
  to?: string | LinkTo
}
export const Link: Component<LinkProps>

export type RouteProps<T> = ComponentProps<
  T & {
    once?: boolean
    id?: string
    path: string
    component: Component<T>
  }
>
export function Route<T>(props: RouteProps<T>, children: Array<JSX.Element>): Array<JSX.Element>

export type GroupRoutesProps<T> = Optional<RouteProps<T>, "component">
export function GroupRoutes<T>(props: GroupRoutesProps<T>, children: Array<JSX.Element>): Array<JSX.Element>

export const Router: Component<{}>

export interface MemoryRouterProps {
  initialLocation?: string
}
export const MemoryRouter: Component<MemoryRouterProps>