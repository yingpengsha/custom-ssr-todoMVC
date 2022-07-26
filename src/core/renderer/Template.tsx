const Template: React.FC<{children: React.ReactNode}> = (props) => {
  const { children } = props
  return <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>TodoMVC</title>
      <link rel="stylesheet" href="/node_modules/todomvc-common/base.css" />
      <link rel="stylesheet" href="/node_modules/todomvc-app-css/index.css" />
      <link rel="stylesheet" href="/static/css/index.css" />
    </head>
    <body>
      {children}
    </body>
    <script src="/static/scripts/EditModeToggle.js"></script>
  </html>
}

export default Template
