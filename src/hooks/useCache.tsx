import * as React from 'react'
import { useRef } from 'react'

export function useCache(key: string) {
    const listCache = useRef(new Map())
    return {
        get: () => listCache.current.get(key),
        set: (value: any) => listCache.current.set(key, value),
    }
}
