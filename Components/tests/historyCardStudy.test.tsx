import React from 'react';
import { render } from '@testing-library/react';
import HistoryCardsStudy from '../historyCardsStudy';
import '@testing-library/jest-dom';
describe('HistoryCardsStudy component', () => {
  it('renders without crashing', () => {
    // Mock props
    const props = {
      studyId: '123456',
      author: 'John Doe',
      date: '2024-03-01',
      title:'title',
    };

    // Render the component
    render(<HistoryCardsStudy {...props} />);

    // No need for assertions, if it renders without crashing, the test passes
  });

  it('displays the provided study information correctly', () => {
    // Mock props
    const props = {
      studyId: '123456',
      author: 'John Doe',
      date: '2024-03-01',
      title:'title',
    };

    // Render the component
    const { getByText } = render(<HistoryCardsStudy {...props} />);

    // Assert that the author name is displayed
    expect(getByText('John Doe')).toBeInTheDocument();

    // Assert that the study ID is displayed
    expect(getByText('#123456')).toBeInTheDocument();

    // Assert that the date is displayed
    expect(getByText('2024-03-01')).toBeInTheDocument();
  });
});
