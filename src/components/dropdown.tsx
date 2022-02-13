import { FaCaretDown, FaCaretUp } from 'react-icons/fa'
import * as React from 'react'

interface DropdownProps {
    label: string
    options: string[]
    onChange: (value: string | null) => void
}

export function Dropdown({ label, options, onChange }: DropdownProps) {
    const [isOpen, setOpen] = React.useState(false)
    const [selected, setSelected] = React.useState<string | null>(null)

    const onChangeHandler = (value: string) => {
        setOpen(false)
        if (selected === value) {
            setSelected(null)
            return onChange(null)
        }
        setSelected(value)
        onChange(value)
    }

    return (
        <>
            <button
                onClick={() => setOpen(!isOpen)}
                className="flex justify-start bg-gray-50 text-black p-4 rounded shadow dark:bg-element-dark dark:text-white"
            >
                <span className="text-left w-[150px]">{selected || label}</span>
                {isOpen ? (
                    <FaCaretUp className="ml-2 text-xl" />
                ) : (
                    <FaCaretDown className="ml-2 text-xl" />
                )}
            </button>
            <div className={`dropdown-region-content absolute mt-2 z-10`}>
                <div
                    className={`dark:bg-element-dark bg-gray-50 w-[210px] overflow-hidden transition-all rounded ${
                        isOpen ? 'opacity-100 h-[200px]' : 'opacity-0 h-0'
                    }`}
                >
                    {options.map((region) => (
                        <button
                            key={region}
                            className={`block text-black py-2 px-4 text-left w-[210px] rounded ${
                                selected === region
                                    ? 'bg-gray-200 dark:bg-hover-dark'
                                    : ''
                            }
                                hover:bg-gray-200 dark:text-white dark:hover:bg-hover-dark`}
                            onClick={() => onChangeHandler(region)}
                        >
                            <span className="text-left">{region}</span>
                        </button>
                    ))}
                </div>
            </div>
        </>
    )
}
