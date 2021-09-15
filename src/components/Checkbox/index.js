/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import React from 'react'
import { useStyles } from './styles'

export const Checkbox = React.forwardRef(({ label, value, ...props }, ref) => {
  const styles = useStyles()
  return (
    <label css={styles.checkbox}>
      <span css={styles.input}>
        <input type="checkbox" {...props} ref={ref} />
        <span css={styles.control}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              d="M1.73 12.91l6.37 6.37L22.79 4.59"
            />
          </svg>
        </span>
      </span>
      <span css={styles.radio}>{label}</span>
    </label>
  )
})
