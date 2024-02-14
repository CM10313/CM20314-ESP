// Import your component and useRouter hook

import { render, fireEvent } from '@testing-library/react';
import HomePage from '../pages';

// Mock the useRouter hook
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('renders index page', () => {
  it('renders without crashing', () => {
    render(<HomePage />);
  });
});