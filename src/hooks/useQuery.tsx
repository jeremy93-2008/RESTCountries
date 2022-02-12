import { useEffect, useRef, useState } from 'react'
import { useCache } from './useCache'

interface IQueryOptions {
    method: 'GET' | 'POST'
    skip: boolean
    renew: boolean
}

export function useQuery<T>(url: string, options?: IQueryOptions) {
    const { get: getCache, set: setCache } = useCache(url)
    const loading = useRef(true)
    const [response, setResponse] = useState<any>(null)

    useEffect(() => {
        loading.current = true
        const cacheResponse = getCache()
        const method = options?.method || 'GET'
        if (options?.skip) return
        if (cacheResponse && !options?.renew) return setResponse(cacheResponse)
        fetch(url, { method })
            .then(async (response: Response) => {
                loading.current = false
                const data = await response.json()
                setResponse({ response, data })
                return data
            })
            .catch((error: any) => {
                loading.current = false
                console.warn(error)
            })
    }, [url])

    return loading.current
        ? { loading: loading.current, response: null, data: null }
        : { loading: loading.current, response, data: response?.data as T }
}
