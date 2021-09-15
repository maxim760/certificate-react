import React from 'react'
import { cl } from '../../utils'
import styles from './card.module.scss'

export const Card = ({ children, className, withShadow }) => {
  return (
    <div
      className={cl({
        [styles.card]: true,
        className: true,
        [styles.shadow]: withShadow,
      })}
    >
      {children}
    </div>
  )
}
