import React from 'react';
import { render, fireEvent,screen, getByRole } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdvertCreate from './AdvertCreate';
jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn(),
}));
describe('AdvertCreate Component', () => {
  const advertTypes = ["Study", "Webinar", "Other"];
  const width = '90%';
  const height = 370;
  const textAreaContent = [
    'A study requires participants to meet criteria and allows you to reject participants. ~ Studies also require ethical approval from your department\'s ethics board before participants can join.',
    'A Webinar is an online hosted event, these are typically informational and use a link to zoom/teams etc to manage participants. ~ No participant information is collected so setup is faster.',
    'Not sure what this is ?'
  ];



  it('renders without crashing', () => {
    render(
      <AdvertCreate
        advertTypes={advertTypes}
        width={width}
        height={height}
        textAreaContent={textAreaContent}
      />
    );
  });

  it('updates text content when advertisement type is selected', () => {
    const { getByText } = render(
      <AdvertCreate
        advertTypes={advertTypes}
        width={width}
        height={height}
        textAreaContent={textAreaContent}
      />
    );

    // Click on the 'Webinar' button
    fireEvent.click(getByText('Webinar'));

    // Check if the text content for 'Webinar' is rendered
    expect(getByText(/A Webinar is an online hosted event/i)).toBeInTheDocument();
  });


  it('mocks the useRouter hook', () => {
    const pushMock = jest.fn();
    const useRouterMock = jest.spyOn(require('next/router'), 'useRouter');
    useRouterMock.mockReturnValue({ push: pushMock });

    const { getByRole, getByText } = render(
      <AdvertCreate
        advertTypes={advertTypes}
        width={width}
        height={height}
        textAreaContent={textAreaContent}
      />
    );

    const createButton = getByRole('button', { name: /Create/i });
    expect(createButton).toBeInTheDocument();

    fireEvent.click(getByText('Webinar'));
    fireEvent.click(createButton);

    expect(pushMock).toHaveBeenCalledWith(
      '/webinarCreator'
    );
  });
  it('mocks the useRouter hook', () => {
    const pushMock = jest.fn();
    const useRouterMock = jest.spyOn(require('next/router'), 'useRouter');
    useRouterMock.mockReturnValue({ push: pushMock });

    const { getByRole, getByText } = render(
      <AdvertCreate
        advertTypes={advertTypes}
        width={width}
        height={height}
        textAreaContent={textAreaContent}
      />
    );

    const createButton = getByRole('button', { name: /Create/i });
    expect(createButton).toBeInTheDocument();

    fireEvent.click(getByText('Study'));
    fireEvent.click(createButton);

    expect(pushMock).toHaveBeenCalledWith(
      '/studyCreator'
    );
  });
  it('mocks the useRouter hook', () => {
    const pushMock = jest.fn();
    const useRouterMock = jest.spyOn(require('next/router'), 'useRouter');
    useRouterMock.mockReturnValue({ push: pushMock });

    const { getByRole, getByText } = render(
      <AdvertCreate
        advertTypes={advertTypes}
        width={width}
        height={height}
        textAreaContent={textAreaContent}
      />
    );

    const createButton = getByRole('button', { name: /Create/i });
    expect(createButton).toBeInTheDocument();

    fireEvent.click(getByText('Other'));
    fireEvent.click(createButton);

    expect(pushMock).toHaveBeenCalledWith(
      '/otherCreator'
    );
  });
});