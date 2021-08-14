import React from 'react'
import { cl } from '../../utils/toClassName'
import styles from './loader.module.scss'

export const Loader = ({ size = '', className = '' }) => {
  return (
    <div className={cl([styles.spinner, styles[size], className])}>
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
}
