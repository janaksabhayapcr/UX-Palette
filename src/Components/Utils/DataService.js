/**
 *  @DataService.js 1/22/2019
 *  Developer: Vincent Fragola
 *  Wrapper for fetch - takes JSON payload containing all parameters
 *  Sample Payload:
 *  let fetchProperties =
 *  {
 *      BaseUrl:{`${this.state.services.Dashboard.URL}/CONTEXT?id=${contextId}`},                     //this is the full odata url
 *      UseCredentials,                                                                               //'include' or 'omit'    -   if property not included defaults based on URL
 *      Mode: 'cors',                                                                                 //'cors' or 'no-cors'
 *      CallBody:  {'Value':value},                                                                   //valid json
 *      Method:'PATCH',                                                                               //'PATCH','POST','GET','PUT','DELETE'
 *      SuccessMessage:'Request Successful',
 *      FailureMessage:'Request Failed',
 *      SuppressMessageOverride:false,
 *      HeaderVals: {                                                                                 //valid json
 *        'Content-Type': 'application/json',
 *        'Ocp-Apim-Subscription-Key': this.state.services.Dashboard.subscription_key,
 *      }
 *  }
 */

import * as globals from '../../Globals/Variables';
import * as validationManager from './ValidationManager';
import { getCookie } from '../Utils/HelperFunctions';

export function FetchData(fetchProperties) {
  return new Promise((resolve, reject) => {
    switch (fetchProperties.Method.toUpperCase()) {
      case 'POST':
        fetchProperties.BaseUrl = globals.REMOTE_INSTANCE ? UrlRegex(fetchProperties.BaseUrl) : fetchProperties.BaseUrl;
        Post(ParseFetchParameters(fetchProperties)).then((response) => {
          response ? resolve(response) : reject('Error');
        });
        break;
      case 'GET':
        fetchProperties.BaseUrl = globals.REMOTE_INSTANCE ? UrlRegex(fetchProperties.BaseUrl) : fetchProperties.BaseUrl;
        Get(ParseFetchParameters(fetchProperties)).then((response) => {
          response ? resolve(response) : reject('Error');
        });
        break;
      case 'PATCH':
        Patch(ParseFetchParameters(fetchProperties)).then((response) => {
          response ? resolve(response) : reject('Error');
        });
        break;
      case 'PUT':
        Put(ParseFetchParameters(fetchProperties)).then((response) => {
          response ? resolve(response) : reject('Error');
        });
        break;
      case 'DELETE':
        Delete(ParseFetchParameters(fetchProperties)).then((response) => {
          response ? resolve(response) : reject('Error');
        });
        break;
      default:
        break;
    }
  });
}

function UrlRegex(url) {
  const regex = /\?id=\b.*\b\&/gm;
  const str = url;
  let m;
  if (url.indexOf('/api/') === -1) {
    while ((m = regex.exec(str)) !== null) {
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      m.forEach((match, groupIndex) => {
        var idVal = match.replace('?id=', '').replace('&', '');
        url = url.replace(match, '(' + idVal + ')?');
      });
    }
  }
  return url;
}

