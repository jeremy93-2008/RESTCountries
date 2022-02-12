import * as React from 'react'
import { useQuery } from '../hooks/useQuery'
import { Countries } from '../typing'
import { FaMoon, FaSearch } from 'react-icons/fa'

export function Home() {
    const response = useQuery<Countries[]>('https://restcountries.com/v2/all')
    return (
        <div className="bg-gray-200 w-[100vw] min-h-[100vh]">
            <header className="flex justify-between items-center bg-gray-50 shadow pr-20">
                <h2 className="text-2xl font-extrabold p-5 pl-20">
                    Where in the world?
                </h2>
                <div
                    className="flex justify-center items-center p-2 font-[600] cursor-pointer rounded transition-all
                hover:bg-gray-700 hover:text-white"
                >
                    <FaMoon />
                    <span className="ml-3">Dark Mode</span>
                </div>
            </header>
            <main className="px-20 py-14">
                <nav className="">
                    <section className="inline-flex justify-between items-center bg-gray-50 inline-block px-5 py-2 rounded shadow">
                        <FaSearch className="text-xl flex-1 text-gray-400 mr-5" />
                        <input
                            className="bg-gray-50 flex-5 py-2 w-[400px]"
                            type="text"
                            placeholder="Search for Countries"
                        />
                    </section>
                </nav>
                <section className="mt-16">
                    {response.loading ? (
                        <div>Loading...</div>
                    ) : (
                        response?.data.map((country) => {
                            return (
                                <article
                                    className="bg-gray-50 p-5 rounded shadow mt-4"
                                    key={country.name}
                                >
                                    <h3 className="text-xl font-bold">
                                        {country.name}
                                    </h3>
                                    <p className="text-gray-400">
                                        {country.capital}
                                    </p>
                                </article>
                            )
                        })
                    )}
                </section>
            </main>
        </div>
    )
}
