import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useBillBoard = () => {
    const {data,error,isLoading} = useSWR('/api/random',fetcher,{
        revalidateOnFocus:false,revalidateIfStale:false,revalidateOnReconnect:false,});
        return {data,error,isLoading};
}
export default useBillBoard;