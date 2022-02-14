import { useMemo } from 'react'
import { Country } from '../typing'

export function useDataDetails(country: Country | undefined) {
    return useMemo(() => {
        return [
            {
                title: 'Native Name',
                value: country?.nativeName,
            },
            {
                title: 'Top Level Domain',
                value: country?.topLevelDomain[0],
            },
            {
                title: 'Population',
                value: country?.population,
            },
            {
                title: 'Currencies',
                value: country?.currencies[0].name,
            },
            {
                title: 'Region',
                value: country?.region,
            },
            {
                title: 'Languages',
                value: country?.languages
                    .map((language) => language.name)
                    .join(', '),
            },
            {
                title: 'Sub Region',
                value: country?.subregion,
            },
            {
                title: '',
                value: '',
            },
            {
                title: 'Capital',
                value: country?.capital,
            },
        ]
    }, [country])
}
