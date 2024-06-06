import * as globals from '../../Globals/Variables';
import * as validationManager from '../Utils/ValidationManager';
import * as dataService from './DataService';

var IDLE_TIMEOUT = globals.IDLE_TIMEOUT; //seconds | Currently set to 30 mins - 1800 sec
var _localStorageKey = 'global_countdown_last_reset_timestamp';
var _idleSecondsTimer = null;
var _lastResetTimeStamp = Date.parse(new Date().toUTCString());
var _localStorage = null;
var _context = null;

export function initiate(context) {
  try {
    _context = context;
    _localStorage = window.localStorage;
  } catch (ex) {}

  //Every 10 minutes without a page refresh, send a silent refresh to ADB2C to keep session rolling.
  window.setInterval(silentRefresh, 600000); //Currently set 10 minutes - 600000 ms
  //Check for user innactivity every 10 minutes.
  _idleSecondsTimer = window.setInterval(CheckIdleTime, 300000); //Currently set to every 5 minutes - 300000 ms
}

export function onMouseMove(e) {
  //Supress clicks done programatically for CSS refresh
  if (e.target.id && e.target.id === 'RUNNING_APP_HTML') {
    //Do nothing
    ResetTime(e);
  } else {
    var currentTimeStamp = Date.parse(new Date().toUTCString());
    var lastResetTimeStamp = GetLastResetTimeStamp();
    var secondsDiff = Math.floor((currentTimeStamp - lastResetTimeStamp) / 1000);

    //If the user clicks on continue or end after two minutes...
    if (secondsDiff >= IDLE_TIMEOUT) {
      window.clearInterval(_idleSecondsTimer);
      ResetTime({ e: true });
      //routeToLogout();
    } else {
      ResetTime(e);
    }
  }
}

export function GetLastResetTimeStamp() {
  var lastResetTimeStamp = 0;
  if (_localStorage) {
    lastResetTimeStamp = parseInt(_localStorage[_localStorageKey], 10);
    if (isNaN(lastResetTimeStamp) || lastResetTimeStamp < 0) lastResetTimeStamp = Date.parse(new Date().toUTCString());
  } else {
    lastResetTimeStamp = _lastResetTimeStamp;
  }

  return lastResetTimeStamp;
}

export function SetLastResetTimeStamp(timeStamp) {
  if (_localStorage) {
    _localStorage[_localStorageKey] = timeStamp;
  } else {
    _lastResetTimeStamp = timeStamp;
  }
}

export function ResetTime(event) {
  if (event) {
    SetLastResetTimeStamp(Date.parse(new Date().toUTCString()));
  } else {
    SetLastResetTimeStamp(Date.parse(new Date().toUTCString()) - 1000 * 60 * IDLE_TIMEOUT);
  }
}

export function AttachEvent(element, eventName, eventHandler) {
  if (element.addEventListener) {
    element.addEventListener(eventName, eventHandler, false);
    return true;
  } else if (element.attachEvent) {
    element.attachEvent('on' + eventName, eventHandler);
    return true;
  } else {
    //nothing to do, browser too old or non standard anyway
    return false;
  }
}

export function WriteProgress(msg) {
  var oPanel = document.getElementById('SecondsUntilExpire');
  if (oPanel) oPanel.innerHTML = msg;
  else if (console) console.log(msg);
}

export function CheckIdleTime() {
  if (_context.state.services) {
    var currentDateStamp = new Date();
    currentDateStamp.setHours(currentDateStamp.getHours() + 1);
    var currentTimeStamp = Date.parse(new Date().toUTCString());
    var lastResetTimeStamp = GetLastResetTimeStamp();
    var secondsDiff = Math.floor((currentTimeStamp - lastResetTimeStamp) / 1000);
    var expirationTime = currentTimeStamp + (IDLE_TIMEOUT - secondsDiff);

    let sessionFetchProperties = {
      BaseUrl: `${_context.state.services.Dashboard.URL}/SESSION?id=${_context.state.user.sessionId}`,
      Method: 'PATCH',
      SuccessMessage: 'Request Successful',
      FailureMessage: 'Request Failed',
      SuppressMessageOverride: false,
      ShowMessage: globals.NEVER,
      HeaderVals: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': _context.state.services.Dashboard.subscription_key,
      },
      CallBody: {
        ExpirationDate: new Date(expirationTime),
      },
    };

    dataService
      .FetchData(sessionFetchProperties)
      .then((response) => {
        if (!response.error) {
        } else {
        }
      })
      .catch((err) => {
        validationManager.CustomAlert(true, 'UNKNOWN ERROR', 'Exception Caught');
      });

    if (secondsDiff <= 0) {
      ResetTime({ e: true });
      secondsDiff = 0;
    }

    //WriteProgress((IDLE_TIMEOUT - secondsDiff) + "");

    if (secondsDiff >= IDLE_TIMEOUT) {
      window.clearInterval(_idleSecondsTimer);
      ResetTime({ e: true });
      routeToLogout();
    }
  }
}

export function routeToLogout() {
  _context.logout();
}

export function silentRefresh() {
  _context.setSilentRefresh(true);
}
