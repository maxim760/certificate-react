import React from 'react'
import { cl } from '../../utils'
/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import { useStyles } from './styles'

export const Card = ({ children, className, withShadow }) => {
  const styles = useStyles()
  return (
    <div
      css={css`
        ${[styles.card]};
        ${className};
        ${withShadow ? [styles.shadow] : ''}
      `}
    >
      {children}
    </div>
  )
}
