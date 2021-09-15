/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import React from 'react'
import { useStyles } from './styles'

export const Button = ({ children, className = '', ...props }) => {
  const styles = useStyles()
  return (
    <button css={styles.btn} className={className} {...props}>
      {children}
    </button>
  )
}
