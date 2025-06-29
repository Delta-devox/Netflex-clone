import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useFavorite = () =>
{
  const {data,error,mutate,isLoading} = useSWR('/api/favourites',fetcher);
  return{
    data,error,mutate,isLoading
  };
}
export default useFavorite;