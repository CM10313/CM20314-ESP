import React from 'react';
import { render } from '@testing-library/react';
import Navbar from './navbar';
import '@testing-library/jest-dom';
describe('Navbar Component', () => {
  it('renders without crashing', () => {
    render(<Navbar />);
  });

  it('displays the correct menu items', () => {
    const { getByText } = render(<Navbar />);
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('History')).toBeInTheDocument();
    expect(getByText('Account')).toBeInTheDocument();
  });

  it('displays the user name and StarIcon', () => {
    const {  getByTestId } = render(<Navbar />);
    expect(getByTestId('star-icon')).toBeInTheDocument();
  });
  it('displays the user name and StarIcon', () => {
    const { getByText} = render(<Navbar />);
    expect(getByText('John Doe')).toBeInTheDocument();
  });
});
