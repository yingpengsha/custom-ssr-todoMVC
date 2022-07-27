import React, { ReactNode } from 'react'
import EventRegistry, { ServerEvent } from './EventRegistry'

const Form: React.FC<{ children: ReactNode, method: string, submit: ServerEvent, className?: string}> = (props) => {
  const { submit, children, method } = props
  let action = '#'
  if (submit && method) {
    action = EventRegistry.register({ method, service: submit })
  }
  return <form action={action} method={method}>
    {children}
  </form>
}

export default Form
