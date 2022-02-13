import * as React from 'react'
import { ChangeEvent, useCallback, useEffect } from 'react'
import { useQuery } from '../hooks/useQuery'
import { Country } from '../typing'
import { FaSearch } from 'react-icons/fa'
import { Card } from '../components/card'
import { Header } from './header'
import { Dropdown } from '../components/dropdown'

export function Home() {
    const [countries, setCountries] = React.useState<Country[]>([])
    const response = useQuery<Country[]>('https://restcountries.com/v2/all')

    const onChange = useCallback(
        (evt: ChangeEvent<HTMLInputElement>) => {
            if (!response.data) return
            const target = evt.target as HTMLInputElement
            const value = target.value
            setCountries(
                response.data.filter((country) =>
                    country.name.toLowerCase().includes(value.toLowerCase())
                )
            )
        },
        [countries]
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
                            onChange={(event) => onChange(event)}
                            placeholder="Search for Countries..."
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
                            onChange={() => {}}
                        />
                    </section>
                </nav>
                <section className="grid grid-cols-[_repeat(auto-fill,_280px)_] mt-16">
                    {!countries ? (
                        <div>Loading...</div>
                    ) : (
                        countries.map((country) => {
                            return <Card country={country} />
                        })
                    )}
                </section>
            </main>
        </div>
    )
}
