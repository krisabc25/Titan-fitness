import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../src/screens/LoginScreen';
import ApiService from '../src/services/api';

jest.mock('../src/services/api');

describe('LoginScreen', () => {
  const mockNavigation = {
    navigate: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render login form', () => {
    const { getByPlaceholderText, getByText } = render(
      <LoginScreen navigation={mockNavigation} />
    );

    expect(getByPlaceholderText('Email')).toBeDefined();
    expect(getByPlaceholderText('Password')).toBeDefined();
    expect(getByText('Login')).toBeDefined();
  });

  it('should show error when fields are empty', async () => {
    const { getByText } = render(
      <LoginScreen navigation={mockNavigation} />
    );

    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(getByText('Please fill in all fields')).toBeDefined();
    });
  });

  it('should call loginUser when form is submitted', async () => {
    ApiService.loginUser.mockResolvedValue({ token: 'test-token' });

    const { getByPlaceholderText, getByText } = render(
      <LoginScreen navigation={mockNavigation} />
    );

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(ApiService.loginUser).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  it('should navigate to Home on successful login', async () => {
    ApiService.loginUser.mockResolvedValue({ token: 'test-token' });

    const { getByPlaceholderText, getByText } = render(
      <LoginScreen navigation={mockNavigation} />
    );

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith('Home');
    });
  });
});
