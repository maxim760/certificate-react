import React from 'react'
import { cl } from '../../utils'
import { Card } from '../Card'
import styles from './certificate.module.scss'

export const CertificateCard = ({ certificate, className }) => {
  const { Name, Description, Price, Summa, Discount } = certificate
  return (
    <Card className={cl([className, styles.card])}>
      <div>
        Название - <b>{Name}</b>
      </div>
      <div>
        Описание - <b>{Description || 'Отсутствует'}</b>
      </div>
      <div>
        Цена - <b>{Price} р.</b>
      </div>
      <div>
        Скидка - <b>{Discount} р.</b>
      </div>
      <div>
        Итого к оплате -{' '}
        <b>
          <u>{Summa} р.</u>
        </b>
      </div>
    </Card>
  )
}
