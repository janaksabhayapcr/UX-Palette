import React, { Component, lazy } from 'react';
import Modal from 'react-modal';
import { BrowserRouter as Router, Switch, Route, Redirect, Link, withRouter } from 'react-router-dom';
import * as globals from './Globals/Variables';
import * as dataService from './Components/Utils/DataService';
import LoginError from './Components/Utils/LoginError';
import PermissionDenied from './Components/Utils/PermissionDenied';
import * as validationManager from './Components/Utils/ValidationManager';
import LogoutPage from './Components/Utils/LogoutPage';
import { rsaPublicKeyToPEM } from '../src/Components/Authorization/utils';
import * as AppModels from './AppModels';
import { getBaseURL, getCookie, loadJSON } from './Components/Utils/HelperFunctions';
import * as tokenModels from './Components/Utils/TokenModels';
import { pageRoutes } from './configs';
import NotFound from './Components/Utils/NotFound';
import ContainerBody, { webRoutes } from './Components/ContainerBody/ContainerBody';
import { ToastContainer } from 'react-toastify';
import './App.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';

const Spinner = require('react-spinkit');
const queryString = require('query-string');
var CryptoJS = require('crypto-js');
var jwt = require('jsonwebtoken');

let spinnerModalStyle = {
  overlay: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    zIndex: '1111',
    background: 'rgba(255, 255, 255, 0.2)',
  },
  content: {
    top: '40%',
    left: '12%',
    height: '75%',
    width: '75%',
    border: 'none',
    background: 'transparent',
  },
};

class App extends Component {
  constructor() {
    super();
    if (getCookie('externalDataLoaded') === '') {
      document.cookie = `externalDataLoaded=false;path=/;${globals.SAMESITECOOKIE}`;
    }
    if (getCookie('path') === '') {
      document.cookie = `path=regular;path=/;${globals.SAMESITECOOKIE}`;
    }
    this.state = {
      authStatus: false,
      services: null,
      authorizing: false,
      successfullLoad: 0,
      linkerUDInstance: false,
      loading: true,
      showHeader: false,
      clearLoader: false,
      //The application has two modes of lauching. Driven by query parameter: ?mode=
      //1) standard - user is routed to /enroll (default)
      //2) extenal - temporary account and external CRM data is created prior to loading
      mode: '',
      path: '',
    };
  }

  componentDidMount() {}

  componentDidUpdate(nextProps, nextState) {
    //Set the mode the appliction is set to run in specified in query parameter: ?mode=
    if (this.state.mode === '') {
      //To prevent infinite loop make sure we only update once when its empty
      //Set it to the value passed in ?mode=
      if (queryString.parse(window.location.search).mode) {
        document.cookie = `path=${queryString.parse(window.location.search).mode};path=/;${globals.SAMESITECOOKIE}`;
      }
      //If not provided default to standard
      else {
        this.setState({
          mode: 'regular',
          path: 'regular',
        });
      }
    }

    if (queryString.parse(window.location.search).linkerInstance && !this.state.linkerUDInstance) {
      if (queryString.parse(window.location.search).linkerInstance === 'true') {
        this.setState({
          linkerUDInstance: true,
        });
      }
    }
  }

  setSilentRefresh = (bool) => {
    if (bool) {
      this.refreshSession();
    }

    this.setState({
      silentRefresh: bool,
    });
  };

  logoutClear = () => {
    //Clear Session and local storage
    document.cookie = `x_universal_id=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;${globals.SAMESITECOOKIE}`;
    document.cookie = `x_universal_forceBoot=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;${globals.SAMESITECOOKIE}`;
    document.cookie = `x_universal_iframe=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;${globals.SAMESITECOOKIE}`;
    document.cookie = `path=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;${globals.SAMESITECOOKIE}`;
    document.cookie = `externalDataLoaded=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;${globals.SAMESITECOOKIE}`;
    localStorage.clear();
    sessionStorage.clear();
  };

  logoutForce = () => {
    this.setState({ loading: false });

    this.logoutClear();

    if (globals.B2C_TENANT) {
      //For b2c
      window.location.href = globals.B2C_LOGOUT_POLICY_URL.replace('{domain}', getBaseURL());
    } else {
      //otherwise route to normal logout and show
      window.location.href = window.location.origin + '/logout';
    }
  };

  logout = () => {
    if (window.navigator.onLine) {
      this.setState({ loading: true });

      this.logoutClear();

      if (this.state.services) {
        let body = { ReferenceID: this.state.crmData ? this.state.crmData.advisorID : '' };
        AppModels.cleanupSignersForReferenceID(this.state.services, body).then((response) => {
          let getSessionFetchProperties = {
            BaseUrl: `${this.state.services.Dashboard.URL}/SESSION?id=${this.state.user.sessionId}`,
            CallBody: {
              EndDate: new Date().toISOString().slice(0, 19).concat('Z'),
            },
            Method: 'PATCH',
            SuccessMessage: 'Request Successful',
            FailureMessage: 'Request Failed',
            SuppressMessageOverride: false,
            ShowMessage: globals.ON_FAIL,
            HeaderVals: {
              'Content-Type': 'application/json',
              'Ocp-Apim-Subscription-Key': this.state.services.Dashboard.subscription_key,
            },
          };
          dataService.FetchData(getSessionFetchProperties).then((res) => {
            // BMILLER - DEV-1143 removing loading set to false, we are using an href to route to logout and aren't using this loading state.
            // this.setState({ loading: false });
            this.routeToLogout();
          });
        });
      } else {
        // BMILLER - DEV-1143 removing loading set to false, we are using an href to route to logout and aren't using this loading state.
        // this.setState({ loading: false });
        this.routeToLogout();
      }
    } else {
      this.setState({ loading: false });
      document.cookie = `x_universal_forceBoot=true;${globals.SAMESITECOOKIE}`;
    }
  };

  routeToLogout = () => {
    if (this.state.user.firmPolicies[globals.UI_ENROLLMENT_CLOSEONLOGOUT] && this.state.user.firmPolicies[globals.UI_ENROLLMENT_CLOSEONLOGOUT].Value === 'true') {
      window.close();
    } else if (globals.B2C_TENANT) {
      window.location.href = globals.B2C_LOGOUT_POLICY_URL.replace('{domain}', getBaseURL());
    }

    window.location.href = window.location.origin + '/logout';
  };

  updateBody = () => {
    this.forceUpdate();
  };

  getContext = () => {
    let context = '';
    for (var i = 0; i < this.state.context.length; i++) {
      if (this.state.context[i].ContextType === 'CONTEXT') {
        context = context + '{' + this.state.context[i].ParameterLabel + '}: ' + this.state.context[i].Value + '\n';
      }
    }
    return context;
  };

