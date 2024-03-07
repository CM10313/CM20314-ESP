import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import DemoGraphicDisplay, { DemoGraphicDisplayProps } from '../DempographicDisplay';

describe('DemoGraphicDisplay Component', () => {
  const mockProps: DemoGraphicDisplayProps = {
    hasAge: true,
    hasFaculty: true,
    hasGender: true,
    hasIncome: true,
    hasOccupation: true,
    hasRace: true,
    hasReligion: true,
    hasSexuality: true,
    hasYOFS: true,
    hasHLOFE: true,
    age: "18",
    hlofe: "A Level",
    yofs: "2",
    faculty: "Computer Science",
    gender: "Male",
    sexuality: "Heterosexual",
    race: "White",
    religion: "None",
    income: "0",
    occupation: "Student",
  };
  const falseMockProps: DemoGraphicDisplayProps = {
    hasAge: false,
    hasFaculty: false,
    hasGender: false,
    hasIncome: false,
    hasOccupation: false,
    hasRace: false,
    hasReligion: false,
    hasSexuality: false,
    hasYOFS: false,
    hasHLOFE: false,
    age: "18",
    hlofe: "A Level",
    yofs: "2",
    faculty: "Computer Science",
    gender: "Male",
    sexuality: "Heterosexual",
    race: "White",
    religion: "None",
    income: "0",
    occupation: "Student",
  };

  it('renders without crashing', () => {
    render(<DemoGraphicDisplay {...mockProps} />);
  });
  it('renders without crashing when all props are false', () => {
    render(<DemoGraphicDisplay {...falseMockProps} />);
  });


  it('displays correct content based on props', () => {
    const { getByText } = render(<DemoGraphicDisplay {...mockProps} />);
    
    expect(getByText('Age')).toBeInTheDocument();
    expect(getByText('Faculty')).toBeInTheDocument();
    expect(getByText('Gender')).toBeInTheDocument();
    expect(getByText('Income')).toBeInTheDocument();
    expect(getByText('Occupation')).toBeInTheDocument();
    expect(getByText('Race')).toBeInTheDocument();
    expect(getByText('Religion')).toBeInTheDocument();
    expect(getByText('Sexuality')).toBeInTheDocument();
    expect(getByText('Year of Studies')).toBeInTheDocument();
    expect(getByText('Highest Level of Education')).toBeInTheDocument();

    expect(getByText('18')).toBeInTheDocument(); 
    expect(getByText('A Level')).toBeInTheDocument(); 
    expect(getByText('2')).toBeInTheDocument(); 
    expect(getByText('Computer Science')).toBeInTheDocument(); 
    expect(getByText('Male')).toBeInTheDocument(); 
    expect(getByText('Heterosexual')).toBeInTheDocument(); 
    expect(getByText('White')).toBeInTheDocument(); 
    expect(getByText('None')).toBeInTheDocument(); 
    expect(getByText('0')).toBeInTheDocument(); 
    expect(getByText('Student')).toBeInTheDocument();
  });
});
