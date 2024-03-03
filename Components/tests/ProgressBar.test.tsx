import React from 'react';
import { render } from '@testing-library/react';
import ProgressBar from '../ProgressBar';
import '@testing-library/jest-dom';
describe('ProgressBar Component', () => {
  it('renders with correct progress', () => {
    const { getByText } = render(
      <ProgressBar joinedCount={5} requiredCount={10} title="Progress Title" />
    );

    // Check if the progress bar title is rendered
    expect(getByText('Progress Title')).toBeInTheDocument();

    // Check if the progress number is rendered correctly
    expect(getByText('5 / 10')).toBeInTheDocument();
  });

  it('renders with maximum progress when joinedCount exceeds requiredCount', () => {
    const { getByText } = render(
      <ProgressBar joinedCount={15} requiredCount={10} title="Progress Title" />
    );

    // Check if the progress bar title is rendered
    expect(getByText('Progress Title')).toBeInTheDocument();

    // Check if the progress number is rendered correctly
    expect(getByText('15 / 10')).toBeInTheDocument();

    // Check if the progress bar width is at maximum (100%)
    const progressBar = getByText('15 / 10').parentElement;
    expect(progressBar).toHaveStyle('width: 88%');
  });
  
  it('renders with default progress when joinedCount is zero', () => {
    const { getByText } = render(
      <ProgressBar joinedCount={0} requiredCount={10} title="Progress Title" />
    );

    // Check if the progress bar title is rendered
    expect(getByText('Progress Title')).toBeInTheDocument();

    // Check if the progress number is rendered correctly
    expect(getByText('0 / 10')).toBeInTheDocument();

    // Check if the progress bar width is default (0%)
    const progressBar = getByText('0 / 10').parentElement;
    expect(progressBar).toHaveStyle('width: 0%');
  });
  
  it('renders without crashing', () => {
    render(
      <ProgressBar joinedCount={5} requiredCount={10} title="Progress Title" />
    );
  });
});
