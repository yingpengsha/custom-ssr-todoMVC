import { createContext, useContext } from 'react'

export const RouteDataContext = createContext<any>(null)

export const useLoaderData = <Loader extends (...args: any) => any>(): Awaited<ReturnType<Loader>> => {
  const context = useContext(RouteDataContext)
  if (typeof window !== 'undefined') {
    // @ts-ignore
    return window.__page_data
  }
  // @ts-ignore
  return context
}
