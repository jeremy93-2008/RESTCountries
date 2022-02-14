import React, { useMemo } from 'react'
import { useQuery } from '../hooks/useQuery'
import { Country } from '../typing'
import { Link } from 'react-router-dom'

export function BorderCountries({ codes }: { codes: string[] }) {
    const response = useQuery<Country[]>('https://restcountries.com/v2/all')
    const borderCountries = useMemo(() => {
        if (!response.data) return []
        return response.data.filter((country) =>
            codes.find((code) => code === country.alpha3Code)
        )
    }, [response])

    return (
        <div className="inline-flex">
            {borderCountries.map((country) => (
                <Link
                    key={country.alpha3Code}
                    to={`/detail/${country.name}`}
                    className="flex items-center px-6 py-2 bg-white text-sm shadow-md rounded
                        dark:bg-element-dark dark:text-white dark:shadow-gray-900 mr-2"
                >
                    <div>{country.name}</div>
                </Link>
            ))}
        </div>
    )
}
