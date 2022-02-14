import * as React from 'react'
import { ChangeEvent, useCallback } from 'react'
import { Country } from '../typing'

export function useSearchCountry(
    data: Country[] | null,
    onChange: (data: Country[], value: string, region: string) => void
) {
    const [inputValue, setInputValue] = React.useState('')
    const [selectedRegion, setSelectedRegion] = React.useState<string>('')

    const onInputChange = useCallback(
        (evt: ChangeEvent<HTMLInputElement>) => {
            if (!data) return
            const target = evt.target as HTMLInputElement
            const value = target.value
            setInputValue(value)
            onSearchCountries({
                textValue: value,
                regionValue: selectedRegion,
            })
        },
        [selectedRegion, data]
    )

    const onChangeSelect = useCallback(
        (value: string | null) => {
            setSelectedRegion(value || '')
            if (!value)
                return onSearchCountries({
                    textValue: inputValue,
                    regionValue: '',
                })
            onSearchCountries({ textValue: inputValue, regionValue: value })
        },
        [inputValue, data]
    )

    const onSearchCountries = useCallback(
        ({ textValue, regionValue }) => {
            if (!data) return
            onChange(data, textValue, regionValue)
        },
        [data]
    )

    return {
        inputValue,
        selectedRegion,
        onInputChange,
        onChangeSelect,
    }
}
