import { fireEvent, render } from '@testing-library/react';
import SearchableList from '../SearchableList';
import StudyMediumCard from '../StudyMediumCard';
import '@testing-library/jest-dom';
const convertToReactElement = (item: { title: number }) => {
  return (
      <div>{item.title}</div>
  );
};

describe('SearchableList Component', () => {
    it('searches an empty search', () => {
        // Prepare some mock card items
        const cardInputList = [
            <StudyMediumCard
            key="0"
            name="first"
            rating={3.8}
            title="title 1"
            borderColour="#1F5095"
            onCardClick={(title: string) => { } } department={'Computer Science'} id={''} publisherId={''}          />, <StudyMediumCard
            key="1"
            name="second"
            rating={3.8}
            title="title 2"
            borderColour="#1F5095"
            onCardClick={(title: string) => { } } department={'Computer Science'} id={''} publisherId={''}        />, <StudyMediumCard
            key="2"
            name="third"
            rating={2.9}
            title="title 3"
            borderColour="#1F5095"
            onCardClick={(title: string) => { } } department={'Computer Science'} id={''} publisherId={''}      />
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
            marginTop={10} searchBarEnabled={true} progressBarEnabled={false}          />
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
        const cardInputList = [
            <StudyMediumCard
            key="0"
            name="first"
            rating={3.8}
            title="title 1"
            borderColour="#1F5095"
            onCardClick={(title: string) => { } } department={'Computer Science'} id={''} publisherId={''}          />, <StudyMediumCard
            key="1"
            name="second"
            rating={3.8}
            title="title 2"
            borderColour="#1F5095"
            onCardClick={(title: string) => { } } department={'Computer Science'} id={''} publisherId={''}        />, <StudyMediumCard
            key="2"
            name="third"
            rating={2.9}
            title="title 3"
            borderColour="#1F5095"
            onCardClick={(title: string) => { } } department={'Computer Science'} id={''} publisherId={''}      />
        ];
        const { getByPlaceholderText, getByText,getByTestId } = render(
          <SearchableList
            rowSpacing={1}
            cardInputList={cardInputList}
            numberOfItemsPerRow={2}
            width={500}
            title="Title"
            titleSize={20}
            marginTop={10} searchBarEnabled={true} progressBarEnabled={false}          />
        );
        const searchInput = getByPlaceholderText('Search');
        fireEvent.change(searchInput, { target: { value: 'first' } });
        const searchIcon = getByTestId('search-icon');
        fireEvent.click(searchIcon);
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
        marginTop={10} searchBarEnabled={true} progressBarEnabled={false}      />
    );
  });
  it('renders without crashing when max height is given', () => {
    render(
      <SearchableList
        rowSpacing={1}
        cardInputList={[]}
        numberOfItemsPerRow={2}
        width={500}
        title="Title"
        titleSize={20}
        marginTop={10} searchBarEnabled={true} progressBarEnabled={false} maxHeight={'370px'}      />
    );
  });
  it('renders without crashing when search disabled', () => {
    render(
      <SearchableList
        rowSpacing={1}
        cardInputList={[]}
        numberOfItemsPerRow={2}
        width={500}
        title="Title"
        titleSize={20}
        marginTop={10} searchBarEnabled={false} progressBarEnabled={false} maxHeight={'370px'}      />
    );
  });
  it('search does nothing when no list is not given', () => {
    
     const { getByPlaceholderText, queryByText,getByTestId } = render(
      <SearchableList
        rowSpacing={1}
        cardInputList={[]}
        numberOfItemsPerRow={2}
        width={500}
        title="Title"
        titleSize={20}
        marginTop={10} searchBarEnabled={true} progressBarEnabled={false}      />

    );
    const searchInput = getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'title 1' } });
    const searchIcon = getByTestId('search-icon');
    fireEvent.click(searchIcon);

    // Check if the items containing 'Item' in their titles are rendered
    expect(queryByText('title 1')).not.toBeInTheDocument();
  });
  it('search does nothing when no list is not given', () => {
    const cardInputList = [
      convertToReactElement({ title: 0 })
  ];
    const { getByPlaceholderText, queryByText,getByTestId } = render(
     <SearchableList
       rowSpacing={1}
       cardInputList={cardInputList}
       numberOfItemsPerRow={2}
       width={500}
       title="Title"
       titleSize={20}
       marginTop={10} searchBarEnabled={true} progressBarEnabled={false}      />

   );
   const searchInput = getByPlaceholderText('Search');
   fireEvent.change(searchInput, { target: { value: 'title 1' } });
   const searchIcon = getByTestId('search-icon');
   fireEvent.click(searchIcon);

   // Check if the items containing 'Item' in their titles are rendered
   expect(queryByText('title 1')).not.toBeInTheDocument();
 });

  it('searches by title', () => {
    // Prepare some mock card items
    const cardInputList = [
        <StudyMediumCard
        key="0"
        name="first"
        rating={3.8}
        title="title 1"
        borderColour="#1F5095"
        onCardClick={(title: string) => { } } department={'Computer Science'} id={''} publisherId={''}      />, <StudyMediumCard
        key="1"
        name="second"
        rating={3.8}
        title="title 2"
        borderColour="#1F5095"
        onCardClick={(title: string) => { } } department={'Computer Science'} id={''} publisherId={''}    />, <StudyMediumCard
        key="2"
        name="third"
        rating={2.9}
        title="title 3"
        borderColour="#1F5095"
        onCardClick={(title: string) => { } } department={'Computer Science'} id={''} publisherId={''}  />
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
        marginTop={10} searchBarEnabled={true} progressBarEnabled={false}      />
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
        title="Consectetur adipiscing elit"
        borderColour="#1F5095"
        onCardClick={(title: string) => { } } department={'Computer Science'} id={''} publisherId={''}      />, <StudyMediumCard
        key="1"
        name="second"
        rating={3.8}
        title="Consectetur adipiscing elit"
        borderColour="#1F5095"
        onCardClick={(title: string) => { } } department={'Computer Science'} id={''} publisherId={''}    />, <StudyMediumCard
        key="2"
        name="third"
        rating={2.9}
        title="Consectetur adipiscing elit"
        borderColour="#1F5095"
        onCardClick={(title: string) => { } } department={'Computer Science'} id={''} publisherId={''}  />
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
        marginTop={10} searchBarEnabled={true} progressBarEnabled={false}      />
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
  it('searches by department', () => {
    // Prepare some mock card items
    const cardInputList = [
        <StudyMediumCard
        key="0"
        name="first"
        rating={3.8}
        title="title 1"
        borderColour="#1F5095"
        onCardClick={(title: string) => { } } department={'Computer Science'} id={''} publisherId={''}      />, <StudyMediumCard
        key="1"
        name="second"
        rating={3.8}
        title="title 2"
        borderColour="#1F5095"
        onCardClick={(title: string) => { } } department={'Accounting'} id={''} publisherId={''}    />, <StudyMediumCard
        key="2"
        name="third"
        rating={2.9}
        title="title 3"
        borderColour="#1F5095"
        onCardClick={(title: string) => { } } department={'Finance'} id={''} publisherId={''}  />
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
        marginTop={10} searchBarEnabled={true} progressBarEnabled={false}      />
    );

    // Simulate typing in the search input field
    const searchInput = getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'Computer Science' } });
    const searchIcon = getByTestId('search-icon');
    fireEvent.click(searchIcon);

    // Check if the items containing 'Item' in their titles are rendered
    expect(getByText('title 1')).toBeInTheDocument();
  });
  it('handles search when items in the list are not valid React components', () => {
    // Prepare some mock card items with unexpected types
    const fullCardList = [
        null, // item is not an object
    ];

    // Render the SearchableList component
    const { getByPlaceholderText, queryByText, getByTestId } = render(
        <SearchableList
            rowSpacing={1}
            cardInputList={fullCardList}
            numberOfItemsPerRow={2}
            width={500}
            title="Title"
            titleSize={20}
            marginTop={10} 
            searchBarEnabled={true} 
            progressBarEnabled={false}      
        />
    );

    const searchInput = getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'title' } });
    const searchIcon = getByTestId('search-icon');
    fireEvent.click(searchIcon);

    expect(queryByText('title 1')).not.toBeInTheDocument(); // no match found in item not valid React component
});
});