function ParseFetchParameters(fetchProperties) {
  fetchProperties.BaseUrl = !fetchProperties.BaseUrl.includes('?id=') || !globals.REMOTE_INSTANCE ? fetchProperties.BaseUrl : ConvertUrlSyntax(fetchProperties.BaseUrl);

  // if(getCookie('x_universal_id') && !fetchProperties.HeaderVals['Authorization']){
  //     fetchProperties.HeaderVals['Authorization'] = 'Bearer ' + getCookie('x_universal_id');
  // }

  if (globals.SITEMINDER_AUTH) {
    ResolveHeadersForSiteminder(fetchProperties);
  }

  fetchProperties.UseCredentials = fetchProperties.UseCredentials
    ? fetchProperties.UseCredentials
    : fetchProperties.BaseUrl.toLowerCase().includes(globals.API_MAN_ENV_VAR)
    ? 'include'
    : 'omit';

  var apimURLs = globals.REMOTE_APIM_URLS;
  var base = fetchProperties.BaseUrl.toLowerCase();
  var apimFound = apimURLs.some((w) => base.indexOf(w) !== -1);

  let isLocal;
  if (globals.REMOTE_INSTANCE && apimFound) {
    isLocal = false;
  } else if (globals.REMOTE_INSTANCE) {
    isLocal = true;
  }

  if (
    globals.REMOTE_INSTANCE &&
    !fetchProperties.BaseUrl.includes('SessionManager/Initiate') &&
    !fetchProperties.BaseUrl.includes('auth/token') &&
    !fetchProperties.BaseUrl.includes('SessionManager/Resolve') &&
    isLocal
  ) {
    ResolveHeadersForRemoteInstance(fetchProperties);
  } else if (
    globals.REMOTE_INSTANCE &&
    !fetchProperties.BaseUrl.includes('SessionManager/Initiate') &&
    !fetchProperties.BaseUrl.includes('auth/token') &&
    !fetchProperties.BaseUrl.includes('SessionManager/Resolve') &&
    !isLocal
  ) {
    ResolveHeadersForRemoteInstanceAPIM(fetchProperties);
  }

  fetchProperties.Mode = fetchProperties.Mode ? fetchProperties.Mode : 'cors';
  // Bmiller - because we are now allowing for detokenization and account detail click in the Authorization grid, needed to add accounts_tokenFilter cookie to this condition
  // Otherwise x-universal-directive will be overridden with D, ignoring what was passed in.
  if (
    fetchProperties.Method.toUpperCase() === 'GET' &&
    getCookie('accounts_tokenFilter') !== '' &&
    !JSON.parse(getCookie('accounts_tokenFilter')) &&
    !fetchProperties.hasOwnProperty('IgnoreDirective')
  ) {
    fetchProperties.HeaderVals['x-universal-directive'] = 'D';
  }

  return fetchProperties;
}

function Delete(parameters) {
  return new Promise((resolve, reject) => {
    fetch(parameters.BaseUrl, {
      headers: parameters.HeaderVals,
      mode: parameters.Mode,
      method: 'DELETE',
      credentials: parameters.UseCredentials,
    })
      .then((res) => {
        let suppressMessage = true;
        switch (parameters.ShowMessage) {
          case 'ON_FAIL':
            suppressMessage = res.ok ? true : false;
            break;
          case 'ALWAYS':
            suppressMessage = false;
            break;
          case 'NEVER':
            suppressMessage = true;
            break;
        }
        return validationManager.ResolveHTTPResponse(res, parameters.SuccessMessage, parameters.FailureMessage, suppressMessage);
      })
      .then((response) => {
        response ? resolve(response) : reject('Error');
      });
  });
}

function Get(parameters) {
  return new Promise((resolve, reject) => {
    fetch(parameters.BaseUrl, {
      headers: parameters.HeaderVals,
      mode: parameters.Mode,
      method: 'GET',
      credentials: parameters.UseCredentials,
    })
      .then((res) => {
        let suppressMessage = true;
        switch (parameters.ShowMessage) {
          case 'ON_FAIL':
            suppressMessage = res.ok ? true : false;
            break;
          case 'ALWAYS':
            suppressMessage = false;
            break;
          case 'NEVER':
            suppressMessage = true;
            break;
        }
        return validationManager.ResolveHTTPResponse(res, parameters.SuccessMessage, parameters.FailureMessage, suppressMessage);
      })
      .then((response) => {
        response ? resolve(response) : reject('Error');
      });
  });
}

