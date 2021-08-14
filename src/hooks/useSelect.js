import { useCallback, useState } from 'react'

export const useSelect = (values, selectedValue, { defaultTitle } = {}) => {
  const [selected, setSelected] = useState(selectedValue)

  const onChange = useCallback((option) => {
    if (option === null) return
    setSelected(option)
  }, [])
  return {
    options: defaultTitle
      ? [{ label: defaultTitle, value: '' }, ...values]
      : values,
    value: selected,
    onChange,
  }
}
