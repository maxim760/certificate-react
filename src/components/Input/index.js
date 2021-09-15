/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import React from 'react'
import { useStyles } from './styles'

export const Input = React.forwardRef(
  ({ placeholder, label, error, ...props }, ref) => {
    const styles = useStyles()
    const { className, onBlur, ...inputProps } = props
    return (
      <label
        css={css`
          ${[styles.label]};
          ${error ? [styles.error] : ''};
        `}
      >
        <span css={styles.title}>{label}</span>
        <input
          css={css`
            ${[styles.input]};
            ${className}
          `}
          placeholder={placeholder || 'Введите...'}
          ref={ref}
          type="text"
          onBlur={onBlur}
          {...inputProps}
        />
        {!!error && <span css={styles.helperText}>{error}</span>}
      </label>
    )
  },
)
