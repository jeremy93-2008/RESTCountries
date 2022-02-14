import * as React from 'react'
import { useEffect } from 'react'
import { useQuery } from '../hooks/useQuery'
import { Country } from '../typing'
import { FaSearch } from 'react-icons/fa'
import { FiLoader } from 'react-icons/fi'
import { Card } from '../components/card'
import { Header } from '../templates/header'
import { Dropdown } from '../components/dropdown'
import { useSearchCountry } from '../hooks/useSearchCountry'
import { useNavigate } from 'react-router-dom'

export function Home() {
    const [countries, setCountries] = React.useState<Country[] | null>(null)
    const navigate = useNavigate()
    const response = useQuery<Country[]>('https://restcountries.com/v2/all')

    const { inputValue, onInputChange, onChangeSelect } = useSearchCountry(
        response.data,
        (data, value, region) => {
            if (!data) return
            setCountries(
                data.filter(
                    (country) =>
                        country.name
                            .toLowerCase()
                            .includes(value.toLowerCase()) &&
                        country.region
                            .toLowerCase()
                            .includes(region.toLowerCase())
                )
            )
        }
    )

    useEffect(() => {
        if (response.data) {
            setCountries(response.data)
        }
    }, [response.data])

    return (
        <div className="bg-gray-200 w-[100vw] min-h-[100vh] dark:bg-background-dark transition-all">
            <Header />
            <main className="flex flex-col items-center relative lg:px-20 px-5 py-14">
                <nav className="flex lg:flex-row flex-col lg:items-center items-start justify-between lg:px-20 w-full">
                    <section className="inline-flex justify-between items-center bg-gray-50 w-full lg:w-[450px] inline-block px-5 py-2 rounded shadow dark:bg-element-dark">
                        <FaSearch className="text-xl  flex-2 text-gray-400 mr-5" />
                        <input
                            className="bg-gray-50 flex-5 py-2 lg:w-[400px] w-full outline-none transition-all bg-transparent dark:text-white"
                            type="text"
                            onChange={(event) => onInputChange(event)}
                            placeholder="Search for Countries..."
                            value={inputValue}
                        />
                    </section>
                    <section className="dropdown-region mt-5 lg:mt-0">
                        <Dropdown
                            label="Filter by Region"
                            options={[
                                'Africa',
                                'America',
                                'Asia',
                                'Europe',
                                'Oceania',
                            ]}
                            onChange={(value) => onChangeSelect(value)}
                        />
                    </section>
                </nav>
                <section className="grid grid-cols-[_repeat(auto-fill,_280px)_] justify-center mt-16 w-full">
                    {!countries ? (
                        <div className="col-span-full flex justify-center">
                            <FiLoader className="animate-spin text-4xl text-gray-500 dark:text-white" />
                        </div>
                    ) : (
                        countries.map((country) => {
                            return (
                                <Card
                                    key={country.name}
                                    onClick={() =>
                                        navigate(
                                            '/detail/' + country.alpha3Code
                                        )
                                    }
                                    country={country}
                                />
                            )
                        })
                    )}
                </section>
            </main>
        </div>
    )
}
