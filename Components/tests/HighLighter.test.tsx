import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HighlightDetector from '../Ethics/Highlighter.sx';

describe('HighlightDetector component', () => {
    test('highlights and shows comment box on click', async () => {
        const { getByText, getByPlaceholderText } = render(<HighlightDetector />);

        const sampleText = 'This is a highlighted text.';
        const span = document.createElement('span');
        span.textContent = sampleText;
        document.body.appendChild(span);

        fireEvent.click(span);

        // Assert that the comment box is visible
        await waitFor(() => {
            expect(getByText('Leave a comment')).toBeInTheDocument();
            expect(getByPlaceholderText('Type your comment here...')).toBeInTheDocument();
        });

        // Add more assertions as needed
    });

    test('submits a comment and hides the comment box', async () => {
        const { getByText, getByPlaceholderText, queryByText } = render(<HighlightDetector />);

        const sampleText = 'This is a highlighted text.';
        const span = document.createElement('span');
        span.textContent = sampleText;
        document.body.appendChild(span);

        fireEvent.click(span);

        // Add a comment
        const commentInput = getByPlaceholderText('Type your comment here...');
        fireEvent.change(commentInput, { target: { value: 'A test comment' } });

        // Submit the comment
        fireEvent.click(getByText('Submit'));

        // Assert that the comment box is hidden
        await waitFor(() => {
            expect(queryByText('Leave a comment')).not.toBeInTheDocument();
        });
    });
});