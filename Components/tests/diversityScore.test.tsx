import React from 'react';
import { render } from '@testing-library/react';
import OverallDiversityScore from '../diversityScore';
import '@testing-library/jest-dom';

describe('OverallDiversityScore Component', () => {
  it('renders with the provided score', () => {
    const score = 75; // Provide a sample score
    const { getByText } = render(<OverallDiversityScore score={score} />);
    const scoreElement = getByText(`${score} / 100`);
    expect(scoreElement).toBeInTheDocument();
    const titleElement = getByText('Overall Diversity Score');
    expect(titleElement).toBeInTheDocument();
  });
});
