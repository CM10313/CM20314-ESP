import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Calendar from './calendar';

test('renders calendar component', () => {
  const { getByText, queryByText, getAllByTestId } = render(<Calendar />);
  
  // Check if the date is rendered
  const novemberText = queryByText(/30th Nov/i);
  expect(novemberText).toBeTruthy();

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
    const idText = getByText(`ID: ${detail.id}`);
    const dateText = getByText(`Date: ${detail.date}`);
    const locationText = getByText(`Location: ${detail.location}`);
    expect(idText).toBeTruthy();
    expect(dateText).toBeTruthy();
    expect(locationText).toBeTruthy();

    // Check if each calendar card is clickable
    const card = calendarCards[index];
    fireEvent.click(card);
    // Add your expectation for navigation or other functionality after clicking
  });
});
