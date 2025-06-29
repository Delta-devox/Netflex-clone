import React from 'react';
import { isEmpty } from 'lodash';
import MovieCard from './MovieCard';

interface MovieData {
  data: Record<string, any>[]; // Array of movie objects
  title: string; // Title of the movie list
}

const MovieList: React.FC<MovieData> = ({ data, title }) => {
  if (isEmpty(data)) return null;

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
          {title}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {data.map((movie) => (
            <div
              key={movie.id}
              className="group relative overflow-visible transform-gpu will-change-transform"
            >
              <MovieCard data={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
