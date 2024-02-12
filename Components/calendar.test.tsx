import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Calendar from './Calendar';
import '@testing-library/jest-dom';

test('renders calendar component', () => {
  const { getByText, getAllByTestId } = render(<Calendar />);
  
  // Check if the date is rendered
  const novemberText = getByText(/30th Nov/i);
  expect(novemberText).toBeInTheDocument();

  // Check if there are exactly three calendar cards
  const calendarCards = getAllByTestId('calendar-card');
  expect(calendarCards.length).toBe(3);

  // Check if each calendar card has correct details
  const cardDetails = [
    { id: 1, date: "2024-02-10T09:00:00", location: "1.1 West" },
    { id: 2, date: "2024-02-12T12:30:00", location: "2.1 West" },
    { id: 3, date: "2024-02-15T17:00:00", location: "1.1 South" }
  ];

  cardDetails.forEach((detail, index) => {
    const card = calendarCards[index];
    const idText = getByText(`ID: ${detail.id}`);
    const dateText = getByText(`Date: ${detail.date}`);
    const locationText = getByText(`Location: ${detail.location}`);
    expect(idText).toBeInTheDocument();
    expect(dateText).toBeInTheDocument();
    expect(locationText).toBeInTheDocument();

    // Check if each calendar card is clickable
    fireEvent.click(card);
    // Add your expectation for navigation or other functionality after clicking
  });
});
