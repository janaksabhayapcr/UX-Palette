import React, { Component } from 'react';
const FontAwesome = require('react-fontawesome');
export default class NotFound extends Component {
  componentDidMount() {
    // this.props.clearLoader();
  }
  render() {
    return (
      // <div>
      //   <div className="not-found">
      //     <div className='center-align-lock'>
      //       <div className='_404'>404</div>
      //     </div>
      //     <div className='center-align'>
      //         <div className='not-found-message'>Sorry, we couldn’t find the page you requested.</div>
      //         <p className="not-found-return-message" onClick={() => {window.history.back()}}> Go Back</p>
      //     </div>
      //   </div>
      // </div>
      <div className="logout-wrapper">
        <div className="logout">
          <div className="center-align-lock">
            <div className="circle">
              <FontAwesome name="permissiondenied" className="fa-ban align-lock" size="5x" />
            </div>
          </div>
          <div className="center-align">
            <div className="logout-message-code">404</div>
            <div className="logout-message-codemessage">Page Not Found</div>
            <h4 className="thank-message">Sorry, we couldn’t find the page you requested.</h4>
            <p className="return-message logout-clickhere ">
              {' '}
              <a
                className="logout-clickhere"
                onClick={() => {
                  window.history.back();
                }}
              >
                {' '}
                Go Back{' '}
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
