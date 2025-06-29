
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import {getServerSession} from "next-auth"
import Navbar from "./components/Navbar";
import Billboard from "./components/BillBoard";
import MovieList from "./components/MovieList";
import prismadb from "@/lib/prismadb";
//import {currentUser} from "@/hooks/useCurrentuser";
//inside , the paragrap tag: currentUser inside the Home function component.
export default async function Home() {
  //Instead of using session.user?name  
  const session = await getServerSession(authOptions); // It is used in ServerSide.
  //const {data: user} = useCurrentUser();
  if (!session) {
    redirect("/authentication"); 
  }
const movies = await prismadb.movie.findMany();
  return (
  
    <>
    <Navbar />
   <Billboard />
    <div className="pb-40">
      <MovieList title="Trending Now" data={movies} />
      <MovieList title="My List" data = {movies} />
      </div>
    </>
  );
}
