import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Calendar from '../Calendar';



// Mock useRouter
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));
const cardInputList = [
  { borderColor: 'red', publisher: 'Publisher 1', location: 'Location 1', date: 'Date 1', title: 'Title 1', id: '1' },
  { borderColor: 'blue', publisher: 'Publisher 2', location: 'Location 2', date: 'Date 2', title: 'Title 2', id: '2' },
  { borderColor: 'green', publisher: 'Publisher 3', location: 'Location 3', date: 'Date 3', title: 'Title 3', id: '3' },
];
const promiseCardInputList = Promise.resolve([
  { borderColor: 'red', publisher: 'Publisher 1', location: 'Location 1', date: 'Date 1', title: 'Title 1', id: '1' },
  { borderColor: 'blue', publisher: 'Publisher 2', location: 'Location 2', date: 'Date 2', title: 'Title 2', id: '2' },
  { borderColor: 'green', publisher: 'Publisher 3', location: 'Location 3', date: 'Date 3', title: 'Title 3', id: '3' },
]);
describe('Calendar component', () => {
  it('renders date', () => {
    const { getByText } = render(<Calendar cardInputList={cardInputList}/>);
    const novemberText = getByText("30th");
    expect(novemberText).toBeInTheDocument();
  });

  it('renders three calendar cards', () => {
    const { getAllByTestId } = render(<Calendar cardInputList={cardInputList}/>);
    const calendarCards = getAllByTestId('calendar-card');
    expect(calendarCards.length).toBe(3);
  });

  it('renders card details for each item in cardDetails', () => {
    const cardDetails = [
      { id: 1, date: "13/09/23", location: "1.1 West", priority: "high" },
      { id: 2, date: "13/09/23", location: "2.1 West", priority: "low" },
      { id: 3, date: "13/09/23", location: "1.1 South", priority: "low" }
    ];

    const { getAllByTestId, getByText } = render(<Calendar cardInputList={cardInputList}/>);
    const calendarCards = getAllByTestId('calendar-card');

    cardInputList.forEach((detail, index) => {
      const card = calendarCards[index];
      const titleText = getByText(detail.title);
      expect(titleText).toBeInTheDocument();

      fireEvent.click(card);
      // Add expectation for navigation or other functionality after clicking
    });
  });
  it('renders card list from resolved promise', async () => {
    const { getAllByTestId, getByText } = render(<Calendar cardInputList={promiseCardInputList} />);
    const calendarCards = await waitFor(() => getAllByTestId('calendar-card'));

    expect(calendarCards.length).toBe(3);

    const publisherText = getByText('Publisher 1');
    const locationText = getByText('Location 1');
    const dateText = getByText('Date 1');
    const titleText = getByText('Title 1');
    const idText = getByText('1');

    expect(publisherText).toBeInTheDocument();
    expect(locationText).toBeInTheDocument();
    expect(dateText).toBeInTheDocument();
    expect(titleText).toBeInTheDocument();
    expect(idText).toBeInTheDocument();
  });
});