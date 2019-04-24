import React from 'react';
import renderer from 'react-test-renderer'; // 1: install this npm module as a dev dependency
import { render, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';

import App from './App';

describe('<App />', () => {
  // 2. write this test
  it('matches snapshot', () => {
    const tree = renderer.create(<App />); // generates a DOM tree

    // snapshots are a JSON representation of the DOM tree
    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe('mocking', () => {
  it('is mocking me', () => {
    const mock = jest.fn()

    const actual = mock('smile')
   //const actual2 = mock('smile') also called if noted below

    // since our mck has no return vale it should be undefined
    expect(actual).toBeUndefined()
    expect(mock).toHaveBeenCalled() // interesting
    expect(mock).toHaveBeenCalledTimes(1) // Even more interesting
    // expect(mock).toHaveBeenCalledTimes(2) it will be called twice
  })
  it('controls the mock', () => {
    // change implementation of mock to always return hello
    const mock = jest.fn(() => 'hello')
    // other examples on how to change the return value and implementation
    // const mock = jest(); mock.mockReturnValue('hello');
    // const mock = jest.fn().mockImplementation(() => 'hello')

    const actual = mock('smile')

    expect(actual).toBe('hello')
    expect(mock).toHaveBeenCalled()
    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith('smile')
  })
})

describe('speak', () => {
  it('updates the message when the speak button is clicked', () => {
    const { getByText, queryByText } = render(<App />)

    // Text is not there
    expect(queryByText(/not mocking me/i)).toBeFalsy()

    const button = getByText(/speak/i);
    fireEvent.click(button);

    //after clicking the button, the text is there
    expect(queryByText(/not mocking me/i)).toBeTruthy()
  })
})