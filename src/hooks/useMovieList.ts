import useSwr from "swr";
import fetcher from "@/helpers/fetcher";

const useMovieList = () => {
  const { data, error, isLoading } = useSwr("/api/movies", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data,
    error,
    isLoading,
  };
};

export default useMovieList;
