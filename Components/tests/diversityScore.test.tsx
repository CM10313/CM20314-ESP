import React from 'react';
import { render } from '@testing-library/react';
import OverallDiversityScore from '../diversityScore';
import '@testing-library/jest-dom';

describe('OverallDiversityScore Component', () => {
  it('renders with the provided score', () => {
    const { getByText } = render(<OverallDiversityScore id={"test"} />);
    const scoreElement = getByText("If you do not see any data for a graph you have enabled this could be for two reasons.");
    expect(scoreElement).toBeInTheDocument();
  });
});