function Put(parameters) {
  return new Promise((resolve, reject) => {
    fetch(parameters.BaseUrl, {
      headers: parameters.HeaderVals,
      mode: parameters.Mode,
      method: 'PUT',
      credentials: parameters.UseCredentials,
      body: JSON.stringify(parameters.CallBody),
    })
      .then((res) => {
        let suppressMessage = true;
        switch (parameters.ShowMessage) {
          case 'ON_FAIL':
            suppressMessage = res.ok ? true : false;
            break;
          case 'ALWAYS':
            suppressMessage = false;
            break;
          case 'NEVER':
            suppressMessage = true;
            break;
        }
        return validationManager.ResolveHTTPResponse(res, parameters.SuccessMessage, parameters.FailureMessage, suppressMessage);
      })
      .then((response) => {
        response ? resolve(response) : reject('Error');
      });
  });
}

function Post(parameters) {
  return new Promise((resolve, reject) => {
    fetch(parameters.BaseUrl, {
      headers: parameters.HeaderVals,
      mode: parameters.Mode,
      method: 'POST',
      credentials: parameters.UseCredentials,
      body: JSON.stringify(parameters.CallBody),
    })
      .then((res) => {
        let suppressMessage = true;
        switch (parameters.ShowMessage) {
          case 'ON_FAIL':
            suppressMessage = res.ok ? true : false;
            break;
          case 'ALWAYS':
            suppressMessage = false;
            break;
          case 'NEVER':
            suppressMessage = true;
            break;
        }
        return validationManager.ResolveHTTPResponse(res, parameters.SuccessMessage, parameters.FailureMessage, suppressMessage);
      })
      .then((response) => {
        response ? resolve(response) : reject('Error');
      });
  });
}

function Patch(parameters) {
  return new Promise((resolve, reject) => {
    fetch(parameters.BaseUrl, {
      headers: parameters.HeaderVals,
      mode: parameters.Mode,
      method: 'PATCH',
      credentials: parameters.UseCredentials,
      body: JSON.stringify(parameters.CallBody),
    })
      .then((res) => {
        let suppressMessage = true;
        switch (parameters.ShowMessage) {
          case 'ON_FAIL':
            suppressMessage = res.ok ? true : false;
            break;
          case 'ALWAYS':
            suppressMessage = false;
            break;
          case 'NEVER':
            suppressMessage = true;
            break;
        }
        return validationManager.ResolveHTTPResponse(res, parameters.SuccessMessage, parameters.FailureMessage, suppressMessage);
      })
      .then((response) => {
        response ? resolve(response) : reject('Error');
      });
  });
}

function ResolveHeadersForSiteminder(fetchProperties) {
  fetchProperties.HeaderVals['ClientID'] = globals.SITEMINDER_CLIENTID;
  fetchProperties.HeaderVals['Authorization'] = 'Bearer ' + getCookie('x_universal_id');
}

function ResolveHeadersForRemoteInstance(fetchProperties) {
  fetchProperties.HeaderVals['Content-Type'] = 'application/json';
  fetchProperties.HeaderVals['x-universal-user-id'] = globals.REMOTE_CLAIM.UserId ? globals.REMOTE_CLAIM.UserId : '';
  fetchProperties.HeaderVals['x-universal-firm-id'] = globals.REMOTE_CLAIM.FirmId ? globals.REMOTE_CLAIM.FirmId : '';
  fetchProperties.HeaderVals['x-universal-session-id'] = globals.REMOTE_CLAIM.SessionId ? globals.REMOTE_CLAIM.SessionId : '';
}

function ResolveHeadersForRemoteInstanceAPIM(fetchProperties) {
  fetchProperties.HeaderVals['Content-Type'] = 'application/json';
  fetchProperties.HeaderVals['Integrator-Key'] = globals.REMOTE_CLAIM.IntegratorKey ? globals.REMOTE_CLAIM.IntegratorKey : '';
  fetchProperties.UseCredentials = 'omit';
}

function ConvertUrlSyntax(url) {
  var convertedUrl = url;
  if (url.indexOf('/api/') === -1) {
    var urlSegments = url.split('id');
    convertedUrl = urlSegments[0].slice(0, -1) + '(' + urlSegments[1].substring(1) + ')';
  }

  return convertedUrl;
}
