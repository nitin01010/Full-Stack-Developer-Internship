import React from "react";

function MovieCard({ movie, handleAISummary, summary, loadingAI }) {
  const { Title, Poster, Year, Ratings, Plot, imdbRating, Actors } = movie;

  return (
    <div className="mt-6 bg-white rounded-2xl shadow-lg border border-gray-100 p-6
                    animate-[fadeIn_.5s_ease-in-out]">

      <div className="flex flex-col md:flex-row gap-6">

        {/* Poster */}
        <img
          src={Poster}
          alt={Title}
          className="w-full md:w-56 rounded-xl object-cover shadow-md
                     hover:scale-[1.02] transition duration-300"
        />

        {/* Content */}
        <div className="flex flex-col flex-1">

          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
            {Title}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {Year} • IMDb ⭐{" "}
            <span className="text-yellow-500 font-medium">{imdbRating}</span>
          </p>

          <p className="text-gray-700 mt-4">
            <span className="font-medium text-gray-900">Cast:</span> {Actors}
          </p>

          <p className="text-gray-700 mt-3 leading-relaxed">
            <span className="font-medium text-gray-900">Plot:</span> {Plot}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {Ratings?.map((r, i) => (
              <span
                key={i}
                className="bg-gray-50 border border-gray-200 px-3 py-1
                           rounded-full text-sm text-gray-700"
              >
                {r.Source}: {r.Value}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* AI SECTION */}
      <div className="flex flex-col items-center mt-6">

        <button
          onClick={handleAISummary}
          className="px-6 py-2 rounded-lg bg-linear-to-r
                     from-blue-500 via-purple-500 to-pink-500
                     text-white font-medium shadow-md
                     hover:scale-105 hover:shadow-lg
                     transition duration-300"
        >
          {loadingAI ? "Generating..." : "✨ Get AI Summary"}
        </button>

        {/* ChatGPT-style response */}
        {summary && (
          <div className="mt-4 w-full max-w-2xl bg-gray-50 border border-gray-200
                          rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-500 mb-2">AI Insight</p>
            <p className="text-gray-800 leading-relaxed whitespace-pre-line">
              {summary}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default MovieCard;