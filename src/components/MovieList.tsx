import MovieCard from "./MovieCard";

type MovieListProps = {
  data: Record<string, any>[];
  title: string;
};

const MovieList = ({ data, title }: MovieListProps) => {
  if (data?.length === 0) {
    return;
  }
  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-5">
          {title}
        </p>
        <div className="grid grid-cols-4 gap-2">
          {data?.map((movie) => {
            return (
              <div key={movie.id}>
                <MovieCard key={movie.id} data={movie} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
