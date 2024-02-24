import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FormDialogue from './FormDialogue';;
import '@testing-library/jest-dom';



describe('FormDialogue Component', () => {
  it('renders without crashing', () => {
    render(<FormDialogue width="100px" height="100px" currentPage={0} onFormSubmit={() => { } } hasBorderRadius={false} canSubmit={false} />);
  });

  it('displays the correct page number', () => {
    const { getByText } = render(
      <FormDialogue width="100px" height="100px" currentPage={0} onFormSubmit={() => { } } hasBorderRadius={false} canSubmit={false}>
        <div>Page 1</div>
        <div>Page 2</div>
        <div>Page 3</div>
      </FormDialogue>
    );
    expect(getByText('1/3')).toBeInTheDocument();
  });

  it('calls onFormSubmit when Submit button is clicked on the last page', () => {
    const onFormSubmitMock = jest.fn();
    const { getByText } = render(
      <FormDialogue width="100px" height="100px" currentPage={2} onFormSubmit={onFormSubmitMock} hasBorderRadius={false} canSubmit={true} >
        <div>Page 1</div>
        <div>Page 2</div>
        <div>Page 3</div>
      </FormDialogue>
    );
    fireEvent.click(getByText('Submit'));
    expect(onFormSubmitMock).toHaveBeenCalled();
  });

  it('navigates to the next page when "NEXT" button is clicked', () => {
    const { getByText } = render(
      <FormDialogue width="100px" height="100px" currentPage={0} onFormSubmit={() => { } } hasBorderRadius={false} canSubmit={false}>
        <div>Page 1</div>
        <div>Page 2</div>
        <div>Page 3</div>
      </FormDialogue>
    );
    fireEvent.click(getByText('NEXT'));
    expect(getByText('2/3')).toBeInTheDocument();
  });

  it('navigates to the previous page when "PREV" button is clicked', () => {
    const { getByText } = render(
      <FormDialogue width="100px" height="100px" currentPage={1} onFormSubmit={() => { } } hasBorderRadius={false} canSubmit={false}>
        <div>Page 1</div>
        <div>Page 2</div>
        <div>Page 3</div>
      </FormDialogue>
    );
    fireEvent.click(getByText('PREV'));
    expect(getByText('1/3')).toBeInTheDocument();
  });
});
