import React from 'react';
import { render } from '@testing-library/react';
import Navbar from '../navbar';
import '@testing-library/jest-dom';


const navbarData = {
  name: "John Doe",
  rating: 4.2
}

describe('Navbar Component', () => {
  it('renders without crashing', () => {
    render(<Navbar name={navbarData.name} rating={navbarData.rating} />);
  });

  it('displays the correct menu items', () => {
    const { getByText } = render(<Navbar name={navbarData.name} rating={navbarData.rating} />);
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('History')).toBeInTheDocument();
    expect(getByText('Account')).toBeInTheDocument();
  });

  it('displays the user name and StarIcon', () => {
    const {  getByTestId } = render(<Navbar name={navbarData.name} rating={navbarData.rating} />);
    expect(getByTestId('star-icon')).toBeInTheDocument();
  });
  it('displays the user name and StarIcon', () => {
    const { getByText} = render(<Navbar name={navbarData.name} rating={navbarData.rating} />);
    expect(getByText('John Doe')).toBeInTheDocument();
  });
});
