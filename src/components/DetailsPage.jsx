import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const OMDb_KEY = "9a9f584d"; 

export default function DetailsPage() {
    const { imdbId } = useParams(); 
    const [details, setDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        setDetails(null);
        setIsLoading(true);
        setError(null);

        const fetchFullDetails = async () => {
            const url = `https://www.omdbapi.com/?apikey=${OMDb_KEY}&i=${imdbId}&plot=full`; 

            try {
                const res = await fetch(url);
                
                if (!res.ok) {
                    throw new Error(`HTTP Error! Status: ${res.status}`);
                }
                
                const data = await res.json();
                
                if (data.Response === "True") {
                    setDetails(data);
                } else {
                    setError(`Movie not found or API error: ${data.Error}`);
                }
            } catch (err) {
                console.error("Detail Fetch Error:", err);
                setError(`Fetch Failed: Could not load details for ID ${imdbId}.`);
            } finally {
                setIsLoading(false);
            }
        };

        if (imdbId) {
            fetchFullDetails();
        } else {
            setError("No Movie ID provided in the URL.");
            setIsLoading(false);
        }
    }, [imdbId]);


    if (isLoading) {
        return <div className="p-8 text-center text-xl text-[#797d62]">Fetching movie facts...</div>;
    }

    if (error) {
        return <div className="p-8 text-center flex-col text-xl text-red-600 space-y-4">
            <p>Error: {error}</p>
            <button onClick={() => navigate('/gallery')} className="py-2 px-4 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition">
                Go back to Gallery
            </button>
        </div>;
    }

    return (
        <div className="p-8 bg-[#b59e8a] min-h-screen">
            

            <div className="bg-white/25 rounded-xl shadow-2xl p-6 md:flex md:space-x-8">
                
                <div className="w-full md:w-1/3 shrink-0 mb-6 md:mb-0">
                    <img 
                        src={details.Poster} 
                        alt={`${details.Title} Poster`} 
                        className="w-full h-auto object-cover rounded-lg shadow-lg aspect-2/3"
                    />
                </div>

                <div className="w-full md:w-2/3 space-y-4 ">
                    <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">{details.Title}</h1>
                    <p className="text-xl text-[#9b9b7a] font-semibold">{details.Year} &bull; {details.Runtime} &bull; {details.Rated}</p>

                    <div className="space-y-2 border-t pt-4 border-gray-100">
                        <p><strong>Plot:</strong> {details.Plot}</p>
                        <p><strong>Director:</strong> {details.Director}</p>
                        <p><strong>Cast:</strong> {details.Actors}</p>
                        <p><strong>Genre:</strong> {details.Genre}</p>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100 justify-between">
                        {details.Ratings && details.Ratings.map((rating, index) => (
                            <div key={index} className="flex flex-col items-center bg-[#9b9b7a] py-3 px-8 rounded-lg shadow-sm">
                                <p className="text-lg font-bold text-white">{rating.Value}</p>
                                <p className="text-xs text-gray-800">{rating.Source}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}