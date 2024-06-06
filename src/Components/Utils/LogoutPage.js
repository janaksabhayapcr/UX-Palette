import React, { Component } from 'react';
import * as globals from '../../Globals/Variables';
import { getBaseURL } from './HelperFunctions';

const FontAwesome = require('react-fontawesome');

export default class LogoutPage extends Component {
  render() {
    return (
      <div className="logout-wrapper">
        <div className="logout">
          <div className="center-align-lock">
            <div className="circle">
              <FontAwesome name="permissiondenied" className="fa-lock align-lock" size="5x" />
            </div>
          </div>
          <div className="center-align">
            <div className="logout-message">You Have Been Logged Out</div>
            <h4 className="thank-message">Thank you for using our website</h4>
          </div>
        </div>
      </div>
    );
  }
}
