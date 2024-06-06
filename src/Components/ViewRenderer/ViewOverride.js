import React, { Component, PropTypes } from 'react';
// CSS
// import '../../../../css/view_designer.css'

import * as globals from '../../Globals/Variables';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

import renderHTML from 'react-render-html';
const xml2js = require('xml2js');

export default class ViewOverride extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewContexts: [],
      strings: [],
      dates: [],
    };
  }

  async FIX_componentDidMount() {
    if (this.props.user && this.props.settingModalOpen) {
      var connectionXML = this.props.extractDataFromXML({ firstKey: 'view', secondKey: 'connection', xml: this.props.viewXML });
      var viewContexts = [];

      for (var i = 0; i < connectionXML[0].catalog[0].parameters[0].parameter.length; i++) {
        var parameter = connectionXML[0].catalog[0].parameters[0].parameter[i];

        viewContexts.push(
          <tr key={parameter.$.name} className="edit-context2-table-row">
            <td className="edit-context2-label-column">{parameter.$.name}</td>
            <td className="edit-context2-field-column">
              <input className="context-value-field" value={parameter._} disabled={true} />
            </td>
          </tr>
        );
      }

      this.setState({
        connectionXML,
        viewContexts: viewContexts,
        tempContext: this.props.context,
      });
    }
  }
  componentDidMount() {
    this.FIX_componentWillMount().then(() => {
      this.getFields();
    });
  }

  getFields = () => {
    let context = this.state.tempContext;
    let strings = [];
    let dates = [];

    for (const i in this.state.tempContext) {
      if (context[i].ContextType !== 'SYSTEM' && context[i].Parameter !== 'firm-id') {
        switch (context[i].DataType) {
          case 'String':
            strings.push(
              <tr className="user-table-row-cust">
                <td>{context[i].Parameter}</td>
                <td className="cust-data-2">
                  {' '}
                  <input
                    className="cust-attr-value-field"
                    defaultValue={context[i].Value}
                    id="getFields-changEvent"
                    onChange={(e) => {
                      this.handleInputChange(context[i], e.target.value);
                    }} /*onKeyPress={(e) => this.allowInteger(e)}*/
                  />
                </td>
              </tr>
            );
            break;
          case 'Date':
            dates.push(
              <tr className="user-table-row-cust">
                <td>{context[i].Parameter}</td>
                <td className="cust-data-2">
                  <DatePicker
                    id={this.state.tempContext[i].Parameter}
                    selected={moment(
                      new Date(
                        this.state.tempContext[i].Value.substring(0, 4),
                        parseInt(this.state.tempContext[i].Value.substring(5, 7), 10) - 1,
                        this.state.tempContext[i].Value.substring(8, 10)
                      )
                    )}
                    id="change-date-test"
                    onChange={(e) => {
                      this.changeDate(this.state.tempContext[i], e);
                    }}
                  />
                </td>
              </tr>
            );
            break;
        }
      }
    }
    this.setState({
      strings,
      dates,
    });
  };

  changeDate = (item, e) => {
    this.setState({
      [item.Parameter]: e.format().substring(0, 10),
    });
    this.handleInputChange(item, e.format().substring(0, 10));
    this.getFields();
  };

  handleInputChange = (item, value) => {
    let local = this.state.tempContext;
    for (var i in local) {
      if (local[i].ContextId === item.ContextId) {
        local[i].Value = value;
        this.setState({
          tempContext: local,
        });
        this.getFields();
      }
    }
  };

  renderFields = () => {
    return [this.state.strings, this.state.dates, this.state.tempContext];
  };

  renderTable = () => {
    return (
      <div>
        <table>
          <tbody>{this.renderFields()}</tbody>
        </table>
      </div>
    );
  };

  render() {
    return <div>{this.renderTable()}</div>;
  }
}
