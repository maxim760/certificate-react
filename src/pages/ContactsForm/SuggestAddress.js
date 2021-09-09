import React, { useState } from 'react'
import ReactDadataBox from 'react-dadata-box'
import { Input } from '../../components/Input'
import styles from './form.module.scss'

const token = process.env.REACT_APP_API_ADDRESS_KEY

const SuggestAddress = ({ query, onChange, error }) => {
  return (
    <ReactDadataBox
      showNote={false}
      token={token}
      query={query}
      debounce={300}
      allowClear={true}
      onChange={onChange}
      autocomplete={true}
      count={6}
      className={styles.suggestInput}
      placeholder="Введите адрес"
      customInput={(props) => <Input error={error} label="Адрес" {...props} />}
      type="address"
    />
  )
}

export default SuggestAddress
