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
        <div className="inline-flex flex-wrap">
            {borderCountries.map((country) => (
                <Link
                    key={country.name}
                    to={`/detail/${country.alpha3Code}`}
                    className="flex items-center mt-2 px-6 py-2 bg-white text-sm shadow-md rounded
                        dark:bg-element-dark dark:text-white dark:shadow-gray-900 mr-2 transition-all hover:scale-110"
                >
                    <div>{country.name}</div>
                </Link>
            ))}
        </div>
    )
}
