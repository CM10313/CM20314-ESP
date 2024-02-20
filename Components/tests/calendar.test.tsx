import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Calendar from '../calendar';


// Mock useRouter
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

describe('Calendar component', () => {
  it('renders date', () => {
    const { getByText } = render(<Calendar />);
    const novemberText = getByText(/30th Nov/i);
    expect(novemberText).toBeInTheDocument();
  });

  it('renders three calendar cards', () => {
    const { getAllByTestId } = render(<Calendar />);
    const calendarCards = getAllByTestId('calendar-card');
    expect(calendarCards.length).toBe(3);
  });

  it('renders card details for each item in cardDetails', () => {
    const cardDetails = [
      { id: 1, date: "13/09/23", location: "1.1 West", priority: "high" },
      { id: 2, date: "13/09/23", location: "2.1 West", priority: "low" },
      { id: 3, date: "13/09/23", location: "1.1 South", priority: "low" }
    ];

    const { getAllByTestId, getByText } = render(<Calendar />);
    const calendarCards = getAllByTestId('calendar-card');

    cardDetails.forEach((detail, index) => {
      const card = calendarCards[index];
      const idText = getByText(`Study ${detail.id}`);
      expect(idText).toBeInTheDocument();

      fireEvent.click(card);
      // Add expectation for navigation or other functionality after clicking
    });
  });
});