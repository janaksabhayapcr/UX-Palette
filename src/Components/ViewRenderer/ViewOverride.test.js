import React, { Component } from 'react';
import ViewOverride from './ViewOverride';
import { configure, shallow, wrapper, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';

configure({ adapter: new Adapter() });

// jest mock functions (mocks this.props.func)
const extractDataFromXML = jest.fn(() => {
  return [
    {
      catalog: [
        {
          parameters: [
            {
              parameter: {
                $: {
                  name: '',
                },
              },
            },
          ],
        },
      ],
    },
  ];
});
const onChange = jest.fn();
// defining this.props
const baseProps = {
  user: [],
  settingModalOpen: [],
  extractDataFromXML,
  viewXML: [],
  context: [],
  onChange,
};
describe('View Renderer : ViewOverride Test', () => {
  let wrapper;
  let tree;

  beforeEach(() => (wrapper = shallow(<ViewOverride {...baseProps} />)));

  it(' Should render with all of the props', () => {
    tree = renderer.create(<ViewOverride {...baseProps} />);
    let treeJson = tree.toJSON();
    expect(treeJson).toMatchSnapshot();
    tree.unmount();
  });

  it('Test handleInputChange method', () => {
    wrapper.setState({
      tempContext: [
        {
          ContextId: '',
          Value: 0,
        },
      ],
    });
    wrapper.update();
    // expect(wrapper.instance().renderTypeDown()).toEqual();
    expect(wrapper.instance().handleInputChange([])).toEqual();
    expect(wrapper.instance().handleInputChange([])).toBeUndefined();
  });

  it('Test getFields method', () => {
    wrapper.setState({
      tempContext: [
        {
          ContextType: '',
          Parameter: '',
          Value: 0,
        },
      ],
    });
    wrapper.update();
    // expect(wrapper.instance().renderTypeDown()).toEqual();
    expect(wrapper.instance().getFields([])).toEqual();
    expect(wrapper.instance().getFields([])).toBeUndefined();
  });

  //   it("should handle onChange function  on Search ()", () => {
  //     baseProps.onChange.mockClear();
  //     wrapper.setProps({
  //     });
  //     wrapper.setState({
  //       tempContext:[]
  //     });
  //     wrapper.update()
  //     wrapper.find('#change-date-test').simulate('change',{target: {value: 'test change'}} )
  //      expect(wrapper.state('tempContext')).toHaveProperty('test change');
  //     expect(toJson(wrapper)).toMatchSnapshot();
  // });
});
