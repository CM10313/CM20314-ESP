import React from 'react';
import { render } from '@testing-library/react';
import TriangleBackground from './TriangleBackground';

describe('Triangle Backgroud Component', () => {
    it('renders without crashing', () => {
      render(<TriangleBackground  />);
    });
});