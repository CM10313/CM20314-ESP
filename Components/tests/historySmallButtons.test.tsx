import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import HistorySmallButtons, { smallButtonProps } from '../historySmallButtons';


describe('HistorySmallButtons component', () => {
  it('renders without crashing', () => {
    const smallButtonPropsData: smallButtonProps = {
      background: '#1870A0',
      title: 'Review',
      fx: jest.fn(),
    };

    // Render the component
    render(<HistorySmallButtons {...smallButtonPropsData} />);

    // No need for assertions, if it renders without crashing, the test passes
  });

  it('calls the provided function when button is clicked', () => {
    const onClickMock = jest.fn();
    const smallButtonPropsData: smallButtonProps = {
      background: '#1870A0',
      title: 'Review',
      fx: onClickMock,
    };

    // Render the component
    const { getByText } = render(<HistorySmallButtons {...smallButtonPropsData} />);

    // Click the button
    fireEvent.click(getByText('Review'));

    // Assert that the provided function is called
    expect(onClickMock).toHaveBeenCalled();
  });
});
