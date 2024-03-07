import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import StudyMediumCard from '../StudyMediumCard';
import userEvent from '@testing-library/user-event';

describe('Study Medium Card Component', () => {
    it('renders without crashing', () => {
      render(<StudyMediumCard name={''} rating={0} title={''} borderColour={''} onCardClick={() => { } } department={''} id={''} publisherId={''}  />);
    });
    it('clickng card calls router function', () => {
        const onCardClickMock = jest.fn();

        const { getByText } = render(
          <StudyMediumCard
            name=""
            rating={0}
            title="Card Title"
            borderColour=""
            onCardClick={onCardClickMock}
            department={'test department'} id={'test id'} publisherId={'test pub id'}          />
        );
    
        // Click the card action area
        fireEvent.click(getByText('Card Title'));
    
        // Check if the onCardClick function is called
        expect(onCardClickMock).toHaveBeenCalledTimes(1);
        expect(onCardClickMock).toHaveBeenCalledWith("test id", "test pub id","test department" );
      });
});