import { useState } from 'react';

const OMDb_KEY = "9a9f584d";

export default function Search() {
    const [searchTerm, setSearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    return (
        <div className='flex flex-col items-center'>
            <div className="text-3xl font-bold">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                    className="p-2 border-2 border-black rounded"
                />
                <button
                    onClick={() => {
                        setIsLoading(true)
                        setTimeout(() => setIsLoading(false), 2000)
                    }}
                    className="ml-2 p-2 bg-blue-500 text-white rounded"
                >
                    Search
                </button>
            </div>
            {isLoading && <div className="mt-4 text-gray-500">Loading...</div>}
        </div>
    )
}