import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Dialog from './index';
import '@testing-library/jest-dom';

// Mocking the services
jest.mock('../../services/api', () => ({
  useCreateUser: jest.fn(),
  useSignIn: jest.fn(),
}));

import { useCreateUser, useSignIn } from '../../services/api';

describe('Dialog', () => {
  const renderComponent = (isOpen) => {
    return render(<Dialog isOpen={isOpen} handleClose={jest.fn()} />);
  };

  beforeEach(() => {
    useCreateUser.mockReturnValue({
      mutateAsync: jest.fn().mockResolvedValue({}),
      isLoading: false,
      error: null,
    });
    useSignIn.mockReturnValue({
      mutateAsync: jest.fn().mockResolvedValue({}),
      isLoading: false,
      error: null,
    });
  });

  it('renders correctly when isOpen is true', () => {
    const { getByTestId } = renderComponent(true);
    expect(getByTestId('dialog-sign')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    const { queryByTestId } = renderComponent(false);
    expect(queryByTestId('dialog-sign')).not.toBeInTheDocument();
  });

  it('focuses on the email input when opened', () => {
    const { getByPlaceholderText } = renderComponent(true);
    expect(getByPlaceholderText('your email')).toHaveFocus();
  });
  it('handles sign in form submission', async () => {
    const handleClose = jest.fn();
  
    // Mock the window.location object
    delete window.location;
    window.location = { reload: jest.fn() };
  
    const { getByPlaceholderText, getByText } = render(<Dialog isOpen={true} handleClose={handleClose} />);
  
    fireEvent.change(getByPlaceholderText('your email'), { target: { value: 'test@example.com' } });
    fireEvent.click(getByText('Sign In'));
  
    await waitFor(() => expect(useSignIn().mutateAsync).toHaveBeenCalledWith({ email: 'test@example.com' }));
    expect(localStorage.getItem('crunch-userEmail')).toBe('test@example.com');
    expect(handleClose).toHaveBeenCalled();
    expect(window.location.reload).toHaveBeenCalled(); // Assert that reload is called
  });
  it('handles sign up form submission', async () => {
    const handleClose = jest.fn();
    const { getByPlaceholderText, getByText } = render(<Dialog isOpen={true} handleClose={handleClose} />);

    fireEvent.click(getByText('Sign Up'));
    fireEvent.change(getByPlaceholderText('your email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByPlaceholderText('your name'), { target: { value: 'Test User' } });
    fireEvent.click(getByText('Register'));

    await waitFor(() => expect(useCreateUser().mutateAsync).toHaveBeenCalledWith({ name: 'Test User', email: 'test@example.com' }));
    expect(localStorage.getItem('crunch-userEmail')).toBe('test@example.com');
    expect(handleClose).toHaveBeenCalled();
});
});