  setAuthStatus = (authStatus, claim, authorizing) => {
    if (this.getCookie('x_universal_forceBoot')) {
      //this.logout();
    } else {
      let body = {};

      if (!globals.SITEMINDER_AUTH) {
        if (claim.source) {
          if (claim.source === 'SSO') {
            body = {
              SubscriberId: claim[globals.OIDC_CONTEXT_CLAIM] + '|' + claim[globals.OIDC_VALUE_CLAIM],
              SessionType: 'COOKIE',
            };
          } else {
            body = {
              SubscriberId: claim[globals.OIDC_VALUE_CLAIM],
              SessionType: 'COOKIE',
            };
          }
        } else {
          body = {
            SubscriberId:
              claim.aud === globals.B2C_CLIENT_ID
                ? claim[globals.OIDC_VALUE_CLAIM]
                : parseInt(globals.OIDC_CONTEXT_CLAIM)
                ? globals.OIDC_CONTEXT_CLAIM + '|' + claim[globals.OIDC_VALUE_CLAIM]
                : claim[globals.OIDC_CONTEXT_CLAIM] + '|' + claim[globals.OIDC_VALUE_CLAIM],
            SessionType: 'COOKIE',
          };
        }
      } else {
        body = {
          SubscriberId: claim[globals.OIDC_VALUE_CLAIM],
          SessionType: 'COOKIE',
        };
      }

      let getSessionFetchProperties = {
        BaseUrl: globals.GET_SESSION_URL,
        CallBody: body,
        Method: 'POST',
        SuccessMessage: 'Request Successful',
        FailureMessage: 'Request Failed',
        SuppressMessageOverride: false,
        ShowMessage: globals.ON_FAIL,
        HeaderVals: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': globals.SUB_KEY,
          'x-universal-firm-secret': globals.SESSION_KEY,
        },
      };

      dataService
        .FetchData(getSessionFetchProperties)
        .then((response) => {
          if (!response.error) {
            let sessionInformation = response.body;
            if (globals.REMOTE_INSTANCE) {
              globals.REMOTE_CLAIM.UserId = sessionInformation.UserId;
              globals.REMOTE_CLAIM.FirmId = sessionInformation.FirmId;
              globals.REMOTE_CLAIM.SessionId = sessionInformation.SessionId;
              // Use Token returned from session initiate...
              globals.REMOTE_CLAIM.IntegratorKey = `x-universal-session=${sessionInformation.Token}`;
            }
            let servicesFetchProperties = {
              BaseUrl: `${sessionInformation.Dashboard[0].URL}/SessionManager/Services`,
              Method: 'GET',
              SuccessMessage: 'Request Successful',
              FailureMessage: 'Request Failed',
              SuppressMessageOverride: false,
              ShowMessage: globals.ON_FAIL,
              HeaderVals: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': sessionInformation.Dashboard[0].subscription_key,
              },
            };

            dataService.FetchData(servicesFetchProperties).then((response) => {
              if (!response.error) {
                let servicesResponse = response.body;
                let services = {};

                for (let s in servicesResponse) {
                  services[servicesResponse[s].Name] = servicesResponse[s];
                }

                this.setState({
                  services,
                });
                localStorage.setItem('services', JSON.stringify(services));

                let userFetchProperties = {
                  BaseUrl: `${services.DashboardAPI.URL}/SessionManager/User`,
                  Method: 'POST',
                  SuccessMessage: 'Request Successful',
                  FailureMessage: 'Request Failed',
                  SuppressMessageOverride: false,
                  ShowMessage: globals.ON_FAIL,
                  HeaderVals: {
                    'Content-Type': 'application/json',
                    'Ocp-Apim-Subscription-Key': services.DashboardAPI.subscription_key,
                  },
                  CallBody: {
                    SessionId: sessionInformation.SessionId,
                    SessionTypeId: sessionInformation.SessionTypeId,
                  },
                };

                dataService.FetchData(userFetchProperties).then((response) => {
                  if (!response.error) {
                    let user = response.body;
                    let roles = user.Roles;
                    delete user['Roles'];
                    this.setState({
                      user,
                      roles,
                    });
                    this.setTheme(user.theme);
                    let logBody = {
                      FirmId: user.FirmId,
                      UserId: user.userId,
                      SessionId: user.sessionId,
                      'Ocp-Apim-Subscription-Key': services.Dashboard.subscription_key,
                      Url: services.Dashboard.URL,
                    };

                    this.setState({
                      logBody,
                    });

                    let getContextFetchProperties = {
                      BaseUrl: `${services.DashboardAPI.URL}/SessionManager/GetContext`,
                      Method: 'POST',
                      SuccessMessage: 'Request Successful',
                      FailureMessage: 'Request Failed',
                      SuppressMessageOverride: false,
                      ShowMessage: globals.ON_FAIL,
                      HeaderVals: {
                        'Content-Type': 'application/json',
                        'Ocp-Apim-Subscription-Key': services.DashboardAPI.subscription_key,
                      },
                      CallBody: {
                        SessionId: sessionInformation.SessionId,
                      },
                    };

                    dataService.FetchData(getContextFetchProperties).then((response) => {
                      if (!response.error) {
                        let context = response.body;
                        this.setState({
                          context,
                          authStatus,
                          authorizing,
                        });

                        let assetTypeFetchProperties = {
                          BaseUrl: `${services.Dashboard.URL}/ASSET_TYPE`,
                          Method: 'GET',
                          SuccessMessage: 'Request Successful',
                          FailureMessage: 'Request Failed',
                          SuppressMessageOverride: false,
                          ShowMessage: globals.ON_FAIL,
                          HeaderVals: {
                            'Content-Type': 'application/json',
                            'Ocp-Apim-Subscription-Key': services.Dashboard.subscription_key,
                          },
                          //SkipValidation: true,
                        };

                        dataService.FetchData(assetTypeFetchProperties).then((json) => {
                          let assetTypes = json.body.value;
                          this.setState({
                            assetTypes,
                          });

                          let scopeTypeFetchProperties = {
                            BaseUrl: `${services.Dashboard.URL}/SCOPE_TYPE`,
                            Method: 'GET',
                            SuccessMessage: 'Request Successful',
                            FailureMessage: 'Request Failed',
                            SuppressMessageOverride: false,
                            ShowMessage: globals.ON_FAIL,
                            HeaderVals: {
                              'Content-Type': 'application/json',
                              'Ocp-Apim-Subscription-Key': services.Dashboard.subscription_key,
                            },
                          };

                          dataService.FetchData(scopeTypeFetchProperties).then((json) => {
                            let scopeTypes = json.body.value;
                            this.setState({
                              scopeTypes,
                            });

                            this.setUserRoles();
                          });
                        });

                        let firmId = '';
                        for (var k in context) {
                          if (context[k].Parameter === 'firm-id') {
                            firmId = context[k].Value;
                            this.setState({ firmId });
                          }
                        }
                      } else {
                      }
                    });
                  } else {
                  }
                });
              } else {
              }
            });
          } else {
          }
        })
        .catch((err) => {
          validationManager.CustomAlert(true, 'UNKNOWN ERROR', 'Exception Caught');
          //this.routeToLogout();
          return;
        });
    }
  };

  setTheme = (theme) => {
    var head = document.head;
    var link = document.createElement('link');
    link.rel = 'stylesheet';

    if (theme) {
      link.href = `${globals.CDN_BASE_URL}css/${theme}`;
      head.insertAdjacentElement('afterbegin', link);
    } else {
      link.href = `${globals.CDN_BASE_URL}css/dark.css`;
      head.insertAdjacentElement('afterbegin', link);
    }

    // if(theme) {
    //   link.href = `${globals.CDN_BASE_URL}css/${theme}`;
    //   head.insertAdjacentElement('afterbegin',link)
    // } else {
    //   link.href = `${globals.CDN_BASE_URL}${globals.CDN_CSS_FILE}`;
    //   head.insertAdjacentElement('afterbegin',link)
    // }
  };

  async setUserRoles() {
    let roleFetchProperties = {
      BaseUrl: `${this.state.services.Dashboard.URL}/ROLE`,
      Method: 'GET',
      SuccessMessage: 'Request Successful',
      FailureMessage: 'Request Failed',
      SuppressMessageOverride: false,
      ShowMessage: globals.ON_FAIL,
      HeaderVals: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': this.state.services.Dashboard.subscription_key,
      },
    };

    let allRoles = await dataService.FetchData(roleFetchProperties);
    await this.asyncSetState({
      allRoles: allRoles.value,
    });

    let userRoles = [];
    for (let i in allRoles.value) {
      for (let j in this.state.roles) {
        if (this.state.roles[j].RoleId === allRoles.value[i].RoleId) {
          userRoles.push({ Name: allRoles.value[i].Name, RoleId: allRoles.value[i].RoleId });
        }
      }
    }

    await this.asyncSetState({ userRoles });

    //If the application is in 'external' mode. Send a message to the invoker so they
    //become aware that the enrollment tool was successfully authenticated and is now
    //listening for the data to come in from the external resource.
    if (getCookie('path') !== 'regular' && getCookie('externalDataLoaded') === 'false') {
      //Enroll Mode
      if (getCookie('path') === 'enroll') {
        //If the payload came via SSO then create the user
        this.handleExternalCRMCreate({ data: this.state.user.temp });
      }
      //View mode
      else if (getCookie('path') === 'view') {
        await this.processCRMData(this.state.user.temp);
        document.cookie = `externalDataLoaded=true;path=/;${globals.SAMESITECOOKIE}`;
        this.setState({
          loading: false,
        });
      }
      //Otherwise listen to the CRM information
      else if (getCookie('path') === 'external') {
        //Keep console.log for privacy hub debugging.
        console.log('Posting notification message to: ' + globals.PARENT_ORIGIN);
        //Add the event listener
        window.addEventListener('message', (e) => this.handleExternalCRMCreate(e));
        //Tell the parent window that enrollment is ready
        window.parent.postMessage('Listening', globals.PARENT_ORIGIN);
        //Keep console.log for privacy hub debugging.
        console.log('Notification posted to: ' + globals.PARENT_ORIGIN);
      }
    }
    //If the application is in 'standard' mode, this point indicates successfull load. Kill spinner
    else {
      //On refresh - if there is CRM Data - add to state
      if (this.state.user.temp) {
        await this.processCRMData(this.state.user.temp);
      }

      this.setState({
        loading: false,
      });
    }
  }

  async handleExternalCRMCreate(message) {
    //Keep console.log for privacy hub debugging.
    console.log('Received message from: ' + message.origin);
    console.log('Message: ' + message.data);

    //If not allowed return parent origin do not continue with enrollment
    if (getCookie('path') === 'external' && message.origin !== globals.PARENT_ORIGIN) {
      console.log('Error: Invalid Parent Origin');
      this.setState({
        loading: false,
        permissionDenied: true,
      });
      return;
    }

    if (message.data) {
      //Create the account & signers passed in by the external application.
      let response = await AppModels.persistExternalData(this.state.services, JSON.parse(message.data));

      if (!response.error) {
        await this.processCRMData(message.data);
        document.cookie = `externalDataLoaded=true;path=/;${globals.SAMESITECOOKIE}`;
        this.setState({
          loading: false,
        });
      } else {
        console.log('Error: Unable to process CRM data: ' + JSON.stringify(response.body));
        this.setState({
          loading: false,
          permissionDenied: true,
        });
      }
    } else {
      console.log('Error: No CRM data provided');
      this.setState({
        loading: false,
        permissionDenied: true,
      });
    }
  }

  async processCRMData(data) {
    let temp = JSON.parse(data);
    let advisorName = temp.AdvisorName;
    let clientName = temp.ClientName ? (temp.ClientName.replace(/\s/g, '').length !== 0 ? temp.ClientName : null) : null;
    let advisorID = temp.FirmAdvisorID;
    let firmRelationshipID = temp.FirmRelationshipID;
    let teamID = temp.TeamID;
    let advisorEmail = temp.AdvisorEmail;
    let body = {
      Registry: [],
    };
    if (firmRelationshipID) {
      body.Registry.push({
        Value: firmRelationshipID,
        Context: this.state.user.FirmId,
        Type: 'SHA-256',
        ProcessId: 1,
      });
    }
    if (advisorID) {
      body.Registry.push({
        Value: advisorID,
        Context: this.state.user.FirmId,
        Type: 'SHA-256',
        ProcessId: 2,
      });
    }
    if (teamID) {
      body.Registry.push({
        Value: teamID,
        Context: this.state.user.FirmId,
        Type: 'SHA-256',
        ProcessId: 2,
      });
    }
    let user = this.state.user;
    let services = this.state.services;
    let response = await tokenModels.postTokens({ user, services, body });

    //If Advisor email is provided update user's team email.
    if (advisorEmail) {
      await AppModels.updateUserTeamEmail(user, services, advisorEmail);
    }

    let crmData = {
      advisorName,
      clientName,
      advisorID,
      firmRelationshipID,
      teamID,
      firmRelationshipIDToken: firmRelationshipID ? response : null,
      advisorIDToken: advisorID ? response : null,
      teamIDToken: teamID ? response : null,
    };
    await this.asyncSetState({
      crmData,
    });
  }

  asyncSetState = (newState) => {
    return new Promise((resolve) => {
      this.setState(newState, () => {
        resolve();
      });
    });
  };

  setQueryParams = (response) => {
    var regex = /.*#state=(.*)\&.*/;
    var query = response.replace(regex, '$1');

    this.setState({
      incomingLayout: query,
    });
  };

  setContextParameter = (context, value) => {
    var contextId = null;
    var tempContextList = this.state.context;

    for (var i in tempContextList) {
      if (tempContextList[i].Parameter === context) {
        contextId = tempContextList[i].ContextId;
        tempContextList[i].Value = value;
      }
    }
    this.setContext(tempContextList);
    let contextFetchProperties = {
      BaseUrl: `${this.state.services.Dashboard.URL}/CONTEXT?id=${contextId}`,
      Method: 'PATCH',
      SuccessMessage: 'Request Successful',
      FailureMessage: 'Request Failed',
      SuppressMessageOverride: false,
      ShowMessage: globals.ON_FAIL,
      HeaderVals: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': this.state.services.Dashboard.subscription_key,
      },
      CallBody: {
        Value: value,
      },
    };
    dataService.FetchData(contextFetchProperties);
  };

  updateContext = (hierID, entityID, accountID) => {
    let tempContext = this.state.context;
    for (var i = 0; i < tempContext.length; i++) {
      if (tempContext[i].Parameter === 'hierarchy-id' && hierID !== null) {
        tempContext[i].Value = hierID;
        let body = {
          Value: tempContext[i].Value,
          UpdateBy: this.state.user.userId,
          UpdateDate: new Date().toISOString().slice(0, 19).concat('Z'),
        };

        let contextFetchProperties = {
          BaseUrl: `${this.state.services.Dashboard.URL}/CONTEXT?id=${tempContext[i].ContextId}`,
          Method: 'PATCH',
          SuccessMessage: 'Request Successful',
          FailureMessage: 'Request Failed',
          SuppressMessageOverride: false,
          ShowMessage: globals.ON_FAIL,
          HeaderVals: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': this.state.services.Dashboard.subscription_key,
          },
          CallBody: {
            body,
          },
        };

        dataService.FetchData(contextFetchProperties);
      }
      if (tempContext[i].Parameter === 'entity-id' && entityID !== null) {
        tempContext[i].Value = entityID;
        let body = {
          Value: tempContext[i].Value,
          UpdateBy: this.state.user.userId,
          UpdateDate: new Date().toISOString().slice(0, 19).concat('Z'),
        };
        body = JSON.stringify(body);

        let contextFetchProperties2 = {
          BaseUrl: `${this.state.services.Dashboard.URL}/CONTEXT?id=${tempContext[i].ContextId}`,
          Method: 'PATCH',
          SuccessMessage: 'Request Successful',
          FailureMessage: 'Request Failed',
          SuppressMessageOverride: false,
          ShowMessage: globals.ON_FAIL,
          HeaderVals: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': this.state.services.Dashboard.subscription_key,
          },
          CallBody: {
            body,
          },
        };

        dataService.FetchData(contextFetchProperties2);
      }
    }
    this.setContext(tempContext);
  };

  setContext = (context) => {
    this.setState({
      context,
    });
  };

  routeToLogin = () => {
    this.setState({ authorizing: true });
  };

  getCookie(cname) {
    var name = cname + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  checkSession = () => {
    let sessionToken = this.getCookie('x_universal_id');

    //Make sure all cached components exist for a valid session
    if (sessionToken && localStorage.getItem('key')) {
      return sessionToken;
    } else {
      return false;
    }
  };

  async refreshSession() {
    var token = null;
    var code = null;

    var decodedToken = jwt.decode(this.getCookie('x_universal_id'), { complete: true });
    //Make sure JWT is valid and extract code
    if (decodedToken) {
      code = decodedToken.payload.id;
    }

    //Get the JWT
    let body = { code };
    let response = await AppModels.getToken({ body });

    if (!response.error) {
      token = response.body.id_token;
      document.cookie = `x_universal_id=${token};path=/;${globals.SAMESITECOOKIE}}`;
    }
  }

  clearLoader = () => {
    this.setState({ clearLoader: true });
  };
  render() {
    let { loading, permissionDenied, path, clearLoader } = this.state;
    let mode = getCookie('path');
    let externalDataLoaded = getCookie('externalDataLoaded');
    //Prevent app from loading if permission is denied.
    if (permissionDenied) {
      return <PermissionDenied />;
    }
    //Render the app
    return (
      <div>
        {/* Keep the spinner on the screen while loading the application. This behavior differs between application modes
            1) Standard - Application is considered to be loaded once authentication is successfull and reference data is loaded
            2) External - Application is considered to be loaded once external application sends its data and enrollment persists it.
        */}
        <Modal
          isOpen={clearLoader !== true && window.location.pathname !== '/logout' && ((mode === 'regular' && loading) || (mode !== 'regular' && (loading || externalDataLoaded === 'false')))}
          style={spinnerModalStyle}
        >
          <center>
            <Spinner id="view-spinner" name="line-scale-pulse-out-rapid" color="#315B7B" />
          </center>
        </Modal>

        <Router>
          <div className={!loading && 'app-wrapper'}>
            {!loading && (
              <div id="header-wrapper" className="header-wrapper">
                {/* {this.renderHeader()} */}
              </div>
            )}
            {this.state.silentRefresh ? (
              <iframe
                key={Math.random()}
                id={Math.random()}
                src={globals.B2C_LOGIN_SIGNUP_POLICY_URL.replace('{domain}', getBaseURL()) + '&state=refresh'}
                style={{ position: 'absolute', visibility: 'hidden' }}
              />
            ) : null}
            <Switch>
              {(mode === 'regular' && !loading) || (mode !== 'regular' && !loading && externalDataLoaded === 'true') ? (
                <div className="app-body">
                  <ToastContainer className="toast-container" />
                  
                  <ContainerBody
                    mode={mode}
                    path={path}
                    accountID={this.state.accountID}
                    linkerUDInstance={this.state.linkerUDInstance}
                    services={this.state.services}
                    authStatus={this.state.authStatus}
                    user={this.state.user}
                    context={this.state.context}
                    logBody={this.state.logBody}
                    roles={this.state.roles}
                    statusList={this.state.statusList}
                    userStatuses={this.state.userStatuses}
                    userRoles={this.state.userRoles}
                    setContext={this.setContext}
                    setContextParameter={this.setContextParameter}
                    crmData={this.state.crmData}
                  />
                </div>
              ) : null}
              <Route
                path="/login"
                render={(routeProps) => <Login {...routeProps} setAuthStatus={this.setAuthStatus} checkSession={this.checkSession} setSilentRefresh={this.setSilentRefresh} />}
              />

              <Route path="/authorize" render={(routeProps) => <Authorize {...routeProps} setAuthStatus={this.setAuthStatus} setSilentRefresh={this.setSilentRefresh} />} />
              <Route path="/sso" render={(routeProps) => <SSO {...routeProps} setAuthStatus={this.setAuthStatus.bind(this)} setSilentRefresh={this.setSilentRefresh} />} />
              <Route path="/authenticate" render={(routeProps) => <Authenticate {...routeProps} setAuthStatus={this.setAuthStatus.bind(this)} setSilentRefresh={this.setSilentRefresh} />} />
              <Route exact path="/logout" component={Logout} />
              <Route exact path="/logoutsession" render={this.logoutForce.bind(this)} />

              {webRoutes.map((route) => (
                <PrivateRoute exact path={`${route.path}`} component={Home} />
              ))}

              <Route render={(routeProps) => <NotFound {...routeProps} displayHeader={true} clearLoader={this.clearLoader} />} />
            </Switch>
          </div>
        </Router>
        {/* {(mode === 'regular' && !loading) || (mode !== 'regular' && !loading && externalDataLoaded === 'true') ? <div className="site-footer">INTERNAL USE ONLY</div> : null} */}
      </div>
    );
  }
}

