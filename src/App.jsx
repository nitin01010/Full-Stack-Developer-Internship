import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [movieId, setMovieId] = useState("");
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [aiSummary, setAiMovieSummary] = useState([]);

  const fetchMovie = async () => {
    if (!movieId.trim()) {
      setError("Please enter an IMDb ID");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMovieData(null);

      const res = await fetch(
        `https://full-stack-developer-internship-backend.onrender.com/api/movies/${movieId}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch movie");
      }

      const data = await res.json();

      // if backend sends error
      if (!data || data.error) {
        setError("Movie not found");
        return;
      }

      setMovieData(data);
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleAISummary = async () => {
    try {
      const res = await fetch(
        "https://full-stack-developer-internship-backend.onrender.com/api/movies/ai-summary",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            plot: movieData.Plot,
            actors: movieData.Actors,
            rating: movieData.imdbRating,
          }),
        }
      );

      const data = await res.json();
      setAiMovieSummary(data);
    } catch (error) {
      console.error("AI Request Error:", error);
    }
  };

  const {summary} = aiSummary;
  


  return (
    <div className="min-h-screen bg-[#f6f7fb] flex flex-col items-center p-6">

      <h1 className="text-5xl font-bold py-6 bg-linear-to-r from-blue-500  via-yellow-400 to-green-500 bg-clip-text text-transparent">
        AI Movie Insight Builder
      </h1>

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6">
        <SearchBar
          movieId={movieId}
          setMovieId={setMovieId}
          fetchMovie={fetchMovie}
        />

        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {movieData && <MovieCard summary={summary} movie={movieData} handleAISummary={handleAISummary}  />}
      </div>
    </div>
  );
}

export default App;