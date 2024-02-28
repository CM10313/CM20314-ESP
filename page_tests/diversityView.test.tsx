import { render, fireEvent } from '@testing-library/react';
import LoginForm from '../pages/login';
import '@testing-library/jest-dom';
import DiversityView from '../pages/diversityView';
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
describe('diversity page', () => {
  it('renders properly when isMobile is false', () => {
    render(<DiversityView/>);
  });
  it('renders properly when isMobile is true', () => {
    // Mock useMediaQuery to return true (indicating mobile view)
    require('@mui/material').useMediaQuery.mockReturnValue(true);

    const { getByText } = render(<DiversityView/>);
    fireEvent.click(getByText('John Doe'));
  });
});