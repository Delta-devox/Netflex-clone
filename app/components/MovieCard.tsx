'use client';
import React from 'react';
import Favbtn from './Favbtn';
interface MovieCardProps {
  data: Record<string, any>;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  return (
    <div className="group relative cursor-pointer">
      {/* Main Thumbnail */}
      <img
        src={data.thumbnailUrl}
        alt={data.title || 'Movie Thumbnail'}
        className="w-full h-auto rounded-md object-cover delay-300 group-hover:opacity-90 transition duration-300 transform group-hover:scale-105 group-hover:shadow-xl"
      />

      {/* Hover Details */}
      <div className="opacity-0 pointer-events-none absolute top-0 left-0 w-[25vw] transition duration-300 z-20 invisible group-hover:visible group-hover:opacity-100 group-hover:pointer-events-auto group-hover:scale-100 scale-0 transform origin-top-left group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw]">
        {/* Enlarged Thumbnail */}
        <img
          className="cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-[12vw]"
          src={data.thumbnailUrl}
          alt={data.title || 'Movie Thumbnail'}
        />

        {/* Details Section */}
        <div className="z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md">
          <div className="flex flex-row items-center gap-3">
            {/* Play Button */}
            <div
              className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
              onClick={() => console.log(`Playing movie: ${data.title}`)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 lg:w-6 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.752 11.168l-6.518-3.759A1 1 0 007 8.25v7.5a1 1 0 001.234.97l6.518-3.759a1 1 0 000-1.732z"
                />
              </svg>
            </div>

            {/* Favorite Button */}
            <div
              className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 border-2 border-white rounded-full flex justify-center items-center transition hover:border-neutral-300"
              onClick={() => console.log(`Added to favorites: ${data.title}`)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 lg:w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 19.364l7.071-7.071m0 0l7.071 7.071M12 12l7.071-7.071M12 12L4.929 4.929"
                />
              </svg>
            </div>
            <Favbtn movieId={data?.id} />
          </div>

    
          <p className="text-green-400 font-semibold mt-4">
            New <span className="text-white">({data.releaseYear})</span>
          </p>
          <p className="text-white text-sm mt-2 line-clamp-2">
            {data.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
