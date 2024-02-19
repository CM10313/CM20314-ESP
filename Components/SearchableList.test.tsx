import { fireEvent, render } from '@testing-library/react';
import SearchableList from './SearchableList';
import StudyMediumCard from './StudyMediumCard';
import '@testing-library/jest-dom';

describe('SearchableList Component', () => {
    it('searches an empty search', () => {
        // Prepare some mock card items
        const cardInputList = [
            <StudyMediumCard
            key="0"
            name="first"
            rating={3.8}
            pfp=""
            title="title 1"
            link=""
            borderColour="#1F5095"
            onCardClick={(title:string)=>{}}
          />, <StudyMediumCard
          key="1"
          name="second"
          rating={3.8}
          pfp=""
          title="title 2"
          link=""
          borderColour="#1F5095"
          onCardClick={(title:string)=>{}}
        />, <StudyMediumCard
        key="2"
        name="third"
        rating={2.9}
        pfp=""
        title="title 3"
        link=""
        borderColour="#1F5095"
        onCardClick={(title:string)=>{}}
      />
        ];
    
        // Render the SearchableList component
        const { getByPlaceholderText, getByText,getByTestId } = render(
          <SearchableList
            rowSpacing={1}
            cardInputList={cardInputList}
            numberOfItemsPerRow={2}
            width={500}
            title="Title"
            titleSize={20}
            marginTop={10}
          />
        );
    
        // Simulate typing in the search input field
        const searchInput = getByPlaceholderText('Search');
        fireEvent.change(searchInput, { target: { value: '' } });
        const searchIcon = getByTestId('search-icon');
        fireEvent.click(searchIcon);
    
        // Check if the items containing 'Item' in their titles are rendered
        expect(getByText('first')).toBeInTheDocument();
        expect(getByText('second')).toBeInTheDocument();
        expect(getByText('third')).toBeInTheDocument();
      });
    
    
      it('searches by name', () => {
        // Prepare some mock card items
        const cardInputList = [
            <StudyMediumCard
            key="0"
            name="first"
            rating={3.8}
            pfp=""
            title="title 1"
            link=""
            borderColour="#1F5095"
            onCardClick={(title:string)=>{}}
          />, <StudyMediumCard
          key="1"
          name="second"
          rating={3.8}
          pfp=""
          title="title 2"
          link=""
          borderColour="#1F5095"
          onCardClick={(title:string)=>{}}
        />, <StudyMediumCard
        key="2"
        name="third"
        rating={2.9}
        pfp=""
        title="title 3"
        link=""
        borderColour="#1F5095"
        onCardClick={(title:string)=>{}}
      />
        ];
    
        // Render the SearchableList component
        const { getByPlaceholderText, getByText,getByTestId } = render(
          <SearchableList
            rowSpacing={1}
            cardInputList={cardInputList}
            numberOfItemsPerRow={2}
            width={500}
            title="Title"
            titleSize={20}
            marginTop={10}
          />
        );
    
        // Simulate typing in the search input field
        const searchInput = getByPlaceholderText('Search');
        fireEvent.change(searchInput, { target: { value: 'first' } });
        const searchIcon = getByTestId('search-icon');
        fireEvent.click(searchIcon);
    
        // Check if the items containing 'Item' in their titles are rendered
        expect(getByText('first')).toBeInTheDocument();
      });
  it('renders without crashing', () => {
    render(
      <SearchableList
        rowSpacing={1}
        cardInputList={[]}
        numberOfItemsPerRow={2}
        width={500}
        title="Title"
        titleSize={20}
        marginTop={10}
      />
    );
  });

  it('searches by title', () => {
    // Prepare some mock card items
    const cardInputList = [
        <StudyMediumCard
        key="0"
        name="first"
        rating={3.8}
        pfp=""
        title="title 1"
        link=""
        borderColour="#1F5095"
        onCardClick={(title:string)=>{}}
      />, <StudyMediumCard
      key="1"
      name="second"
      rating={3.8}
      pfp=""
      title="title 2"
      link=""
      borderColour="#1F5095"
      onCardClick={(title:string)=>{}}
    />, <StudyMediumCard
    key="2"
    name="third"
    rating={2.9}
    pfp=""
    title="title 3"
    link=""
    borderColour="#1F5095"
    onCardClick={(title:string)=>{}}
  />
    ];

    // Render the SearchableList component
    const { getByPlaceholderText, getByText,getByTestId } = render(
      <SearchableList
        rowSpacing={1}
        cardInputList={cardInputList}
        numberOfItemsPerRow={2}
        width={500}
        title="Title"
        titleSize={20}
        marginTop={10}
      />
    );

    // Simulate typing in the search input field
    const searchInput = getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'title 1' } });
    const searchIcon = getByTestId('search-icon');
    fireEvent.click(searchIcon);

    // Check if the items containing 'Item' in their titles are rendered
    expect(getByText('title 1')).toBeInTheDocument();
  });
  it('searches by rating', () => {
    // Prepare some mock card items
    const cardInputList = [
        <StudyMediumCard
        key="0"
        name="first"
        rating={3.8}
        pfp=""
        title="Consectetur adipiscing elit"
        link=""
        borderColour="#1F5095"
        onCardClick={(title:string)=>{}}
      />, <StudyMediumCard
      key="1"
      name="second"
      rating={3.8}
      pfp=""
      title="Consectetur adipiscing elit"
      link=""
      borderColour="#1F5095"
      onCardClick={(title:string)=>{}}
    />, <StudyMediumCard
    key="2"
    name="third"
    rating={2.9}
    pfp=""
    title="Consectetur adipiscing elit"
    link=""
    borderColour="#1F5095"
    onCardClick={(title:string)=>{}}
  />
    ];

    // Render the SearchableList component
    const { getByPlaceholderText, getByText,getByTestId } = render(
      <SearchableList
        rowSpacing={1}
        cardInputList={cardInputList}
        numberOfItemsPerRow={2}
        width={500}
        title="Title"
        titleSize={20}
        marginTop={10}
      />
    );

    // Simulate typing in the search input field
    const searchInput = getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: '3' } });
    const searchIcon = getByTestId('search-icon');
    fireEvent.click(searchIcon);

    // Check if the items containing 'Item' in their titles are rendered
    expect(getByText('first')).toBeInTheDocument();
    expect(getByText('second')).toBeInTheDocument();
  });

  // You can add more test cases to cover other functionalities such as handling different screen sizes, etc.
});
