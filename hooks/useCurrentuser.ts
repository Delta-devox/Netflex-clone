import useSWR from "swr";
import fetcher from "../lib/fetcher";

const  useCurrentUser = () => {
    const {data,error,isLoading, mutate} = useSWR('/api/current',fetcher);
    return {data,error,isLoading,mutate};
}
export default useCurrentUser;
//import fetcher from fetcher.
// this is used to fetch the url through the get method.
// Here based upon the url , user is tracked.
//infact, look in this, useSwr , it is used to update the most up-to-date data while maintaining a fast and responsive user experience.
//it was developed by vercel.
//It gets the data from the specified url,[here it is /api/current] where it acts as a req, and fetcher is passed as a parameter.
// It validates the data based on the current user.
// It also validates the data based on the user request.