/*******************************************************************************/
//Entry point to Application. All unathenticated requests go through /login path
/*******************************************************************************/
export class Login extends React.Component {
  state = {
    authSuccessful: false,
    incomingPath: '/',
  };

  /*******************************************************************************/
  //Entry point to Login. Executes after component is mounted into the DOM.
  /*******************************************************************************/
  async componentDidMount() {
    //Get the incoming path from the URL so user can be redirected correctly after authentication.
    let incomingPath = this.props.location && this.props.location.state ? this.props.location.state.referrer : '';
    //Redirect user to homepage if not specified.
    if (!incomingPath || incomingPath === '/') {
      incomingPath = pageRoutes.palette_platform;
    }
    this.setState({
      incomingPath,
    });

    //Get x_universal_id from cookies.
    //When a user logs into the system we store the JWT as x_universal_id cookie so we can keep track of the user session.
    //If this cookie is set we have to see if session is still valid. Otherwise user cannot proceed and must re-authenticate.
    let activeSessionToken = this.props.checkSession();

    //If x_universal_id is set and JWT is present for authentication, validate the user's current session
    if (activeSessionToken) {
      //Call jwt.verify from jsonwebtoken node module
      jwt.verify(
        activeSessionToken, //JWT Token
        localStorage.getItem('key'), //Public key stored in local storage
        {
          algorithms: ['RS256'], //Algorithm used to verify JWT signature
          clockTimestamp: Math.ceil(Date.now() / 1000) + 180, //Time in seconds that should be used as the current time for all necessary comparisons
          ignoreNotBefore: true, //Ignores NBF of token
        },
        (err, decoded) => {
          if (err) {
            console.log('Error: ', err);
            //Set the force boot cookie to boot user out of application.
            document.cookie = `x_universal_forceBoot=true;${globals.SAMESITECOOKIE}`;
            //Fail authentication
            this.props.setAuthStatus(false, decoded, false);
            AuthManager.authenticate(() => {
              this.setState(() => ({
                authSuccessful: false,
              }));
            });
          } else {
            //Get the time difference between the current token expiration date and now in minutes.
            var expiresIn = (new Date(decoded.exp * 1000).getTime() - new Date().getTime()) / 60000;
            //If the token expires in less than or equal to 15 mins send out a silent refresh for B2C to refresh the token.
            if (expiresIn <= 15) {
              setTimeout(() => {
                this.props.setSilentRefresh(true);
              }, 5000);
            }
            //Proceed to authentication of the incoming user against PCR's user directory.
            this.props.setAuthStatus(true, decoded, true);
            AuthManager.authenticate(() => {
              this.setState(() => ({
                authSuccessful: true,
              }));
            });
          }
        }
      );
    }
    //If the user does not have an existing session route them to login screen.
    else {
      //Siteminder login URL
      if (globals.SITEMINDER_AUTH) {
        ////IF DEVELOPING LOCALLY, use this to emulate the SiteMinder cookie
        //document.cookie = "userid=vfragola;path=/";
        window.location = globals.SITEMINDER_LOGIN_URL;
      }
      //Remote OIDC login
      else if (globals.REMOTE_OIDC_AUTH) {
        window.location = globals.REMOTE_OIDC_AUTHORIZE_URL;
      }
      //Default login screen (B2C)
      else {
        console.log(
          'globals.B2C_LOGIN_SIGNUP_POLICY_URL',
          globals.B2C_LOGIN_SIGNUP_POLICY_URL,
          globals.B2C_LOGIN_SIGNUP_POLICY_URL.replace('{domain}', getBaseURL()) + `&state=${incomingPath}`
        );
        window.location = globals.B2C_LOGIN_SIGNUP_POLICY_URL.replace('{domain}', getBaseURL()) + `&state=${incomingPath}`;
      }
    }
  }

