// Import your component and useRouter hook

import { render, fireEvent } from '@testing-library/react';
import LoginForm from '../pages/login';
import '@testing-library/jest-dom';
// Mock the useRouter hook
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));
jest.mock('@mui/material', () => {
    const actual = jest.requireActual('@mui/material');
    return {
      ...actual,
      useMediaQuery: jest.fn(),
    };
  });
describe('renders login page', () => {
  it('renders without crashing', () => {
    render(<LoginForm />);
  });
  it('calls on submit properly', () => {
    const { getByText } = render(
        <LoginForm/>
      );
    fireEvent.click(getByText('Login'));
  });
  it('calls register properly', () => {
    const pushMock = jest.fn();
    const useRouterMock = jest.spyOn(require('next/router'), 'useRouter');
    useRouterMock.mockReturnValue({ push: pushMock });
    const { getByText } = render(
        <LoginForm/>
      );
    fireEvent.click(getByText('Register here'));
    expect(pushMock).toHaveBeenCalledWith("/register");
  });
  it('calls login properly', () => {
    const pushMock = jest.fn();
    const useRouterMock = jest.spyOn(require('next/router'), 'useRouter');
    useRouterMock.mockReturnValue({ push: pushMock });
    const { getByText } = render(
        <LoginForm/>
      );
    fireEvent.click(getByText('Login'));
    expect(pushMock).toHaveBeenCalledWith("/researchHome");
  });
  it('updates the username state when a key is pressed in the username field', () => {
    const { getByLabelText } = render(<LoginForm />);
    const usernameInput = getByLabelText('Username') as HTMLInputElement; // Cast to HTMLInputElement

    // Simulate typing in the password field
    fireEvent.change(usernameInput, { target: { value: 'newUsername' } });

    // Check if the password state is updated
    expect(usernameInput.value).toBe('newUsername');
  });
  it('updates the password state when a key is pressed in the password field', () => {
    const { getByLabelText } = render(<LoginForm />);
    const passwordInput = getByLabelText('Password') as HTMLInputElement; // Cast to HTMLInputElement

    // Simulate typing in the password field
    fireEvent.change(passwordInput, { target: { value: 'newPassword' } });

    // Check if the password state is updated
    expect(passwordInput.value).toBe('newPassword');
  });
  it('displays the password input field', () => {
    const { getByLabelText } = render(<LoginForm />);
    expect(getByLabelText('Password')).toBeInTheDocument();
  });
  it('displays the username input field', () => {
    const { getByLabelText } = render(<LoginForm />);
    expect(getByLabelText('Username')).toBeInTheDocument();
  });
  it('displays password error when an incorrect password is entered', () => {
    const { getByLabelText, getByText } = render(<LoginForm  />);
    const passwordInput = getByLabelText('Password');

    // Enter an incorrect password
    fireEvent.change(passwordInput, { target: { value: '123' } });

    // Check if the error message is displayed
    expect(getByText('Invalid Password')).toBeInTheDocument();
  });
  it('displays nothing when a correct password is entered', () => {
    const { getByLabelText, queryByText } = render(
      <LoginForm  />
    );
    const passwordInput = getByLabelText('Password');
  
    // Enter a valid password
    fireEvent.change(passwordInput, { target: { value: 'valdiPassword!1' } });
  
    // Check if the error message is not displayed
    expect(queryByText('Invalid Password')).toBeNull();
  });
  it('displays username error when an incorrect password is entered', () => {
    const { getByLabelText, getByText } = render(<LoginForm  />);
    const usernameInput = getByLabelText('Username');

    // Enter an incorrect username
    fireEvent.change(usernameInput, { target: { value: '123' } });

    // Check if the error message is displayed
    expect(getByText('Invalid Username')).toBeInTheDocument();
  });
  it('displays nothing when a correct username is entered', () => {
    const { getByLabelText, queryByText } = render(
      <LoginForm  />
    );
    const usernameInput = getByLabelText('Username');
  
    // Enter a valid password
    fireEvent.change(usernameInput, { target: { value: 'MYUsername' } });
  
    // Check if the error message is not displayed
    expect(queryByText('Invalid Username')).toBeNull();
  });
  it('renders properly when isMobile is false', () => {
    const { getByText } = render(<LoginForm />);
    fireEvent.click(getByText('Login'));
  });
  it('renders properly when isMobile is true', () => {
    // Mock useMediaQuery to return true (indicating mobile view)
    require('@mui/material').useMediaQuery.mockReturnValue(true);

    const { getByText } = render(<LoginForm />);
    fireEvent.click(getByText('Login'));
  });
});