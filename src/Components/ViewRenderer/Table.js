import React, { Component, PropTypes } from 'react';
// CSS
// import '../../../../css/view_designer.css'

import renderHTML from 'react-render-html';
const xml2js = require('xml2js');

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: this.props.tableData,
    };
  }

  // FIX_componentWillReceiveProps
  componentDidUpdate(prevProps) {
    if (this.props.tableData !== prevProps.tableData) {
      this.setState({
        tableData: this.props.tableData,
      });
    }
  }

  // componentWillReceiveProps (nextProps) {
  //   if (nextProps.tableData) {
  //     this.setState({
  //       tableData: nextProps.tableData
  //     })
  //   }
  // }

  extractDataFromXML({ firstKey, xml }) {
    let extractedData = '';
    const parser = new xml2js.Parser();
    parser.parseString(xml, (err, result) => {
      extractedData = result[firstKey];
    });
    return extractedData;
  }

  handleColumnClick = (e) => {
    const column = e.target.getAttribute('name');
    const columnID = e.target.getAttribute('id');
    let columnObj = {
      name: column,
      id: columnID,
    };
    this.props.setCurrentColumn(columnObj);
  };

  renderHeaders = () => {
    let headersJSON = this.extractDataFromXML({ firstKey: 'header', xml: this.props.tableData.headers });

    return headersJSON.header.map((headerName, idx) => {
      return <th name={headerName['_']}>{headerName['_']}</th>;
    });
  };

  render() {
    return (
      <div className={this.props.className}>
        <table>
          <tr>{this.renderHeaders()}</tr>
          {renderHTML(this.props.tableData.body.replace(`<?xml version="1.0" encoding="UTF-8" ?>`, ''))}
        </table>
      </div>
    );
  }
}
