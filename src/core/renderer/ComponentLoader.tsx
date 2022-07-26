import { ContextType } from 'core'
import { ServerEvent } from 'core/EventRegistry'
import { useCallback, useEffect, useRef, useState } from 'react'

export interface ModuleType {
  default: React.FC
  actions: Record<string, ServerEvent>
  loader: (ctx: ContextType) => unknown
}

function useForceRerender () {
  const [, setState] = useState({})
  const forceRerender = useCallback(() => {
    setState({})
  }, [])
  return forceRerender
}

function LoadingComponent () {
  return <span>Loading</span>
}

function LoadFailComponent () {
  return <span>Load Fail</span>
}

export default function ReactComponentLoader (importFunc: () => Promise<ModuleType>) {
  const HandledComponent: React.FC = (props) => {
    const RenderComponent = useRef<React.FC>(LoadingComponent)
    const forceRerender = useForceRerender()

    useEffect(() => {
      importFunc().then(module => {
        RenderComponent.current = module.default
      }).catch(() => {
        RenderComponent.current = LoadFailComponent
      }).finally(() => {
        forceRerender()
      })
    }, [])

    return <RenderComponent.current {...props} />
  }
  return HandledComponent
}
