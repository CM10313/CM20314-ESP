import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { FeedbackViewingContainerProps, FeedbackViewingContainer, FeedbackListViewer } from '../Ethics/RatingFeedBackViewer';
import '@testing-library/jest-dom';

describe('FeedbackViewingContainer component', () => {
  const mockFeedback: FeedbackViewingContainerProps = {
    description: 'Test description',
    name: 'Test Name',
    rating: 3.5,
  };

  it('renders correctly with provided props', () => {
    const handleNextMock = jest.fn();
    const handlePrevMock = jest.fn();
    const { getByText } = render(<FeedbackViewingContainer {...mockFeedback} handleNext={handleNextMock} handlePrev={handlePrevMock} />);
    
    expect(getByText("Test description")).toBeInTheDocument();
  });

  it('calls handleNext when next arrow is clicked', () => {
    const handleNextMock = jest.fn();
    const handlePrevMock = jest.fn();
    const { getByTestId } = render(<FeedbackViewingContainer {...mockFeedback} handleNext={handleNextMock} handlePrev={handlePrevMock} />);
    
    fireEvent.click(getByTestId('next-button'));
    expect(handleNextMock).toHaveBeenCalledTimes(1);
  });

  it('calls handlePrev when previous arrow is clicked', () => {
    const handleNextMock = jest.fn();
    const handlePrevMock = jest.fn();
    const { getByTestId } = render(<FeedbackViewingContainer {...mockFeedback} handleNext={handleNextMock} handlePrev={handlePrevMock} />);
    
    fireEvent.click(getByTestId('prev-button'));
    expect(handlePrevMock).toHaveBeenCalledTimes(1);
  });
});

describe('FeedbackListViewer component', () => {
  const mockFeedbackList: FeedbackViewingContainerProps[] = [
    {
      description: 'Test description',
      name: 'Test Name 1',
      rating: 3.5,
    },
    {
        description: 'Test description 1',
        name: 'Test Name 1',
        rating: 3.5,
      },
      {
        description: 'Test description 2',
        name: 'Test Name 1',
        rating: 3.5,
      },

  ];

  it('renders correctly with provided feedback list', () => {
    const { getByText } = render(<FeedbackListViewer feedbackList={mockFeedbackList} />);
    
    expect(getByText("Test description")).toBeInTheDocument();
  });
  it('renders correctly when no feedback list', () => {
    const { queryByText } = render(<FeedbackListViewer feedbackList={undefined} />);
    expect(queryByText("Test description")).not.toBeInTheDocument();
  });

  it('cycles through feedback items when next button is clicked', () => {
    const { getByTestId,getByText } = render(<FeedbackListViewer feedbackList={mockFeedbackList} />);
    
    fireEvent.click(getByTestId('next-button'));
    expect(getByText("Test description 1")).toBeInTheDocument();
  });

  it('cycles through feedback items when previous button is clicked', () => {
    const { getByTestId,getByText } = render(<FeedbackListViewer feedbackList={mockFeedbackList} />);
    fireEvent.click(getByTestId('next-button'));
    fireEvent.click(getByTestId('prev-button'));
    expect(getByText("Test description")).toBeInTheDocument();
  });
});
