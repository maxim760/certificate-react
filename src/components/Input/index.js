import React from 'react'
import { cl } from '../../utils'

import styles from './input.module.scss'
export const Input = React.forwardRef(
  ({ placeholder, label, error, ...props }, ref) => {
    return (
      <label className={cl({ [styles.label]: true, [styles.error]: error })}>
        <span className={styles.title}>{label}</span>
        <input
          className={styles.input}
          placeholder={placeholder || 'Введите...'}
          ref={ref}
          type="text"
          {...props}
        />
        {!!error && <span className={styles.helperText}>{error}</span>}
      </label>
    )
  },
)
