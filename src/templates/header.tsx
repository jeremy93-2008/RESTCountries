import * as React from 'react'
import { useCallback, useEffect } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'

export function Header() {
    const [isDark, setIsDark] = React.useState(false)
    const onClickDarkMode = useCallback(() => {
        const html = document.querySelector('html')
        if (!html) return
        html.classList.toggle('dark')
        setIsDark(html.classList.contains('dark'))
    }, [])

    useEffect(() => {
        const html = document.querySelector('html')
        if (!html) return
        setIsDark(html.classList.contains('dark'))
    }, [])

    return (
        <header className="flex justify-between items-center bg-gray-50 shadow pr-10 transition-all dark:bg-element-dark dark:text-white dark:shadow-xl">
            <h2 className="text-2xl font-extrabold p-5 pl-20">
                Where in the world?
            </h2>
            <div
                onClick={onClickDarkMode}
                className="flex justify-center items-center p-2 font-[600] cursor-pointer rounded transition-all
                hover:bg-gray-700 hover:text-white"
            >
                {!isDark ? (
                    <>
                        <FaMoon />
                        <span className="ml-3">Dark Mode</span>
                    </>
                ) : (
                    <>
                        <FaSun />
                        <span className="ml-3">Light Mode</span>
                    </>
                )}
            </div>
        </header>
    )
}
