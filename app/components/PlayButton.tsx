import React from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { useRouter } from 'next/navigation';

interface PlayButtonProps{
    movieId:string;
}

const PlayButton:React.FC<PlayButtonProps> = ({movieId}) =>
{
    const router = useRouter();
    return(
        <div onClick={()=>router.push(`/watch/${movieId}`) }  className="flex flex-row items-center bg-white text-black py-2 px-4 lg:py-2 lg:px-6 rounded-md text-sm lg:text-lg font-bold hover:bg-neutral-300 transition cursor-pointer w-fit">
<BsFillPlayFill size={25} className='mr-1'></BsFillPlayFill>
         Play
        </div>
    );
}
export default PlayButton;