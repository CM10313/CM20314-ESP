import React from 'react';
import { render } from '@testing-library/react';
import SentenceGrid from '../Ethics/SentenceGrid';
import '@testing-library/jest-dom';
describe('SentenceGrid component', () => {
  it('renders without crashing', () => {
    render(
      <SentenceGrid
        sentences={['First sentence', 'Second sentence']}
        rowSpacing={10}
        numberOfItemsPerRow={2}
      />
    );
  });

  it('renders sentences correctly', () => {
    const sentences = ['First sentence', 'Second sentence'];
    const { getByText } = render(
      <SentenceGrid
        sentences={sentences}
        rowSpacing={10}
        numberOfItemsPerRow={2}
      />
    );

    expect(getByText("First sentence")).toBeInTheDocument();
    });
  

  it('does not render anything when sentences prop is empty', () => {
    const { queryByText } = render(
      <SentenceGrid
        sentences={[]}
        rowSpacing={10}
        numberOfItemsPerRow={2}
      />
    );

    expect(queryByText(/-/)).not.toBeInTheDocument();
  });
});
