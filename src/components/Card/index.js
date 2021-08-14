import React from 'react'
import { cl } from '../../utils'
import styles from './card.module.scss'

export const Card = ({ children, className }) => {
  return <div className={cl([styles.card, className])}>{children}</div>
}