  /*******************************************************************************/
  //Render method
  /*******************************************************************************/
  render() {
    const { authSuccessful, incomingPath } = this.state;

    //Authentication complete. If app needs to be routed to an incoming path passed in by user do so.
    if (authSuccessful === true) {
      return <Redirect to={`${incomingPath}`} />;
    }
    //Otherwise check session and display authorizing screen.
    else {
      return this.props.checkSession() ? null : (
        <div className="authorize">
          <div className="c">
            <div className="_404"></div>
            <div className="_2">Authorizing...</div>
          </div>
        </div>
      );
    }
  }
}

class Logout extends React.Component {
  componentDidMount() {
    document.cookie = `x_universal_forceBoot=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;${globals.SAMESITECOOKIE}`;
    document.cookie = `x_universal_id=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;${globals.SAMESITECOOKIE}`;
    document.cookie = `path=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;${globals.SAMESITECOOKIE}`;
    document.cookie = `externalDataLoaded=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;${globals.SAMESITECOOKIE}`;
    localStorage.clear();
  }
  render() {
    return <LogoutPage />;
  }
}

class Home extends React.Component {
  render() {
    return <div />;
  }
}

class Authorize extends React.Component {
  state = {
    authSuccessful: false,
    incomingPath: pageRoutes.palette_platform,
  };

