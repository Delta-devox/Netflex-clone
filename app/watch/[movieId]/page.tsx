'use client';

import useMovie from '@/hooks/useMovie';

const WatchPage = ({ params }: { params: { movieId: string } }) => {
  const { data, isLoading, error } = useMovie(params.movieId);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Watching: </span>
          {data?.title}
        </p>
      </nav>
      <video className="h-full w-full" src={data?.videoUrl} autoPlay controls />
    </div>
  );
};

export default WatchPage;
