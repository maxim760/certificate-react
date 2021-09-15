import { css, useTheme } from '@emotion/react'

export const useStyles = (props) => {
  const theme = useTheme()
  console.log(theme)
  return {
    btn: css`
      background-color: ${theme.background};
      border-radius: 10px;
      min-width: 150px;
      padding: 10px 20px;
      border: 2px solid ${theme.primary};
      color: ${theme.primary};
      filter: brightness(0.92);
      transition: all 0.2s ease-in;
      font-weight: 600;
      transition-property: box-shadow, color, background-color, transform;
      &:not(:disabled):hover {
        color: ${theme.background};
        background-color: ${theme.primary};
      }
      &:not(:disabled):active {
        box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.4);
      }
      &:disabled {
        background-color: ${theme.disabled};
        cursor: not-allowed;
      }
      @media only screen and (max-width: 480px) {
        min-width: 100px;
        padding: 5px 10px;
        border-radius: 8px;
        font-size: 0.8em;
      }
    `,
  }
}