  /*******************************************************************************/
  //Entry point to Authorization. Executes after component is mounted into the DOM.
  /*******************************************************************************/
  async componentDidMount() {
    //For SiteMinder Authentication get userid Cookie and authenticate.
    if (globals.SITEMINDER_AUTH) {
      var claim = {};

      claim.userId = atob(decodeURIComponent(document.location.toString().split('XQX|')[1]));

      claim.sub = claim.userId;
      this.props.setAuthStatus(true, claim, true);
      AuthManager.authenticate(() => {
        this.setState(() => ({
          authSuccessful: false,
        }));
      });
    }
    //Else if remote OpenIDConnect flow
    else if (globals.REMOTE_OIDC_AUTH) {
      //If IdP returns an error log to user.
      if (queryString.parse(window.location.search).error) {
        this.setState({ loginError: true, errorCode: 'U100' });
        // console.log(queryString.parse(window.location.search).error + ': ' + queryString.parse(window.location.search).error_description)
        return;
      } else {
        var tokenEndpoint = null;

        let authorizationCode = queryString.parse(window.location.search).code;
        //If code is not present error out.
        if (!authorizationCode) {
          this.setState({ loginError: true, errorCode: 'U101' });
          // console.log('Authorization code missing: ' + authorizationCode)
          return;
        }

        //Get the openId Configuration.
        try {
          if (globals.OIDC_LOCAL_CONFIG) {
            var accessJSON = null;
            accessJSON = await loadJSON('access.json');
            accessJSON = JSON.parse(accessJSON);
            tokenEndpoint = accessJSON.token_endpoint;
          } else {
            var accessJSON = null;
            const accessResponse = await fetch(globals.REMOTE_OIDC_ACCESS_URL, { method: 'GET' });
            accessJSON = await accessResponse.json();
            tokenEndpoint = accessJSON.token_endpoint;
          }
        } catch (err) {
          //Any issues with the access URL should result in a login error.
          this.setState({ loginError: true, errorCode: 'U102' });
          return;
        }

        //Setup the variables to be passed into the token endpoint
        var details = {
          client_id: globals.REMOTE_OIDC_CLIENT_ID, //The identifier assigned to your app when you.
          grant_type: 'authorization_code', //Static value for authorization code flow
          code: authorizationCode, //The authorization_code received from login URL
          redirect_uri: globals.REMOTE_OIDC_REDIRECT_URL, //Redirect URI
        };

        //Encode and format the body
        var formBody = [];
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');

        //Make post to token endpoint
        fetch(tokenEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          },
          body: formBody,
        }).then((tokenResponse) => {
          //Validate response and extract token.
          if (tokenResponse.ok) {
            tokenResponse.json().then((body) => {
              this.setState(
                {
                  id_token: body.access_token,
                },
                () => {
                  this.authorize();
                }
              );
            });
          } else {
            this.setState({ loginError: true, errorCode: 'U103' });
            tokenResponse.json().then((body) => {
              console.log(body.toString());
            });
            return;
          }
        });
      }
    }
    //For other types of authentication (B2C or OpenIDConnect)
    else {
      if (this.props.location.hash !== '') {
        //B2C Cancel Action
        if (this.props.location.hash.indexOf(globals.CANCEL_CODE) !== -1) {
          window.location = globals.B2C_LOGIN_SIGNUP_POLICY_URL.replace('{domain}', getBaseURL());
        }
        //B2C Forgot Password
        else if (this.props.location.hash.indexOf(globals.FORGOT_PASSWORD_CODE) !== -1) {
          window.location = globals.B2C_PASSWORD_RESET_POLICY_URL.replace('{domain}', getBaseURL());
        }
        //B2C Server Error
        else if (this.props.location.hash.indexOf('server_error') !== -1) {
          this.setState({ loginError: true, errorCode: 'U104' });
        }
        //B2C or OpenIDConnect authentication validated for processing.
        else {
          this.setState(
            {
              id_token: this.props.location.hash.split('id_token=')[1],
            },
            () => {
              this.authorize();
            }
          );
        }
      }
    }
  }

  /*******************************************************************************/
  //For B2C and OpenIDConnect authentication. Decode JWT and and validate it.
  /*******************************************************************************/
  async authorize() {
    var accessUrl = null;
    var issuer = null;
    var jwksUrl = null;
    var keys = null;
    var encryptedAccess = false;

    //Decode the JWT from the URL
    var decodedToken = jwt.decode(this.state.id_token, { complete: true });

    //Make sure JWT is valid. Display error if not.
    if (!decodedToken) {
      this.setState({ loginError: true, errorCode: 'U105' });
      return;
    }

    //Set the path to route application to after successful authentication if incoming request dictates one (#state)
    //If hash URL
    if (this.props.location.hash.includes('#state')) {
      await this.setPath(this.props.location.hash);
    }
    //If query url
    if (queryString.parse(window.location.search).state) {
      await this.setPath(queryString.parse(window.location.search).state);
    }

    //Get access url to get further information about the authentication.
    //The access url will change per authentication type. We currently support 3 types.
    //  1) B2C multi-tenant authentication
    //  2) SSO OpenIDConnect multi-tenant authentication (PCR hosting Access file)
    //  3) SSO Remote OpenIDConnect single-tenant authentication (Client hosting Access file)
    switch (decodedToken.payload.aud) {
      //If the audience in the incoming token matches the B2C client ID of this application, use B2C Access URL
      case globals.B2C_CLIENT_ID:
        accessUrl = globals.ACCESS_URL;
        break;
      //If the audience in the incoming token matches the Remote OpenIDConnect audience, use remote oidc Access URL
      case globals.REMOTE_OIDC_AUDIENCE:
        accessUrl = globals.REMOTE_OIDC_ACCESS_URL; //get the REMOTE_OIDC_ACCESS_URL
        break;
      //Otherwise use OpenIDConnect multi-tenant authentication where the context attribute of the token is the firmid
      default:
        encryptedAccess = true;
        var ciphertext = CryptoJS.HmacSHA1(decodedToken.payload[globals.OIDC_CONTEXT_CLAIM], globals.DISCOVERY_KEY);
        var filename = ciphertext.toString().replace(/[^a-zA-Z ]/g, '');
        accessUrl = globals.CDN_BASE_URL + 'discovery/Keys/' + filename + 'Access.txt';
    }
    //Retrieve information from Access URL
    try {
      var accessJSON = null;

      if (globals.OIDC_LOCAL_CONFIG) {
        accessJSON = await loadJSON('access.json');
        accessJSON = JSON.parse(accessJSON);
        jwksUrl = accessJSON.jwks_uri;
      } else {
        const accessResponse = await fetch(accessUrl, { method: 'GET' });
        if (encryptedAccess) {
          accessJSON = await accessResponse.text();
          let bytes = CryptoJS.AES.decrypt(accessJSON, globals.DISCOVERY_KEY);
          let plaintext = bytes.toString(CryptoJS.enc.Utf8);
          accessJSON = JSON.parse(plaintext);
        } else {
          accessJSON = await accessResponse.json();
        }
        jwksUrl = accessJSON.jwks_uri.replace('{resource}', globals.CDN_BASE_URL);
      }
      issuer = accessJSON.issuer;
    } catch (err) {
      //Any issues with the access URL should result in a login error.
      console.log('Access attempt failed');
      console.log(err);
      this.setState({ loginError: true, errorCode: 'U106' });
      return;
    }

    //If issuer and jwksUrl are not populated after Access URL get, return error.
    if (!issuer || !jwksUrl) {
      this.setState({ loginError: true, errorCode: 'U107' });
      return;
    }
    //Get the keys to authenticate the request from the jwksUrl
    try {
      let keysJSON = null;

      if (globals.OIDC_LOCAL_CONFIG) {
        keysJSON = await loadJSON('keys.json');
        keysJSON = JSON.parse(keysJSON);
      } else {
        const keysResponse = await fetch(jwksUrl, { method: 'GET' });
        if (encryptedAccess) {
          keysJSON = await keysResponse.text();
          let bytes = CryptoJS.AES.decrypt(keysJSON, globals.DISCOVERY_KEY);
          let plaintext = bytes.toString(CryptoJS.enc.Utf8);
          keysJSON = JSON.parse(plaintext);
        } else {
          keysJSON = await keysResponse.json();
        }
      }
      keys = keysJSON.keys;
    } catch (err) {
      //Any issues with the jwksUrl should result in a login error.
      console.log('Key attempt failed');
      console.log(err);
      this.setState({ loginError: true, errorCode: 'U108' });
      return;
    }
    //If keys are not populated after jwksUrl get, return error.
    if (!keys || !keys.length) {
      this.setState({ loginError: true, errorCode: 'U109' });
      return;
    }

    //Map through list of possible valid signing keys and get public key
    const signingKeys = keys
      .filter((key) => key.use === 'sig' && key.kty === 'RSA' && key.kid && key.n && key.e)
      .map((key) => {
        return {
          kid: key.kid, //Key ID of JWE (JSON Web Encryption)
          x5t: key.x5t, //x.509 certificate thumbprint (JSON Web Encryption)
          nbf: key.nbf, //Not before timestamp of JWT (JSON Web Token)
          rsaPublicKey: rsaPublicKeyToPEM(key.n, key.e), //Public key generated from Modulus and Exponent from jwksUrl
        };
      });
    //If jwksUrl does not contain valid signing keys return error
    if (!signingKeys.length) {
      this.setState({ loginError: true, errorCode: 'U110' });
      return;
    }

    //Validate incoming JWT kid or x5t against valid signing key's kid or x5t
    const key = signingKeys.find((k) => (decodedToken.header.kid && k.kid === decodedToken.header.kid) || (decodedToken.header.x5t && k.x5t === decodedToken.header.x5t));

    //If key is valid attempt to validate entire token.
    if (key) {
      //Validate the incoming JWT token.
      this.validateToken(issuer, key.rsaPublicKey, this.state.id_token);
    }
    //If Kid is not valid return error
    else {
      this.setState({ loginError: true, errorCode: 'U111' });
      return;
    }
  }

  /*******************************************************************************/
  //Sets the path to be routed to upon successful authentication
  /*******************************************************************************/
  setPath = (url) => {
    return new Promise((resolve, reject) => {
      //Decode the path set in the state.
      var regex = /.*#state=(.*)\&.*/;
      var path = url.replace(regex, '$1');
      path = decodeURIComponent(path);

      //If the path is invalid or '/' route the user home.
      if (!path || path === '/') {
        path = pageRoutes.palette_platform;
      }

      //Set the incomingPath so we can route the user after authentication.
      this.setState(
        {
          incomingPath: path,
        },
        () => {
          resolve();
        }
      );
    });
  };

  /*******************************************************************************/
  //Validates JWT for B2C and OpenIDConnect authentication models.
  //     1)Verify JWT signature using RS256 algorithm and public key derived from jwksUrl.
  //     2)Match issuer from JWT against Access URL.
  //     3)Igonre NBF (Not Before) JTW attribute (We do this because of different server clocks)
  /*******************************************************************************/
  validateToken = (issuer, rsaPublicKey, idToken) => {
    //Call jwt.verify from jsonwebtoken node module
    jwt.verify(
      this.state.id_token, //JWT Token
      rsaPublicKey, //Public key derived from jwksUrl using module and exponent
      {
        algorithms: ['RS256'], //Algorithm used to verify JWT signature
        issuer: [issuer], //Issuer of JWT
        clockTimestamp: Math.ceil(Date.now() / 1000) + 180, //Time in seconds that should be used as the current time for all necessary comparisons
        ignoreNotBefore: true, //Ignores NBF of token
      },
      (err, decoded) => {
        //Any errors encountered during verification of token should result in booting the user.
        if (err) {
          console.log('Error: ', err);
          //Set the force boot cookie to boot user out of application.
          document.cookie = `x_universal_forceBoot=true;${globals.SAMESITECOOKIE}`;
          this.props.setAuthStatus(false, null, true);
          AuthManager.authenticate(() => {
            this.setState(() => ({
              authSuccessful: false,
            }));
          });
        }
        //Successful verification of token allows user into application
        else {
          //Save the JWT in the cookie for the duration of its lifetime to prevent authentication on every request.
          document.cookie = `x_universal_id=${idToken};path=/;expires=${new Date(decoded.exp * 1000).toUTCString()};${globals.SAMESITECOOKIE}`;
          //Save public key
          localStorage.setItem('key', rsaPublicKey);
          if (this.state.incomingPath === 'refresh') {
            //If this is a silent refresh request set the flag to false to prevent infinite loop.
            this.props.setSilentRefresh(false);
          } else {
            //Proceed to authentication of the incoming user against PCR's user directory.
            this.props.setAuthStatus(true, decoded, true);
            AuthManager.authenticate(() => {
              this.setState(() => ({
                authSuccessful: true,
              }));
            });
          }
        }
      }
    );
  };

  /*******************************************************************************/
  //Render method
  /*******************************************************************************/
  render() {
    const { authSuccessful, incomingPath } = this.state;

    //Authentication complete. If app needs to be routed to an incoming path passed in by user do so.
    if (authSuccessful === true) {
      return <Redirect to={`${incomingPath}`} />;
    }
    //If there was an error during authentication
    else if (this.state.loginError) {
      return <LoginError errorCode={this.state.errorCode} />;
    } else {
      return null;
    }
  }
}

