import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ROUTES } from '../../utils'
import { useRoutes } from './useRoutes'

export const AppRouter = ({ isMobile = false }) => {
  const { routes, redirect } = useRoutes({ isMobile })
  return (
    <Switch>
      {routes.map(({ component, path }) => (
        <Route key={path} component={component} path={path} exact />
      ))}
      <Redirect to={redirect} />
    </Switch>
  )
}
