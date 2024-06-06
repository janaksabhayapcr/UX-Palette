import React, { Component } from 'react';
import { withRouter } from 'react-router';
const Spinner = require('react-spinkit');

let getINITIAL_STATE = (that) => {
  return {
    noteOpen: true,
    Entry: '',
    checkRequired: false,
    ExtractViewData: '',
    loading: true,
  };
};

export class ViewExtract extends React.Component {
  constructor(props) {
    super(props);
    this.state = getINITIAL_STATE(this);
  }

  componentDidMount = () => {
    this.setState({ ExtractViewData: this.props.extractViewData, loading: false });
  };

  render() {
    let { loading } = this.state;
    return (
      <div className="viewextract-modal">
        <textarea
          disabled={true}
          type="message"
          id="viewextract-message"
          value={this.state.ExtractViewData}
          name="message"
          style={{ border: 'none', resize: 'none', width: '100%' }}
        ></textarea>
      </div>
    );
  }
}
export default withRouter(ViewExtract);
