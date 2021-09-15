import React from 'react'
import { useStyles } from './styles'
/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react'
export const Loader = ({ size = '', className = '', center = false }) => {
  const styles = useStyles()
  const Component = () => (
    <div className={className} css={[styles.spinner, styles[size]]}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
  if (center) {
    return (
      <div css={styles.wrapper}>
        <Component />
      </div>
    )
  }
  return <Component />
}
