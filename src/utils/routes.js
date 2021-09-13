import { ChooseCertificate } from '../pages/ChooseCertificate'
import { ContactsForm } from '../pages/ContactsForm'
import { PreviewPage } from '../pages/Preview'
import { SuccessInfo } from '../pages/SuccessInfo'

export const ROUTES = {
  MAIN: '/',
  FORM: '/form',
  PAYMENT: '/payment',
  PREVIEW: '/preview',
}

export const routes = [
  { component: ChooseCertificate, path: ROUTES.MAIN },
  { component: ContactsForm, path: ROUTES.FORM },
  { component: SuccessInfo, path: ROUTES.PAYMENT },
]

export const mobileRoutes = [
  { component: PreviewPage, path: ROUTES.PREVIEW },
  ...routes,
]
