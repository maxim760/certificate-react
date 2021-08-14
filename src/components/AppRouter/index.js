import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ROUTES, routes } from '../../utils'

export const AppRouter = () => {
  return (
    <Switch>
      {routes.map(({ component, path }) => (
        <Route key={path} component={component} path={path} exact />
      ))}
      <Redirect to={ROUTES.MAIN} />
    </Switch>
  )
}
