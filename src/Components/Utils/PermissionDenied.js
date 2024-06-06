import React, { Component } from 'react';
import '../../App.css';

const FontAwesome = require('react-fontawesome');

export default class PermissionDenied extends Component {
  render() {
    return (
      <div className="authorize">
        <div className="c">
          <div className="_404"></div>
          <FontAwesome name="permissiondenied" className="fa-lock" size="3x" />
          <div className="_2">You do not have permission to access this resource</div>
        </div>
      </div>
    );
  }
}
