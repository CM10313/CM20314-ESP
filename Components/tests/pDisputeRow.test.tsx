import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { useRouter } from 'next/router';
import DisputeRow, { DisputeRowProps } from '../pDisputeRow';

// Mock useRouter
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@mui/material', () => {
    const actual = jest.requireActual('@mui/material');
    return {
      ...actual,
      useMediaQuery: jest.fn(),
    };
  });

describe('DisputeRow component', () => {
    it('renders properly when isMobile is false', () => {
        const disputeRowProps: DisputeRowProps = {
            studyTitle: 'Test Study',
            publisher: 'Test Publisher',
            date: '2024-03-01',
            studyId: 'testId',
          };
      
          // Mock useRouter's push function
          (useRouter as jest.Mock).mockReturnValue({
            push: jest.fn(),
          });
      
          // Render the component
          render(<DisputeRow {...disputeRowProps} />);
      });
    
      it('renders properly when isMobile is true', () => {
        // Mock useMediaQuery to return true (indicating mobile view)
        require('@mui/material').useMediaQuery.mockReturnValue(true);
        const disputeRowProps: DisputeRowProps = {
            studyTitle: 'Test Study',
            publisher: 'Test Publisher',
            date: '2024-03-01',
            studyId: 'testId',
          };
      
          // Mock useRouter's push function
          (useRouter as jest.Mock).mockReturnValue({
            push: jest.fn(),
          });
      
          // Render the component
          render(<DisputeRow {...disputeRowProps} />);
      });

  it('navigates to review page when "Review" button is clicked', () => {
    const disputeRowProps: DisputeRowProps = {
      studyTitle: 'Test Study',
      publisher: 'Test Publisher',
      date: '2024-03-01',
      studyId: 'testId',
    };

    // Mock useRouter's push function
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });

    // Render the component
    const { getByText } = render(<DisputeRow {...disputeRowProps} />);

    // Click the "Review" button
    fireEvent.click(getByText('Review'));

    // Assert that useRouter's push function was called with the expected route
    expect(pushMock).toHaveBeenCalledWith('/review/testId');
  });
});
