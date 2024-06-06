import React, { Component } from 'react';
import Menu from './DesignerMenu';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';

configure({ adapter: new Adapter() });

describe('Utils : Menu test', () => {
  let tree;
  let baseProps;
  let mockmenuType = {};

  beforeEach(() => {
    baseProps = {
      // assing all of the props into MOCK
      menuType: mockmenuType,
    };
  });

  it(' Should render without menuType props ', () => {
    baseProps = {
      ...baseProps,
      menuType: {},
    };
    tree = renderer.create(<Menu {...baseProps} />);
    let treeJson = tree.toJSON();
    expect(treeJson).toMatchSnapshot();
    tree.unmount();
  });

  it(' Should render with menuType props', () => {
    tree = renderer.create(<Menu {...baseProps} />);
    let treeJson = tree.toJSON();
    expect(treeJson).toMatchSnapshot();

    tree.unmount();
  });
});
