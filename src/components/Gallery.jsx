import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OMDb_KEY = "9a9f584d"; 
const Max_Pages_To_Fetch = 5;

export default function GalleryPage() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const defaultSearchTerm = "star"; 
        let allMovies = []; 

        const fetchAllPages = async () => {
            try {
                for (let page = 1; page <= Max_Pages_To_Fetch; page++) {
                    const url = `https://www.omdbapi.com/?apikey=${OMDb_KEY}&s=${defaultSearchTerm}&type=movie&page=${page}`;
                    
                    const response = await fetch(url);
                    const data = await response.json();

                    if (data.Response === "True" && data.Search) {
                        const moviesWithPosters = data.Search.filter(m => m.Poster !== 'N/A');
                        allMovies = allMovies.concat(moviesWithPosters);
                        
                        if (data.Search.length < 10) break; 
                    } else if (page === 1) {
                        setError(data.Error || 'No movies found for default gallery.');
                        break; 
                    }
                }
                
                setMovies(allMovies);

            } catch (err) {
                console.error("Multi-page Fetch Error:", err);
                setError("Could not connect to the movie database.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllPages();
    }, []);

    const handlePosterClick = (imdbId) => {
        console.log("Poster Clicked! Ready to fetch details for IMDB ID:", imdbId);
        alert(`Simulated navigation to details for ID: ${imdbId}`);
    };


    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center text-xl text-[#ffd7ba]">Loading movie posters...</div>;
    }

    if (error) {
        return <div className="min-h-screen flex items-center justify-center text-xl text-[#d08c60]">Error: {error}</div>;
    }

    return (
        <div className="p-8 bg-[#b59e8a] min-h-screen">
            <h1 className="font-sans text-3xl font-black uppercase tracking-tight text-white mb-8 text-center">Movie Gallery</h1>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
                
                {movies.map(movie => (
                    <div 
                        key={movie.imdbID} 
                        onClick={() => handlePosterClick(movie.imdbID)}
                        className="cursor-pointer group shadow-lg rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl bg-white w-full"
                    >
                        <div className="aspect-2/3 w-full bg-gray-200">
                            <img 
                                src={movie.Poster} 
                                alt={`${movie.Title} Poster`} 
                                
                                className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80"
                            />
                        </div>
                        
                        <div className="p-3 text-center bg-[#ffd7ba]" >
                            <p className="text-sm font-semibold text-gray-800 truncate">{movie.Title}</p>
                            <p className="text-xs text-gray-500">{movie.Year}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            {movies.length === 0 && (
                 <div className="text-center mt-12 text-gray-500">No posters found for the default gallery search.</div>
            )}
        </div>
    );
}