import React, { Component } from 'react';

var FontAwesome = require('react-fontawesome');
const bars = 'fa-bars view-menu-img';
const gears = 'fa-cog view-gear-img';

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="view-sub-menu-img">
        <FontAwesome name="menu-bar-gears" className={this.props.menuType === 'view' ? bars : bars} />
      </div>
    );
  }
}
