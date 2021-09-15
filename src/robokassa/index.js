import { MD5 } from 'crypto-js'

export const fiscalization = (authData, id, summa) => {
  const {
    ROBOSHOPNAME,
    SHOPDESCRIPTION,
    ROBOISTEST,
    ROBOPASSWORD1,
    ROBOTESTPASSWORD1,
  } = authData

  const isTest = !!Number(ROBOISTEST)
  const password1 = isTest ? ROBOTESTPASSWORD1 : ROBOPASSWORD1
  const hashString = `${ROBOSHOPNAME}:${+summa}:${id}:${password1}`
  const hash = MD5(hashString).toString()

  const href =
    `https://auth.robokassa.ru/Merchant/Index.aspx?` +
    `MerchantLogin=${ROBOSHOPNAME}&OutSum=${+summa}&InvoiceID=${id}` +
    `&Description=${SHOPDESCRIPTION}&SignatureValue=${hash}&IsTest=${+isTest}`

  const link = document.createElement('a')

  link.href = href
  link.target = '_blank'

  link.click()
}
