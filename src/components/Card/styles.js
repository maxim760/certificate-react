import { css, useTheme } from '@emotion/react'
import { toRgba } from '../../utils'

export const useStyles = (props) => {
  const { text = '#000', background = '#fff' } = useTheme() || {}
  return {
    card: css`
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      max-width: 400px;
      padding: 10px;
      background: ${background};
      border-radius: 10px;
      box-shadow: 2px 2px 5px ${toRgba(text, 0.3)};
      & > * + * {
        margin-top: 5px;
      }
    `,
    shadow: css`
      box-shadow: 4px 4px 10px ${toRgba(text, 0.2)},
        -4px -4px 10px ${toRgba(text, 0.2)}, -4px 4px 10px ${toRgba(text, 0.2)},
        4px -4px 10px ${toRgba(text, 0.2)};
    `,
  }
}
