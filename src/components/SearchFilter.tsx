'use client'
import React, { useState } from 'react'

const SearchFilter = () => {
    const [value, setValue] = useState("")

    const handleSearch = (e) => {
        e.preventDefault();
        (window.location.href = "/search/?search=" + value)
    }

    return (
        <div className=" px-6 py-4 bg-white shadow-sm">
            <input
                type="text"
                placeholder="Search Habbos..."
                onChange={e => setValue(e.target.value)}
                className="w-full md:w-1/3 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button
            onClick={handleSearch}
                className="bg-orange-600 hover:bg-orange-700  px-4 py-2 md:-ml-4 text-white px-4 py-1 rounded"
            >
                Search
            </button>
        </div>

    )
}

export default SearchFilter
