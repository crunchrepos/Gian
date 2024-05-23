import {useGetUser, useDeleteFavoriteItem} from '../services/api'
import {Await, Link, useLoaderData} from '@remix-run/react';
import {useState} from 'react'


/**
 * @type {MetaFunction<typeof loader>}
 */
export const meta = ({data}) => {
  return [{title: `Hydrogen | ${data?.product.title ?? ''}`}];
};

/**
 * @param {LoaderFunctionArgs}
 */
 async function loader({params, request, context}) {
  const { data } = await useGetUser('gianvrocha@gmail.com');
  return data
} 

export default function Favorite(){
  const [deleteIndex, setDeleteIndex] = useState(-1)
  let localStorageUserEmail = ''
  if (typeof window !== 'undefined') {
    localStorageUserEmail = window.localStorage.getItem('crunch-userEmail');
  }
  const { data } = useGetUser(localStorageUserEmail);
  const user = data
  const favorites = user?.favorites
  const {mutateAsync: deleteFavoriteItem, isLoading: isDeleteLoading } = useDeleteFavoriteItem()

  const handleDeleteItem = async (id, index) => {
    setDeleteIndex(index)
    await deleteFavoriteItem({id, email: user.email})
  }
  

  
  return(
    <>
    <h1>{user?.name} favorites</h1>
    <div className="fv-table-responsive">
      <table className="fv-table">
        <tbody>
          {favorites && favorites?.map((favorite, index) => (
            <tr key={index}>
              <td>
                <Link to={`/products/${favorite.handle}`}>
                  <img src={favorite.img_url} alt={favorite.name} className="fv-product-img" />
                </Link>
              </td>
              <td>
                <Link to={`/products/${favorite.handle}`}>
                  {favorite.name}
                </Link>
              </td>
              <td>
                <button onClick={() => handleDeleteItem(favorite.id, index)}>{(isDeleteLoading && index === deleteIndex) ? '...' : 'X'}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  )
}


