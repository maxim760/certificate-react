import React, { useState } from 'react'
import ReactDadataBox from 'react-dadata-box'
import { Input } from '../../components/Input'
import styles from './form.module.scss'

const token = process.env.REACT_APP_API_ADDRESS_KEY

const customStyles = {
  'react-dadata__suggestions': {
    maxHeight: 120,
    overflowY: 'auto',
  },
}

const SuggestAddress = ({ query, onChange, error, onBlur }) => {
  return (
    <ReactDadataBox
      showNote={false}
      token={token}
      customStyles={customStyles}
      query={query}
      debounce={200}
      count={10}
      allowClear={true}
      onChange={onChange}
      autocomplete={true}
      className={styles.suggestInput}
      placeholder="Введите адрес"
      customInput={(props) => (
        <Input error={error} label="Адрес" {...props} onBlur={onBlur} />
      )}
      type="address"
    />
  )
}

export default SuggestAddress
