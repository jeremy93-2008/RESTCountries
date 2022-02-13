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
    const [countries, setCountries] = React.useState<Country[]>(null)
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
            <main className="px-20 py-14">
                <nav className="flex items-center justify-between pr-14">
                    <section className="inline-flex justify-between items-center bg-gray-50 inline-block px-5 py-2 rounded shadow dark:bg-element-dark">
                        <FaSearch className="text-xl flex-1 text-gray-400 mr-5" />
                        <input
                            className="bg-gray-50 flex-5 py-2 w-[400px] outline-none transition-all bg-transparent dark:text-white"
                            type="text"
                            onChange={(event) => onInputChange(event)}
                            placeholder="Search for Countries..."
                            value={inputValue}
                        />
                    </section>
                    <section className="dropdown-region">
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
                <section className="grid grid-cols-[_repeat(auto-fill,_280px)_] mt-16">
                    {!countries ? (
                        <div className="text-2xl">
                            <FiLoader />
                        </div>
                    ) : (
                        countries.map((country) => {
                            return (
                                <Card
                                    onClick={() =>
                                        navigate('/detail/' + country.name)
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
