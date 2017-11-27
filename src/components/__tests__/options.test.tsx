
import * as React from 'react';
import { mount } from 'enzyme';

// const Hello = require('../Hello');
import Options from '../options';
import { wrap } from 'module';

describe('Default options check', () => {
  const saveCallback = jest.fn();
  const changeHeightCallback = jest.fn();
  const changeWidthCallback = jest.fn();

  const wrapper = mount(
    <Options
      className="game__options"
      width={25}
      height={20}
      points={0}
      onSave={saveCallback}
      onChangeHeight={changeHeightCallback}
      onChangeWidth={changeWidthCallback}
    />,
  );

  it('Contains header "The Snake Game"', () => {
    expect(
      wrapper.find('h1').text(),
    ).toBe('The Snake Game');
  });
  it('I see showing width equals of prop (25)', () => {
    expect(
      wrapper.find('.option_width').text(),
    ).toBe('Width:25');
  });

  it('I see text of Height is 20', () => {
    expect(
      wrapper.find('.option_height').text(),
    ).toBe('Height:20');
  });

  it('I see one button with text ', () => {

    expect(
      wrapper.find('button').length,
    ).toBe(1);

    expect(
      wrapper.find('button').at(0).text(),
    ).toBe('Save settings and restart');
  });
});

// TODO: Add more tests of other components
