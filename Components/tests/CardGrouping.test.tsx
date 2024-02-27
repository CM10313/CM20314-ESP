import React from 'react';
import { render } from '@testing-library/react';
import CardGrouper from '../CardGrouping';

describe('CardGrouper', () => {
  test('renders cards correctly', () => {
    const rowSpacing = 2;
    const numberOfItemsPerRow = 3;
    const cardInputList = [
      <div key={1}>Card 1</div>,
      <div key={2}>Card 2</div>,
      <div key={3}>Card 3</div>,
    ];

    const { container } = render(
      <CardGrouper
        rowSpacing={rowSpacing}
        numberOfItemsPerRow={numberOfItemsPerRow}
        cardInputList={cardInputList}
      />
    );

    // Check if all cards are rendered
    expect(container.querySelectorAll('.MuiGrid-item')).toHaveLength(cardInputList.length);


    // Check if items are distributed evenly across the rows
    
  });
});