export class SSO extends React.Component {
  state = {
    authSuccessful: false,
    incomingPath: pageRoutes.palette_platform,
  };

  /*******************************************************************************/
  //Entry point to Authorization. Executes after component is mounted into the DOM.
  /*******************************************************************************/
  async componentDidMount() {
    if (this.props.location.hash !== '') {
      var hash = window.location.hash.substr(1);
      var hashValues = hash.split('&').reduce(function (result, item) {
        var parts = item.split('=');
        result[parts[0]] = parts[1];
        return result;
      }, {});

      //B2C Cancel Action
      if (this.props.location.hash.indexOf(globals.CANCEL_CODE) !== -1) {
        window.location = globals.B2C_LOGIN_SIGNUP_POLICY_URL.replace('{domain}', getBaseURL());
      }
      //B2C Forgot Password
      else if (this.props.location.hash.indexOf(globals.FORGOT_PASSWORD_CODE) !== -1) {
        window.location = globals.B2C_PASSWORD_RESET_POLICY_URL.replace('{domain}', getBaseURL());
      }
      //B2C Server Error
      else if (hashValues.server_error) {
        this.setState({ loginError: true });
      }
      //B2C or OpenIDConnect authentication validated for processing.
      else {
        this.setState(
          {
            id_token: hashValues.id_token,
          },
          () => {
            if (hashValues.state !== 'refresh') {
              this.authorize();
            } else {
              window.close();
            }
          }
        );
      }
    }
  }

