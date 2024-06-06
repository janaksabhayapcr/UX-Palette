import React, { Component } from 'react';
import * as globals from '../../Globals/Variables';
import Modal from 'react-modal';
import Draggable from 'react-draggable';
const FontAwesome = require('react-fontawesome');

var IDLE_TIMEOUT = globals.IDLE_TIMEOUT; //seconds | Currently set to 30 mins - 1800 sec
let timeoutTracker;
let interval;
const alertStyle = {
  overlay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '9',
    background: 'rgba(0, 0, 0, 0.2)',
  },
  content: {
    overflow: 'visible',
    padding: 0,
    border: 'none',
    borderRadius: 0,
    // position: "static",
    background: 'none',
    top: '25%',
    left: '33%',
    height: '5%',
    width: '30%',
  },
};
class IdleTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: props.timeout ? props.timeout * 1000 : IDLE_TIMEOUT ? IDLE_TIMEOUT * 1000 : 1800 * 1000, // Default to 30 mins, use IDLETIMEOUT, accept argument
      message: props.message ? props.message * 1000 : 300 * 1000, // Default to 5 mins accept argument
      alertOpen: false,
      extended: false,
      redirectLogout: false,
    };
  }

  componentDidMount() {
    this.cleanUp(); // Cleanup any existing session data
    this.eventHandler = this.updateExpiredTime.bind(this); // Bind Event Handler
    if (document.URL.indexOf('/logout') === -1 && document.URL.indexOf('#error') === -1) {
      // If we are on a logout route, don't start new timers
      this.tracker();
      this.startInterval();
    }
  }

  // Converts ms to minutes and seconds
  millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  };

  // Update Dialog with time left until auto sign out
  writeProgress = (msg) => {
    var oPanel = document.getElementById('SecondsUntilExpire');
    msg = this.millisToMinutesAndSeconds(msg);
    if (oPanel) oPanel.innerHTML = msg + ' minutes';
  };

  // Message that will appear when close to auto logout due to inactivity
  handleAlert = (open) => {
    let { alertOpen } = this.state;
    if (alertOpen === false && open === true) {
      this.setState({ alertOpen: open, extended: true });
    }
    if (alertOpen === true && open === false) {
      this.setState({ alertOpen: open });
    }
  };

  // Start a timer
  startInterval = () => {
    let { message, extended } = this.state;
    this.updateExpiredTime();
    interval = setInterval(() => {
      const expiredTime = parseInt(sessionStorage.getItem('_expiredTimeEnroll'), 10);
      if (expiredTime) {
        let timeRemaining = parseInt(expiredTime) - Date.now();
        if (timeRemaining >= 0 && timeRemaining <= message && extended === false) {
          this.handleAlert(true);
          this.writeProgress(timeRemaining);
        } else if (timeRemaining <= 0 && timeRemaining < message) {
          this.handleAlert(false);
        }
        if (expiredTime < Date.now()) {
          this.routeToLogout();
        }
      }
    }, 1000);
  };

  // If user activity, reset timer
  updateExpiredTime = () => {
    if (timeoutTracker) {
      clearTimeout(timeoutTracker);
    }
    timeoutTracker = setTimeout(() => {
      this.handleAlert(false);
      sessionStorage.setItem('_expiredTimeEnroll', Date.now() + this.state.timeout);
    }, 100);
  };

  // Setup event listeners
  tracker = () => {
    window.addEventListener('click', this.eventHandler);
    window.addEventListener('scroll', this.eventHandler);
    window.addEventListener('keydown', this.eventHandler);
  };

  // Cleanup listeners, timers, and sessionStorage
  cleanUp = () => {
    sessionStorage.removeItem('_expiredTimeEnroll');
    clearInterval(interval);
    window.removeEventListener('click', this.eventHandler);
    window.removeEventListener('scroll', this.eventHandler);
    window.removeEventListener('keydown', this.eventHandler);
  };

  // Route to new logout route
  routeToLogout = () => {
    window.location.href = window.location.origin + '/logoutsession';
    this.cleanUp(); // cleanup timers
  };

  // Close alert and reset timer
  handleExtend = () => {
    this.setState({ alertOpen: false, extended: true }, () => {
      // Close modal
      this.updateExpiredTime(); // Reset timer to extend
    });
  };

  render() {
    let { alertOpen } = this.state;
    return (
      <div>
        <Modal isOpen={alertOpen} style={alertStyle}>
          <Draggable handle=".handle">
            <div className="draggable-wrapper">
              <div className="fullmodal handle">
                <div className="fullmodal_title">
                  <div className="fullmodal_title_add">Are you still there?</div>
                </div>
                <div
                  className="sidemodal_addnew_x"
                  onClick={() => {
                    this.setState({ alertOpen: false });
                  }}
                >
                  <FontAwesome name="xbutton" className="fa-times" />
                </div>
              </div>
              <div className="session-expiration-modal">
                <div className={'session-expiration-message'}>
                  Your session will expire in <span id="SecondsUntilExpire"></span>.
                </div>
                <div className="top-margin">
                  <div className="session-div-buttons">
                    <div className="generic-button-secondary" id="logout-button" onClick={this.routeToLogout}>
                      Logout
                    </div>

                    <div className="generic-button-primary" id="extend-button" onClick={this.handleExtend}>
                      Extend
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Draggable>
        </Modal>
      </div>
    );
  }
}
export default IdleTimer;
