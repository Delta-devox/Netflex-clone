import React, { useCallback, useMemo } from 'react';
import axios from 'axios';
import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai'; // ✅ IMPORT ICONS

import useCurrentUser from '@/hooks/useCurrentuser';
import useFavorites from '@/hooks/useFavorite';

interface FavoriteButtonProps {
  movieId: string;
}

const Favbtn: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { data: currentUser, mutate: mutateUser } = useCurrentUser();
  const { mutate: mutateFavorites } = useFavorites();

  // ✅ Check if movie is in favorites
  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(movieId);
  }, [currentUser, movieId]);

  // ✅ Toggle favorite
  const toggleFavorites = useCallback(async () => {
    try {
      let response;

      if (isFavorite) {
        response = await axios.delete('/api/favorite', { data: { movieId } });
      } else {
        response = await axios.post('/api/favorite', { movieId });
      }

      mutateUser();      // Update user state
      mutateFavorites(); // Update favorites list
    } catch (error) {
      console.error('[FAV_BUTTON_ERROR]', error);
    }
  }, [movieId, isFavorite, mutateUser, mutateFavorites]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      onClick={toggleFavorites}
      className='cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex items-center justify-center transition hover:border-neutral-300'
    >
      <Icon className='text-white' size={25} />
    </div>
  );
};

export default Favbtn;
