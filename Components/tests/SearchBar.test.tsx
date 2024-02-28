import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import SearchBar from '../SearchBar';
import '@testing-library/jest-dom';

describe('Search Bar Component', () => {
  it('renders without crashing', () => {
    render(<SearchBar onReturn={() => {}} />);
  });
  it('updates the search state when a key is pressed in the password field', () => {
    const { getByPlaceholderText } = render(<SearchBar onReturn={() => {}} />);
    const searchInput = getByPlaceholderText('Search');
    // Simulate typing in the password field
    fireEvent.change(searchInput, { target: { value: 'newSearch' } });

    // Check if the password state is updated
    expect(searchInput).toHaveValue('newSearch');
  });
  it('triggers onReturn callback with search value when Enter key is pressed', () => {
    // Mock the callback function
    const mockOnReturn = jest.fn();

    // Render the SearchBar component
    const { getByPlaceholderText } = render(<SearchBar onReturn={mockOnReturn} />);

    // Simulate typing in the search input field
    const searchInput = getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'test' } });

    // Simulate pressing the Enter key
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });

    // Check if the onReturn callback is called with the correct search value
    expect(mockOnReturn).toHaveBeenCalledWith('test');
  });

  it('triggers onReturn callback with search value when search button is clicked', () => {
    // Mock the callback function
    const mockOnReturn = jest.fn();

    // Render the SearchBar component
    const { getByPlaceholderText, getByTestId } = render(<SearchBar onReturn={mockOnReturn} />);

    // Simulate typing in the search input field
    const searchInput = getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'test' } });

    // Click the search button
    const searchIcon = getByTestId('search-icon');
    fireEvent.click(searchIcon);

    // Check if the onReturn callback is called with the correct search value
    expect(mockOnReturn).toHaveBeenCalledWith('test');
  });
});

