import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import BarGraph from './barGraphs';

// Mock data
const mockGraphData = {
    yAxisLabels: [1, 2, 3, 60, 3, 6],
    xAxisLabels: [
        "0 - 10",
        "11 - 15",
        "16 - 20",
        "21 - 25",
        "25 - 30",
        "30 +"
    ],
    title: "Income",
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

test('renders bar graph component', () => {
    const { getByText } = render(
        <BarGraph graphData={mockGraphData} />
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

test('renders bar graph component without data', () => {
    const { getByText } = render(
        <BarGraph graphData={mockGraphDataWithoutData} />
    );

    // Check if the message is rendered correctly
    const messageElement = getByText(
        'When this advert was created you did not enable tracking for this metric. ' +
        'If in future you wish to see this, enable this feature when creating your advert.'
    );
    expect(messageElement).toBeInTheDocument();
});
