import { css, useTheme } from '@emotion/react'

const paddingX = '12px'
const paddingY = '8px'
const errorColor = 'rgb(206, 15, 15)'

export const useStyles = (props) => {
  const theme = useTheme()
  const label = css`
    display: flex;
    width: 100%;
    flex-direction: column;
    // font-weight: 600;
    &:focus-within {
      color: ${theme.primary};
    }
    & > * + * {
      margin-top: 5px;
    }
    input {
      color: initial;
    }
  `
  const error = css`
    color: ${errorColor} !important;
    input {
      border-color: ${errorColor} !important;
    }
  `
  return {
    label,
    error,
    input: css`
      color: initial !important;
      outline: none !important;
      padding: ${paddingY} ${paddingX} !important;
      border-radius: 6px !important;
      border: 1px solid grey;
      &:focus-within {
        border-color: ${theme.primary};
        border-width: 2px;
      }
      &::placeholder {
        color: rgba(black, 0.7) !important;
        font-weight: 400 !important;
      }
    `,
    title: css`
      text-align: left;
      padding-left: ${paddingX};
      .error & {
        color: ${errorColor};
      }
    `,
    helperText: css`
      padding-left: ${paddingX};
      text-align: left;
      line-height: 1;
      font-weight: 600;
      color: ${errorColor};
    `,
  }
}
