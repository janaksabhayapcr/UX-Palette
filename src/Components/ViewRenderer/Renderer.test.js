import React, { Component } from 'react';
import Renderer from './Renderer';
import { configure, shallow, wrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';

configure({ adapter: new Adapter() });

// jest mock functions (mocks this.props.func)
const addLogToQueue = jest.fn();
const updateNumberOfViewsLoaded = jest.fn();
const deleteView = jest.fn();
const onClick = jest.fn();
const onChange = jest.fn();

// defining this.props
const baseProps = {
  services: {
    Dashboard: {
      URL: '',
      subscription_key: {},
    },
    Renderer: {
      URL: '',
    },
  },

  layoutViewId: {},
  drilldownRender: {},
  viewId: {},
  logBody: {},
  renderId: {},
  module: {
    moduleId: {},
  },
  viewXML: {},
  context: [
    {
      Parameter: [],
      Value: [],
    },
  ],
  addLogToQueue,
  updateNumberOfViewsLoaded,
  transforms: {
    normalizeTransform: {},
    renderSchemaTransform: {},
    shapeTransform: {},
    filterTransform: {},
    aggregateTransform: {},
    pivotStagingTransform: {},
    pivotTransform: {},
    sortTransform: {},
    finalcolumnTransform: {},
    styleSheetTransform: {},
  },
  chartConfiguration: {},
  chartSeries: {},
  chartFinal: {},
  deleteView,
  renderLocation: {},
  user: {},
  firmContext: {},
  editMode: {},
  getCookie: {},
  contextParameters: {},
  liquidFunctions: {},
  liquidTemplates: {},
  systemLayout: {},
  userRoles: {},
  allowView: {},
  allowEdit: {},
  sideToRender: {},
  onClick,
  onChange,
};
describe('View Renderer : RendererTest', () => {
  let wrapper;
  let tree;

  beforeEach(() => (wrapper = shallow(<Renderer {...baseProps} />)));

  it(' Should render with all of the props', () => {
    tree = renderer.create(<Renderer {...baseProps} />);
    let treeJson = tree.toJSON();
    expect(treeJson).toMatchSnapshot();
    tree.unmount();
  });

  it('renders a modal portal', () => {
    const isOpen = wrapper.state('isOpen');
    const modalPortal = wrapper.find('#modal-container');
    expect(isOpen).toBeTruthy;
    expect(modalPortal).toHaveLength(1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
