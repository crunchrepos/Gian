import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render, fireEvent } from '@testing-library/react';
import FavoriteToggleButton from './index';
import '@testing-library/jest-dom';

// Mocking the services
jest.mock('../../services/api', () => ({
  useGetUser: jest.fn(),
  useCreateFavoriteItem: jest.fn(),
  useDeleteFavoriteItem: jest.fn(),
  useCreateUser: jest.fn(),
  useSignIn: jest.fn(),
}));

import { useGetUser, useCreateFavoriteItem, useDeleteFavoriteItem, useCreateUser, useSignIn } from '../../services/api';

describe('FavoriteToggleButton', () => {
  const queryClient = new QueryClient();

  const renderComponent = (product, user, favorite) => {
    useGetUser.mockReturnValue({ data: user });
    useCreateFavoriteItem.mockReturnValue({
      mutateAsync: jest.fn().mockResolvedValue({ id: '1' }),
      isLoading: false,
      isError: false,
    });
    useDeleteFavoriteItem.mockReturnValue({
      mutateAsync: jest.fn().mockResolvedValue({}),
      isLoading: false,
      isError: false,
    });
    useCreateUser.mockReturnValue({
      mutateAsync: jest.fn(),
      isLoading: false,
      error: null,
    });
    useSignIn.mockReturnValue({
      mutateAsync: jest.fn(),
      isLoading: false,
      error: null,
    });

    return render(
      <QueryClientProvider client={queryClient}>
        <FavoriteToggleButton product={product} />
      </QueryClientProvider>
    );
  };

  it('handles favorite button click when product is already favorited', async () => {
    const product = { id: '1', name: 'Test Product' };
    const user = { email: 'test@example.com', favorites: [{ productId: '1', id: 'fav1' }] };

    const { findByText } = renderComponent(product, user, true);

    // Wait for the button text to show that the item is already favorited
    await findByText('This item is favorite ❤');

    // Simulate button click to unfavorite the item
    fireEvent.click(await findByText('This item is favorite ❤'));

    // Wait for the button text to change back to "Favorite this item"
    await findByText('Favorite this item');

    // Verify the API calls and state changes
    expect(useDeleteFavoriteItem().mutateAsync).toHaveBeenCalledWith({ id: 'fav1', email: user.email });
  });

  it('handles favorite button click when user is logged in', async () => {
    const product = { id: '1', name: 'Test Product' };
    const user = { email: 'test@example.com', favorites: [] };

    const { findByText } = renderComponent(product, user, null);

    // Simulate button click to favorite the item
    fireEvent.click(await findByText('Favorite this item'));

    // Wait for the button text to change
    await findByText('This item is favorite ❤');

    // Verify the API calls and state changes
    expect(useCreateFavoriteItem().mutateAsync).toHaveBeenCalledWith({ product, email: user.email });
  });

  it('opens DialogSign when user is null', () => {
    const product = { id: '1', name: 'Test Product' };
    const user = null;

    const { getByText, getByTestId } = renderComponent(product, user, null);

    // Simulate button click
    fireEvent.click(getByText('Favorite this item'));

    // Check if the sign-in dialog is opened
    expect(getByTestId('dialog-sign')).toBeInTheDocument();
  });
});
