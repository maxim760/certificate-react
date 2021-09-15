import React, { useMemo } from 'react'
import { DEFAULT_IMG } from '../utils'
import { parseQueryParams } from '../utils/parseQueryParams'
import styles from './main.module.scss'

const getImgStyles = (blur) => ({
  filter: `blur(${blur}px)`,
  height: `calc(100% + ${blur * 2}px)`,
  top: `-${blur}px`,
})

const getWrapperStyles = (blur) => ({
  marginLeft: `-${blur}px`,
  width: `calc(100% + ${blur * 2}px)`,
})

export const MainTemplate = ({ children }) => {
  const query = parseQueryParams(window.location.href)
  const photo = useMemo(() => query.url || DEFAULT_IMG, [])
  const blurSize = useMemo(
    () => (query.url ? query.blur || 0 : query.blur || 3),
    [],
  )
  return (
    <div className={styles.wrapper} style={getWrapperStyles(blurSize)}>
      <div className={styles.content}>{children}</div>
      <img
        alt="Фоновая картинка"
        src={photo}
        className={styles.img}
        style={getImgStyles(blurSize)}
      />
    </div>
  )
}
