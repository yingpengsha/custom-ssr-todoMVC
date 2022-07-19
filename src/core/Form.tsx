import h from 'vhtml'
import EventRegistry, { ServerEvent } from './EventRegistry'

const Form = (props: { children: any[], method: string, submit: ServerEvent, class?: string }) => {
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
