import React, { Component } from 'react';
import Chart from './Chart';
import { configure, shallow, wrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';

configure({ adapter: new Adapter() });

// jest mock functions (mocks this.props.func)
const extractDataFromXML = jest.fn();
const logSuccessfulChart = jest.fn();

// defining this.props
const baseProps = {
  extractDataFromXML,
  viewXML: [],
  viewChartScript: {},
  chartConfig: [],
  user: {
    chartTheme: [[]],
    mapTheme: [[]],
  },
  context: [
    {
      Parameter: {},
      Value: {},
    },
  ],
  chartPrototype: {
    drilldown: {},
    series: [
      {
        name: [],
      },
    ],
  },
  initialLoad: [],
  logSuccessfulChart,
  drilldownRender: [],
  size: [],
};

describe('View Renderer : Chart Test', () => {
  let wrapper;
  let tree;

  beforeEach(() => (wrapper = shallow(<Chart {...baseProps} />)));

  it(' Should render with all of the props', () => {
    tree = renderer.create(<Chart {...baseProps} />);
    let treeJson = tree.toJSON();
    expect(treeJson).toMatchSnapshot();
    tree.unmount();
  });
});
