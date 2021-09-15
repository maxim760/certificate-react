import React from 'react'
import { cl } from '../../utils'
/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import { useStyles } from './styles'

export const Card = ({ children, className, withShadow }) => {
  const styles = useStyles()
  return (
    <div
      className={className}
      css={css`
        ${[styles.card]};
        ${withShadow ? [styles.shadow] : ''}
      `}
    >
      {children}
    </div>
  )
}
