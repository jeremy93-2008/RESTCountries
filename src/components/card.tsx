import * as React from 'react'
import { Country } from '../typing'

export function Card({ country }: { country: Country }) {
    return (
        <article
            className="relative z-0 bg-gray-50 rounded shadow mb-6 mr-12 cursor-pointer
                                    overflow-hidden transition-all hover:scale-110 dark:bg-element-dark"
            key={country.name}
        >
            <img
                className="h-1/2 w-full object-cover"
                src={country.flag}
                alt={country.name}
            />
            <div className="text-gray-400 p-5 dark:text-white">
                <h3 className="text-black text-xl font-bold mb-4 dark:text-white">
                    {country.name}
                </h3>
                <p>
                    <strong className="text-black font-[600] dark:text-white">
                        Population:{' '}
                    </strong>
                    {new Intl.NumberFormat().format(country.population)}
                </p>
                <p>
                    <strong className="text-black font-[600] dark:text-white">
                        Region:{' '}
                    </strong>
                    {country.region}
                </p>
                <p>
                    <strong className="text-black font-[600] dark:text-white">
                        Capital:{' '}
                    </strong>
                    {country.capital}
                </p>
            </div>
        </article>
    )
}
