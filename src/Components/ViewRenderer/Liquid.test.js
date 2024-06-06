import React, { Component } from 'react';
import Liquid from './Liquid';
import { configure, shallow, wrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';

configure({ adapter: new Adapter() });

// jest mock functions (mocks this.props.func)
const setPrintDiv = jest.fn();
const getCleanJSON = jest.fn();

// defining this.props
const baseProps = {
  preRenderedHTML: {},
  setPrintDiv,
  layoutViewId: {},
  viewScript: {},
  liquidTemplates: [],
  renderertype: {},
  getCleanJSON,
  liquidFunctions: {
    length: [],
    Name: {},
    Function: {},
  },
  preRenderedHTML: {},
};
describe('View Renderer : Liquid Test', () => {
  let wrapper;
  let tree;

  beforeEach(() => (wrapper = shallow(<Liquid uniqueKey={0} {...baseProps} />)));

  it(' Should render with all of the props', () => {
    tree = renderer.create(<Liquid {...baseProps} />);
    let treeJson = tree.toJSON();
    expect(treeJson).toMatchSnapshot();
    tree.unmount();
  });
});
