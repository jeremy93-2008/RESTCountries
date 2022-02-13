export interface Country {
    alpha2Code: string
    alpha3Code: string
    altSpellings: string[]
    area: number
    borders: string[]
    callingCodes: number[]
    capital: string
    cioc: string
    currencies: Currency[]
    demonym: string
    flag: string
    flags: { svg: string; png: string }
    independent: boolean
    languages: {
        iso639_1: string
        iso639_2: string
        name: string
        nativeName: string
    }
    latlng: number[]
    name: string
    nativeName: string
    numericCode: string
    population: number
    region: string
    regionalBlocs: { acronym: string; name: string }[]
    subregion: string
    timezones: string[]
    topLevelDomain: string[]
    translations: {
        [key: string]: string
    }
}

export interface Currency {
    code: string
    name: string
    symbol: string
}
