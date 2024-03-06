import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import BarGraph from '../barGraphs';
import HorizontalBarGraph from '../horizontalBarGraph';

// Mock data
export const mockGraphData = {
    yAxisLabels: [5,10,15,30],
    xAxisLabels: [
        "White-British",
        "Black-British",
        "White-Irish",
        "other",
    ],
    title: "Race",
    studyId: "#123456",
    hasData: true
}

const mockGraphDataWithoutData = {
    yAxisLabels: [],
    xAxisLabels: [],
    title: "No Data",
    studyId: "#654321",
    hasData: false
}

jest.mock('react-chartjs-2', () => ({
    Bar: ({ data }: { data: { labels: string[] } }) => (
        <div>
            {data.labels.map((label, index) => (
                <div key={index}>{label}</div>
            ))}
        </div>
    )
}));
describe('DonughtChart Component', () => {
    it('renders without crashing', () => {
    const { getByText } = render(
        <HorizontalBarGraph graphData={mockGraphData} />
    );

    // Check if the title is rendered correctly
    const titleElement = getByText(mockGraphData.title);
    expect(titleElement).toBeInTheDocument();

    // Check if study ID is rendered correctly
    const studyIdElement = getByText('#123456');
    expect(studyIdElement).toBeInTheDocument();

    // Check if the labels are rendered correctly
    mockGraphData.xAxisLabels.forEach(label => {
        const labelElement = getByText(label);
        expect(labelElement).toBeInTheDocument();
    });
    });


it('renders invalid message component if no data', () => {
    const { getByText } = render(
        <HorizontalBarGraph graphData={mockGraphDataWithoutData} />
    );
    // Check if the message is rendered correctly
    const messageElement = getByText(
        'When this advert was created you did not enable tracking for this metric. ' +
        'If in future you wish to see this, enable this feature when creating your advert.'
    );
    expect(messageElement).toBeInTheDocument();
    });
});