  /*******************************************************************************/
  //Forward the incoming token to be validated in the backend
  /*******************************************************************************/
  async authorize() {
    //Decode the JWT from the URL
    let idToken = this.state.id_token;
    var decodedToken = jwt.decode(idToken, { complete: true });

    //Make sure JWT is valid. Display error if not.
    if (!decodedToken) {
      this.setState({ loginError: true });
      return;
    }

    let body = {
      code: idToken,
      grantType: 'Code',
    };
    let response = await AppModels.getCode({ body });

    if (response.body && response.body.code) {
      //Set the path to route application to after successful authentication if incoming request dictates one (#state)
      //If hash URL
      if (this.props.location.hash.includes('#state')) {
        await this.setPath(this.props.location.hash);
      }
      window.location.href = getBaseURL() + '/authenticate' + '#state=' + this.state.incomingPath + '&code=' + response.body.code;
    } else {
      this.setState({ loginError: true });
    }
  }

  /*******************************************************************************/
  //Sets the path to be routed to upon successful authentication
  /*******************************************************************************/
  setPath = (url) => {
    return new Promise((resolve, reject) => {
      //Decode the path set in the state.
      var regex = /.*#state=(.*)\&.*/;
      var path = url.replace(regex, '$1');
      path = decodeURIComponent(path);

      if (path === '?mode=external') {
        path = '/enroll?mode=external';
      }
      //If the path is invalid or '/' route the user home.
      if (!path || path === '/') {
        path = pageRoutes.palette_platform;
      }

      //Set the incomingPath so we can route the user after authentication.
      this.setState(
        {
          incomingPath: path,
        },
        () => {
          resolve();
        }
      );
    });
  };

