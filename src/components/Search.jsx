import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OMDb_KEY = "9a9f584d"; 

export default function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const [searchResults, setSearchResults] = useState([]); 
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault(); 
        
        if (!searchTerm.trim()) return;

        setIsLoading(true);
        setError(null);
        setSearchResults([]); 

        const encodedTerm = encodeURIComponent(searchTerm.trim());
        const url = `https://www.omdbapi.com/?apikey=${OMDb_KEY}&s=${encodedTerm}&type=movie`; 

        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data.Response === "True" && data.Search) {
                const moviesWithPosters = data.Search.filter(m => m.Poster !== 'N/A');
                setSearchResults(moviesWithPosters);

            } else {
                setError(data.Error || 'No results found for that title.');
            }
        } catch (error) {
            console.error("Network Fetch Error:", error);
            setError("Network or API Fetch Error. Check key and connection.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleResultClick = (imdbId, title) => {
        console.log(`CLICKED: Ready to navigate to details for Title: ${title}, ID: ${imdbId}`);
        alert(`Navigating to details for ${title} (ID: ${imdbId})`);

    };

    return (
        <div className='flex flex-col items-center p-8 bg-[#b59e8a] min-h-screen'>
            <div className="text-4xl font-extrabold text-white mb-8 mt-16">
                Movie Finder
            </div>

            <form onSubmit={handleSearch} className="flex space-x-2 max-w-lg w-full">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for a movie title..."
                    className="grow p-3 border-2 border-gray-300 rounded-lg focus:border-[#ffd7ba] shadow-md"
                />
                <button
                    type="submit"
                    className="p-3 bg-[#ffd7ba] text-black font-semibold rounded-lg shadow-md hover:bg-[#FFE5D5] transition"
                    disabled={!searchTerm.trim() || isLoading}
                >
                    {isLoading ? 'Searching...' : 'Search'}
                </button>
            </form>
            

            {isLoading && <div className="mt-8 text-[#ffd7ba] font-medium">Fetching results...</div>}

            {error && <div className="mt-8 text-red-600 font-medium p-4 border border-red-300 rounded-lg bg-red-50 max-w-lg w-full">{error}</div>}

            {!isLoading && searchResults.length > 0 && (
                <div className="mt-8 w-full max-w-lg space-y-3">
                    <h2 className="text-xl font-semibold text-gray-700">Results for "{searchTerm}"</h2>
                    {searchResults.map(movie => (
                        <div 
                            key={movie.imdbID}
                            onClick={() => handleResultClick(movie.imdbID, movie.Title)}
                            className="flex items-center p-3 bg-[#ffd7ba] border border-black rounded-lg shadow-sm cursor-pointer hover:bg-[#FFE5D5] transition duration-150"
                        >
                            <img 
                                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://placehold.co/40x60/cccccc/000000?text=NO'}
                                alt={`${movie.Title} Poster`} 
                                className="w-10 h-16 object-cover rounded-sm mr-4 shrink-0"
                            />
                            <div>
                                <p className="font-semibold text-gray-800">{movie.Title}</p>
                                <p className="text-sm text-gray-500">Year: {movie.Year}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}