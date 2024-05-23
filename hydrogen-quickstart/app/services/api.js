import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const baseURL =  "http://localhost:8080";

const api = axios.create({
  baseURL,
})

const errorHandler = (error) => {
  return null
}

export const timeslotKeys = {
  all: ['user'],
  email: (email) => [...timeslotKeys.all, email],
};


export const useCreateFavoriteItem = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async (data) => {
      const {product, email} = data
      await new Promise(resolve => setTimeout(resolve, 400));
      const response = await api.post('/favorites', {
        productId: product.id,
        handle: product.handle,
        name: product.title,
        img_url: product.selectedVariant.image.url,
        userEmail: email
      }).catch(errorHandler);
      return response;
    }, {
      onSuccess: async () => {
        await queryClient.invalidateQueries(timeslotKeys.all)
      }
    }
  );
}

export const useGetFavoritesByEmail = (email) => {
  return useQuery(['favorites', email], async () => {
    const response = await api.get(`/favorites/${email}`).catch(errorHandler)
    return response;
  });
}

export const useDeleteFavoriteItem = () => {
  const queryClient = useQueryClient()

  return useMutation(
    async (data) => {
      const{ id, email} = data
      await new Promise(resolve => setTimeout(resolve, 400));
      const response = await api.delete(`/favorites/${id}`).catch(errorHandler);
      return response;
    }, {
      onSuccess: async () => {
        await queryClient.invalidateQueries(timeslotKeys.all)
      }
    }
  );
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async ({name, email}) => {
      try{
        const response = await api.post('/users', {
        name,
        email
        })
        return response;
      } catch (error) {
        alert(`Error: ${error.response.data.message}`);
        throw error;
      }
    }, {
      onSuccess: async () => {
        await queryClient.invalidateQueries(timeslotKeys.all)
      }
    }
  );
}

export const useGetUser = (email) => {
  return useQuery(timeslotKeys.email(email), async () => {
    const response = await api.get(`/users/${email}`).catch(errorHandler)
    return response.data;
  });
}

export const useSignIn = () => {
  return useMutation(
    async ({email}) => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await api.post('/users/signin', {
          email
        });
        return response;
      } catch (error) {
        alert(`Error: ${error.response.data.message}`);
        throw error;
      }
    }
  );
}





