import { routes as descRoutes, mobileRoutes, ROUTES } from '../../utils'

export const useRoutes = ({ isMobile }) => {
  const redirect = isMobile ? ROUTES.PREVIEW : ROUTES.MAIN
  const routes = isMobile ? mobileRoutes : descRoutes
  return { routes, redirect }
}
