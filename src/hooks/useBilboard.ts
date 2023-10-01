import useSwr from "swr";
import fetcher from "@/helpers/fetcher";

const useBilboard = () => {
  const { data, error, isLoading } = useSwr("/api/random", fetcher, {
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

export default useBilboard;
