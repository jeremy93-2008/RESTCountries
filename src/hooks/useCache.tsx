import * as React from 'react'
import { SaveQueryAtom } from '../store'
import { useAtom } from 'jotai'

export function useCache(key: string) {
    const [listCache, setListCache] = useAtom(SaveQueryAtom)
    return {
        get: () => listCache.get(key),
        set: (value: any) =>
            setListCache((list) => {
                listCache.set(key, value)
                return new Map(list)
            }),
    }
}
