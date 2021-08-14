import React from 'react'
import { cl } from '../../utils'
import styles from './button.module.scss'

export const Button = ({ children, className = '', ...props }) => {
  return (
    <button className={cl([className, styles.btn])} {...props}>
      {children}
    </button>
  )
}
