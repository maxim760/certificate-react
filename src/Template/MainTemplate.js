import React, { useMemo } from 'react'
import { DEFAULT_IMG, WidgetData } from '../utils'
import styles from './main.module.scss'

const getImgStyles = (blur) => ({
  filter: `blur(${blur}px)`,
  // height: `calc(100% + ${blur * 2}px)`,
  // top: `-${blur}px`,
})

const getWrapperStyles = (blur) => ({
  // marginLeft: `-${blur}px`,
  // width: `calc(100% + ${blur * 2}px)`,
})

export const MainTemplate = ({ children }) => {
  const photo = useMemo(() => WidgetData.getPhotoUrl(), [])
  const blurSize = useMemo(() => {
    const blur = WidgetData.getBlur()
    return photo ? blur || 0 : blur || 3
  }, [])
  console.log({ photo, blurSize })
  return (
    <div className={styles.wrapper} style={getWrapperStyles(blurSize)}>
      <div className={styles.content}>{children}</div>
      <img
        alt="Фоновая картинка"
        src={photo || DEFAULT_IMG}
        className={styles.img}
        style={getImgStyles(blurSize)}
      />
    </div>
  )
}