  /*******************************************************************************/
  //Render method
  /*******************************************************************************/
  render() {
    const { loginError } = this.state;

    //If there was an error during authentication
    if (loginError) {
      return (
        <div className="logout-page-wrapper">
          <div className="logout-body-wrapper">
            <div className="logout-body-spinner" />
            <div className="logout-body-content">
              <LoginError />
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export class Authenticate extends React.Component {
  state = {
    authSuccessful: false,
    incomingPath: pageRoutes.palette_platform,
  };

  /*******************************************************************************/
  //Entry point to Authorization. Executes after component is mounted into the DOM.
  /*******************************************************************************/
  async componentDidMount() {
    document.cookie = `externalDataLoaded=false;path=/;${globals.SAMESITECOOKIE}`;

    if (this.props.location.hash !== '') {
      if (this.props.location.hash.indexOf('server_error') !== -1) {
        this.setState({ loginError: true, errorCode: 'U100' });
      }
      //Get the authorization code from URL.
      else {
        this.setState(
          {
            code: this.props.location.hash.split('code=')[1],
          },
          () => {
            this.authorize();
          }
        );
      }
    }
  }

  /*******************************************************************************/
  //Get JWT, decode JWT and and validate it.
  /*******************************************************************************/
  async authorize() {
    var issuer = null;
    var jwksUrl = null;
    var keys = null;
    var token = null;

    //Get the JWT
    let body = { code: this.state.code };
    let response = await AppModels.getToken({ body });

    if (!response.error) {
      token = response.body.id_token;
      this.setState({ id_token: token });
    } else {
      this.setState({ loginError: true, errorCode: 'U101' });
      return;
    }

    //Decode the JWT from the URL
    var decodedToken = jwt.decode(token, { complete: true });

    //Make sure JWT is valid. Display error if not.
    if (!decodedToken) {
      this.setState({ loginError: true, errorCode: 'U102' });
      return;
    }

    //Set the path to route application to after successful authentication if incoming request dictates one (#state)
    //If hash URL
    if (this.props.location.hash.includes('#state')) {
      await this.setPath(this.props.location.hash);
    }
    //If query url
    if (queryString.parse(window.location.search).state) {
      await this.setPath(queryString.parse(window.location.search).state);
    }
    if (queryString.parse(window.location.search).mode) {
      await this.setPath(window.location.search);
    }

    //If the audience does not match the CLIENT_ID fail out.
    if (decodedToken.payload.aud !== globals.CLIENT_ID) {
      this.setState({ loginError: true, errorCode: 'U103' });
      return;
    }

    //Retrieve information from Access URL
    try {
      var accessJSON = null;

      if (globals.OIDC_LOCAL_CONFIG) {
        accessJSON = await loadJSON('access.json');
        accessJSON = JSON.parse(accessJSON);
        jwksUrl = accessJSON.jwks_uri;
      } else {
        var accessUrl = globals.CDN_BASE_URL + `discovery/Keys/${globals.ENV_VAR}/access.json`;
        let accessResponse = await fetch(accessUrl, { method: 'GET' });
        // Fall back to original implementation if environment access.json does not exist
        if (accessResponse && accessResponse.status === 404) {
          accessUrl = globals.CDN_BASE_URL + `discovery/Keys/access.json`;
          accessResponse = await fetch(accessUrl, { method: 'GET' });
        }
        accessJSON = await accessResponse.json();
        jwksUrl = accessJSON.jwks_uri;
      }
      issuer = accessJSON.issuer;
    } catch (err) {
      //Any issues with the access URL should result in a login error.
      console.log('Access attempt failed');
      console.log(err);
      this.setState({ loginError: true, errorCode: 'U104' });
      return;
    }

    //If issuer and jwksUrl are not populated after Access URL get, return error.
    if (!issuer || !jwksUrl) {
      this.setState({ loginError: true, errorCode: 'U105' });
      return;
    }
    //Get the keys to authenticate the request from the jwksUrl
    try {
      let keysJSON = null;
      if (globals.OIDC_LOCAL_CONFIG) {
        keysJSON = await loadJSON('keys.json');
        keysJSON = JSON.parse(keysJSON);
      } else {
        const keysResponse = await fetch(jwksUrl, { method: 'GET' });
        keysJSON = await keysResponse.json();
      }
      keys = keysJSON.keys;
    } catch (err) {
      //Any issues with the jwksUrl should result in a login error.
      console.log('Key attempt failed');
      console.log(err);
      this.setState({ loginError: true, errorCode: 'U106' });
      return;
    }
    //If keys are not populated after jwksUrl get, return error.
    if (!keys || !keys.length) {
      this.setState({ loginError: true, errorCode: 'U107' });
      return;
    }
    //Map through list of possible valid signing keys and get public key
    const signingKeys = keys
      .filter((key) => key.use === 'sig' && key.kty === 'RSA' && key.kid && key.n && key.e)
      .map((key) => {
        return {
          kid: key.kid, //Key ID of JWE (JSON Web Encryption)
          x5t: key.x5t, //x.509 certificate thumbprint (JSON Web Encryption)
          nbf: key.nbf, //Not before timestamp of JWT (JSON Web Token)
          rsaPublicKey: rsaPublicKeyToPEM(key.n, key.e), //Public key generated from Modulus and Exponent from jwksUrl
        };
      });
    //If jwksUrl does not contain valid signing keys return error
    if (!signingKeys.length) {
      this.setState({ loginError: true, errorCode: 'U108' });
      return;
    }

    //Validate incoming JWT kid or x5t against valid signing key's kid or x5t
    const key = signingKeys.find((k) => (decodedToken.header.kid && k.kid === decodedToken.header.kid) || (decodedToken.header.x5t && k.x5t === decodedToken.header.x5t));

    //If key is valid attempt to validate entire token.
    if (key) {
      //Validate the incoming JWT token.
      this.validateToken(issuer, key.rsaPublicKey, this.state.id_token);
    }
    //If Kid is not valid return error
    else {
      this.setState({ loginError: true, errorCode: 'U109' });
      return;
    }
  }

  /*******************************************************************************/
  //Sets the path to be routed to upon successful authentication
  /*******************************************************************************/
  setPath = (url) => {
    return new Promise((resolve, reject) => {
      //Decode the path set in the state.
      var regex = /.*#state=(.*)\&.*/;
      var path = url.replace(regex, '$1');
      path = decodeURIComponent(path);

      if (path === '?mode=external') {
        path = '/myenrollments?mode=external';
      }
      //If the path is invalid or '/' route the user home.
      if (!path || path === '/') {
        path = pageRoutes.palette_platform;
      }

      //Set the incomingPath so we can route the user after authentication.
      this.setState(
        {
          incomingPath: path,
        },
        () => {
          resolve();
        }
      );
    });
  };

  /*******************************************************************************/
  //Validates JWT for B2C and OpenIDConnect authentication models.
  //     1)Verify JWT signature using RS256 algorithm and public key derived from jwksUrl.
  //     2)Match issuer from JWT against Access URL.
  //     3)Igonre NBF (Not Before) JTW attribute (We do this because of different server clocks)
  /*******************************************************************************/
  validateToken = (issuer, rsaPublicKey, idToken) => {
    //Call jwt.verify from jsonwebtoken node module
    jwt.verify(
      this.state.id_token, //JWT Token
      rsaPublicKey, //Public key derived from jwksUrl using module and exponent
      {
        algorithms: ['RS256'], //Algorithm used to verify JWT signature
        issuer: [issuer], //Issuer of JWT
        clockTimestamp: Math.ceil(Date.now() / 1000) + 180, //Time in seconds that should be used as the current time for all necessary comparisons
        ignoreNotBefore: true, //Ignores NBF of token
      },
      (err, decoded) => {
        //Any errors encountered during verification of token should result in booting the user.
        if (err) {
          console.log('Error: ', err);
          //Set the force boot cookie to boot user out of application.
          document.cookie = `x_universal_forceBoot=true;${globals.SAMESITECOOKIE}`;
          this.props.setAuthStatus(false, null, true);
          AuthManager.authenticate(() => {
            this.setState(() => ({
              authSuccessful: false,
            }));
          });
        }
        //Successful verification of token allows user into application
        else {
          //Save the JWT in the cookie for the duration of its lifetime to prevent authentication on every request.
          document.cookie = `x_universal_id=${idToken};path=/;expires=${new Date(decoded.exp * 1000).toUTCString()};${globals.SAMESITECOOKIE}`;
          //Save public key
          localStorage.setItem('key', rsaPublicKey);
          if (this.state.incomingPath === 'refresh') {
            //If this is a silent refresh request set the flag to false to prevent infinite loop.
            this.props.setSilentRefresh(false);
          } else {
            //Proceed to authentication of the incoming user against PCR's user directory.
            this.props.setAuthStatus(true, decoded, true);
            AuthManager.authenticate(() => {
              this.setState(() => ({
                authSuccessful: true,
              }));
            });
          }
        }
      }
    );
  };

  /*******************************************************************************/
  //Render method
  /*******************************************************************************/
  render() {
    const { authSuccessful, incomingPath } = this.state;

    //Authentication complete. If app needs to be routed to an incoming path passed in by user do so.
    if (authSuccessful === true) {
      return <Redirect to={`${incomingPath}`} />;
    }
    //If there was an error during authentication
    else if (this.state.loginError) {
      return <LoginError errorCode={this.state.errorCode} />;
    } else {
      return null;
    }
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      AuthManager.isAuthenticated === true ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { referrer: props.location.pathname + props.location.search } }} />
    }
  />
);

const AuthManager = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
};

export default App;
