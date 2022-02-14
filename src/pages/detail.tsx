import * as React from 'react'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../templates/header'
import { useQuery } from '../hooks/useQuery'
import { Country } from '../typing'
import { useParams } from 'react-router'
import { FaArrowLeft } from 'react-icons/fa'
import { useDataDetails } from '../hooks/useDataDetails'
import { BorderCountries } from '../templates/borderCountries'

export function Detail() {
    const { code } = useParams()
    const response = useQuery<Country[]>('https://restcountries.com/v2/all')

    const country = useMemo(() => {
        if (response.data) {
            return response.data.find((country) => country.alpha3Code === code)
        }
    }, [response.data, code])

    const dataDetails = useDataDetails(country)

    return (
        <div className="bg-gray-200 w-[100vw] min-h-[100vh] dark:bg-background-dark transition-all">
            <Header />
            <main className="px-14 py-14">
                <nav className="flex items-center justify-between pr-14">
                    <Link to="/">
                        <button
                            className="flex items-center px-10 py-2 bg-white shadow-md rounded
                        dark:bg-element-dark dark:text-white dark:shadow-gray-900 transition-all hover:scale-110"
                        >
                            <FaArrowLeft />
                            <span className="ml-2">Back</span>
                        </button>
                    </Link>
                </nav>
                <section className="flex lg:flex-row flex-col mt-16">
                    {country && (
                        <>
                            <div className="flex-1">
                                <img src={country.flag} alt={country.name} />
                            </div>
                            <div className="flex-1 lg:max-w-[50vw] lg:px-14 py-12">
                                <h2 className="text-dark font-bold text-2xl dark:text-white">
                                    {country.name}
                                </h2>
                                <section className="grid grid-cols-2 grid-rows-5 mt-6 dark:text-white">
                                    {dataDetails &&
                                        dataDetails.map((detail) =>
                                            detail.title ? (
                                                <p>
                                                    <strong className="font-[600]">
                                                        {detail.title}:{' '}
                                                    </strong>
                                                    {detail.value || ''}
                                                </p>
                                            ) : (
                                                <p />
                                            )
                                        )}
                                </section>
                                <section className="mt-12">
                                    <strong className="font-[600] mr-2 dark:text-white">
                                        Border Countries:{' '}
                                    </strong>
                                    <BorderCountries
                                        codes={country.borders || []}
                                    />
                                </section>
                            </div>
                        </>
                    )}
                </section>
            </main>
        </div>
    )
}
