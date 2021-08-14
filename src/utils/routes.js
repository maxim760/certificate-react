import { ChooseCertificate } from '../pages/ChooseCertificate'
import { ContactsForm } from '../pages/ContactsForm'
import { SuccessInfo } from '../pages/SuccessInfo'

export const ROUTES = {
  MAIN: '/',
  FORM: '/form',
  PAYMENT: '/payment',
}

export const routes = [
  { component: ChooseCertificate, path: ROUTES.MAIN },
  { component: ContactsForm, path: ROUTES.FORM },
  { component: SuccessInfo, path: ROUTES.PAYMENT },
]
