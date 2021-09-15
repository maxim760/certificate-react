import { css, useTheme } from '@emotion/react'
export const useStyles = (props) => {
  const theme = useTheme()
  const control = css`
    display: inline-grid;
    width: 1em;
    height: 1em;
    border-radius: 0.25em;
    border: 0.1em solid currentColor;
    svg {
      transition: transform 0.1s ease-in 25ms;
      transform: scale(0);
      transform-origin: bottom left;
    }
  `
  return {
    checkbox: css`
      display: grid;
      grid-template-columns: min-content auto;
      grid-gap: 0.3em;
      font-size: 1rem;
      color: ${theme.primary};
      &--disabled {
        color: ${theme.disabled};
      }
    `,
    control,
    input: css`
      display: grid;
      grid-template-areas: 'checkbox';
      margin-top: 3px;
      & > * {
        grid-area: checkbox;
      }

      & input {
        opacity: 0;
        width: 1em;
        height: 1em;

        &:focus + * {
          box-shadow: 0 0 0 0.05em #fff, 0 0 0.15em 0.1em currentColor;
        }

        &:checked + * svg {
          transform: scale(1);
        }

        &:disabled + * {
          color: var(--disabled);
        }
      }
    `,
  }
}
