import React, { Component } from 'react';
import Table from './Table';
import { configure, shallow, wrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';

configure({ adapter: new Adapter() });

// jest mock functions (mocks this.props.func)
const setCurrentColumn = jest.fn();
const headersJSON = jest.fn(() => {
  return (header = [{}]);
});

// defining this.props
const baseProps = {
  headersJSON,
  setCurrentColumn,
  tableData: {
    headers: '<header> test  </header>',

    body: [],
  },
  className: [],
};
describe('View Renderer : Table Test', () => {
  let wrapper;
  let tree;

  beforeEach(() => (wrapper = shallow(<Table {...baseProps} />)));

  it(' Should render with all of the props', () => {
    tree = renderer.create(<Table {...baseProps} />);
    let treeJson = tree.toJSON();
    expect(treeJson).toMatchSnapshot();
    tree.unmount();
  });
});
