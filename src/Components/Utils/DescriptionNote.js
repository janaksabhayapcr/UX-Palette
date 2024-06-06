import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import { Redirect, withRouter } from 'react-router';
import { showRequired, hasRequired } from '../Utils/RequiredFields';
// import ReactTable from 'react-table';
// import Modal from 'react-modal';
// import Draggable from "react-draggable";
// import moment from 'moment';
// import { isGuid } from 'is-guid';
// import { confirmAlert } from 'react-confirm-alert';
// import SearchControl from '../Utils/SearchControl';
import * as Models from './AddTicketModels';
const Spinner = require('react-spinkit');

let getINITIAL_STATE = (that) => {
  return {
    noteOpen: true,
    Entry: '',
    checkRequired: false,
  };
};

export class DescriptionNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = getINITIAL_STATE(this);
  }

  async componentDidMount() {
    this.setState({ loadSpinner: true });

    let user = this.props.user;
    let services = this.props.services;
    let Procedure = this.props.Procedure;

    let ProcedureDescription = await Models.getWorkProcedureById({ user, services, id: Procedure });

    await this.setState({ Procedure: Procedure, Description: ProcedureDescription.Description, loadSpinner: false });
  }

  render() {
    return this.state.loadSpinner ? (
      <div className="share-spinner-wrapper">
        <Spinner name="line-scale-pulse-out-rapid" color="#315B7B" fadeIn="none" />
      </div>
    ) : (
      <div>
        <div className="procedure-description">
          <div className="top-div-buttons"></div>
          <div className="grid-container">
            <div id="grid-item">
              <label for="title" id="add-prodesc-label" className="add-ticket-prodesc">
                {' '}
                Procedure Description:{' '}
              </label>
            </div>
            <div id="grid-message-box">
              <textarea
                disabled={true}
                type="message"
                id="procedure-desc-message"
                value={this.state.Description}
                name="message"
                style={{ border: 'none', resize: 'none', width: '100%', ['font-weight']: 'bold' }}
                //className={showRequired(checkRequired, this.state, "message") ? "req" : null}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(DescriptionNote);
