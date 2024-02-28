import React from 'react';
import { render } from '@testing-library/react';
import DonughtChart from '../donughtChart';
import '@testing-library/jest-dom';
const mockGraphDataWithoutData = {
    yAxisLabels: [],
    xAxisLabels: [],
    title: "No Data",
    studyId: "#654321",
    hasData: false
}
describe('DonughtChart Component', () => {
  it('renders without crashing', () => {
    const graphData = {
      xAxisLabels: ['A', 'B', 'C', 'D', 'E'],
      yAxisLabels: [20, 30, 10, 25, 15],
      title: 'Sample Doughnut Chart',
      hasData: true,
    };
    render(<DonughtChart graphData={graphData} />);
  });

  it('renders invalid message component if no data', () => {
    const { getByText } = render(
        <DonughtChart graphData={mockGraphDataWithoutData} />
    );
    // Check if the message is rendered correctly
    const messageElement = getByText(
        'When this advert was created you did not enable tracking for this metric. ' +
        'If in future you wish to see this, enable this feature when creating your advert.'
    );
    expect(messageElement).toBeInTheDocument();
});

  // You can write more tests for specific functionality as needed
});
