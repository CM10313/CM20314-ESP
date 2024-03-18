import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Navbar from '../navbar';
import '@testing-library/jest-dom';

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn(),
}));
const navbarData = {
  name: "John Doe",
  rating: 4.2
}

describe('Navbar Component', () => {
  it('renders without crashing', () => {
    render(<Navbar name={navbarData.name} rating={navbarData.rating} accountType={''} />);
  });

  it('displays the correct menu items', () => {
    const { getByText } = render(<Navbar name={navbarData.name} rating={navbarData.rating} accountType={''} />);
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('History')).toBeInTheDocument();
  });

  it('displays the user name and StarIcon', () => {
    const {  getByTestId } = render(<Navbar name={navbarData.name} rating={navbarData.rating} accountType={''} />);
    expect(getByTestId('star-icon')).toBeInTheDocument();
  });
  it('displays the user name and StarIcon', () => {
    const { getByText} = render(<Navbar name={navbarData.name} rating={navbarData.rating} accountType={''} />);
    expect(getByText('John Doe')).toBeInTheDocument();
  });
  it('home link works', () => {
    const pushMock = jest.fn();
    const useRouterMock = jest.spyOn(require('next/router'), 'useRouter');
    useRouterMock.mockReturnValue({ push: pushMock });
    const { getByText } = render(<Navbar name={navbarData.name} rating={navbarData.rating} accountType={'researcher'} />);
    fireEvent.click(getByText('Home'));
    expect(pushMock).toHaveBeenCalledWith("/researcherHome");
  });
  it('history link works', () => {
    const pushMock = jest.fn();
    const useRouterMock = jest.spyOn(require('next/router'), 'useRouter');
    useRouterMock.mockReturnValue({ push: pushMock });
    const { getByText } = render(<Navbar name={navbarData.name} rating={navbarData.rating} accountType={'researcher'} />);
    fireEvent.click(getByText('History'));
    expect(pushMock).toHaveBeenCalledWith("/researcherHistory");
  });
});
