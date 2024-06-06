import View from './View';
import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';
import { configure, shallow, wrapper, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { toast } from 'react-toastify';
import { MemoryRouter as Router, MemoryRouter } from 'react-router-dom';

configure({ adapter: new Adapter() });

// jest mock functions (mocks this.props.func)
const extractDataFromXML = jest.fn(() => {
  return [
    {
      type: [{ _: '' }],
      renderertype: [],
      viewtitle: [],
      catalog: [
        {
          resolvedtemplate: ['test'],
        },
      ],
    },
  ];
});
const deleteView = jest.fn();
const toggleSettings = jest.fn();
const onClick = jest.fn();
const onChange = jest.fn();
// defining this.props
const baseProps = {
  sideToRender: {},
  renderLocation: {},
  viewXML: {},
  extractDataFromXML,
  universalView: {},
  context: [
    {
      Parameter: {},
      Value: {},
    },
  ],
  user: {},
  chartPrototype: {},
  chartConfig: {},
  initialLoad: {},
  viewChartScript: {},
  logSuccessfulChart: {},
  liquidFunctions: {},
  layoutViewId: {},
  getCleanJSON: {},
  ViewScript: {},
  liquidTemplates: {},
  preRenderedHTML: {},
  layoutViewId: {},
  services: {
    Dashboard: {
      URL: {},
      subscription_key: {},
    },
  },
  deleteView,
  toggleSettings,
  userRoles: {},
  allowEdit: true,
  location: {
    pathname: [],
  },
  viewId: {},
  viewType: {},
  layoutViewId: {},

  defaultData: {
    defaultView: [],
    size: [],
    url: [],
    description: [[]],
    viewtitle: [[]],
    categories: [],
    urlcaption: {},
  },
  localPermissions: [
    {
      globals: {
        UI_LAYOUT_VIEW_EDIT: [],
        UI_LAYOUT_VIEW_INSTANCE: [],
        UI_LAYOUT_EDIT: [],
      },
    },
  ],
  drilldownRender: true,
  onClick,
  onChange,
};

describe('View Renderer : View Test', () => {
  let tree;
  let wrapper;
  beforeEach(
    () =>
      (wrapper = mount(
        <MemoryRouter keyLength={0}>
          <View {...baseProps} />
        </MemoryRouter>
      ))
  );

  it(' Should render with all of the props', () => {
    tree = renderer.create(
      <MemoryRouter>
        <View {...baseProps} />
      </MemoryRouter>
    );
    let treeJson = tree.toJSON();
    expect(treeJson).toMatchSnapshot();
    tree.unmount();
  });
  //check
  it('should call toggleViewType method on button click', () => {
    baseProps.onClick.mockClear();
    wrapper.setProps({});
    wrapper.find('View').setState({
      defaultView: 'chart',
      printDivId: 'print',
    });
    wrapper.update();
    wrapper.find('View').find('#view-rotate-with-link').at(1).simulate('click');
  });
  //check
  it('should call populateViewDropdown method on button click', () => {
    baseProps.onClick.mockClear();
    wrapper.setProps({});
    wrapper.find('View').setState({});
    wrapper.update();
    wrapper.find('View').find('#view-title-img').at(0).simulate('click');
  });

  it('Test deleteView function: Notification: View Deleted', () => {
    let options = {
      type: toast.TYPE.SUCCESS,
      position: toast.POSITION.TOP_LEFT,
    };
    toast('View Deleted', options);
    wrapper.setState({
      layoutViewId: '',
    });

    wrapper.update();
    expect(wrapper.find('View').instance().deleteView()).toEqual();
    expect(wrapper.find('View').instance().deleteView()).toBeUndefined();
  });

  it('Test deleteView function: Notification: Failed to Delete', () => {
    let options = {
      type: toast.TYPE.ERROR,
      position: toast.POSITION.TOP_LEFT,
    };
    toast('Failed to Delete', options);

    wrapper.update();
    expect(wrapper.find('View').instance().deleteView()).toEqual();
    expect(wrapper.find('View').instance().deleteView()).toBeUndefined();
  });
});
