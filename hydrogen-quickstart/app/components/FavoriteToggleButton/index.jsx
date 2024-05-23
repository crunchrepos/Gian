import React from 'react';
import { useGetUser, useCreateFavoriteItem, useDeleteFavoriteItem } from '../../services/api';
import { useState, useEffect, useCallback } from 'react';
import DialogSign from '../DialogSign/index';

export default function FavoriteToggleButton({ product }) {
  const [favorite, setFavorite] = useState(null);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const { mutateAsync: createFavoriteItem, isLoading: isCreateLoading, isError: errorCreate } = useCreateFavoriteItem();
  const { mutateAsync: deleteFavoriteItem, isLoading: isDeleteLoading } = useDeleteFavoriteItem();
  let localStorageUserEmail;
  if (typeof window !== 'undefined') {
    localStorageUserEmail = window.localStorage.getItem('crunch-userEmail');
  }
  const { data } = useGetUser(localStorageUserEmail);

  useEffect(() => {
    setUser(data);
  }, [data]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (user) {
      const findFavoriteProduct = user.favorites.find(favorite => favorite.productId === product.id);
      if (findFavoriteProduct) {
        return setFavorite(findFavoriteProduct);
      } else {
        return setFavorite(null);
      }
    }
  }, [user, product.id]);

  const handleFavorite = useCallback(
    async () => {
      if (!user) return handleOpen();
      if (favorite) {
        await deleteFavoriteItem({ id: favorite.id, email: user.email });
        setFavorite(null);
      } else {
        const newFavorite = await createFavoriteItem({ product, email: user.email });
        setFavorite(newFavorite);
      }
    },
    [user, favorite, deleteFavoriteItem, createFavoriteItem, product]
  );

  return (
    <>
      <button onClick={handleFavorite}>{(isCreateLoading || isDeleteLoading) ? '...' : favorite ? "This item is favorite ❤" : "Favorite this item"}</button>
      <DialogSign isOpen={open} handleOpen={handleOpen} handleClose={handleClose} errorCreate={errorCreate} />
    </>
  );
}
