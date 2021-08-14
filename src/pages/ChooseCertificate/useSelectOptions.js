import { useEffect, useMemo } from 'react'
import { useSelect } from '../../hooks'

const toOption = ({ Id, Name }) => ({ value: Id, label: Name })

export const useSelectOptions = ({ certificate, data, setCertificate }) => {
  const options = useMemo(() => {
    return data ? data.map(toOption) : []
  }, [data])
  const selectProps = useSelect(
    options,
    certificate ? toOption(certificate) : null,
  )

  useEffect(() => {
    const selectedId = selectProps.value?.value
    if (data && selectedId) {
      setCertificate(data.find(({ Id }) => Id === selectedId))
    }
  }, [selectProps.value?.value, data])
  return selectProps
}
