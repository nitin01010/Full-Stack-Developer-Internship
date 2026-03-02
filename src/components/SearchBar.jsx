import React from "react";

function SearchBar({ movieId, setMovieId, fetchMovie }) {
  return (
    <div className="flex gap-2 bg-gray-100 p-2 rounded-xl">
      <input
        value={movieId}
        onChange={(e) => setMovieId(e.target.value)}
        placeholder="Enter IMDb ID (example: tt0133093)"
        className="flex-1 p-3 rounded-lg outline-none bg-white"
      />

      <button
        onClick={fetchMovie}
        className="px-6 bg-yellow-400 hover:bg-yellow-500 rounded-lg font-semibold transition"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;