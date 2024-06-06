import React, { Component } from 'react';
import * as globals from '../../Globals/Variables';

const FontAwesome = require('react-fontawesome');

export default class LoginError extends Component {
  render() {
    return (
      <div className="logout-wrapper">
        <div className="logout">
          <div className="center-align-lock">
            <div className="circle">
              <FontAwesome name="permissiondenied" className="fa-gears align-lock" size="5x" />
            </div>
          </div>
          <div className="center-align">
            <div className="logout-message">Unexpected Error</div>
            <h4 className="thank-message">We are unable to log you in at this time</h4>
            <p className="return-message"> Please contact your system administrator if the issue continues. {this.props.errorCode}</p>
          </div>
        </div>
      </div>
    );
  }
}
