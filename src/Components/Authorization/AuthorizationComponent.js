import React, { Component } from 'react';
import request from 'request';
import { certToPEM, rsaPublicKeyToPEM } from './utils';
import { Redirect } from 'react-router-dom';

import * as globals from '../../Globals/Variables';

var jwt = require('jsonwebtoken');

export default class AuthorizationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      incomingPath: null,
    };
  }

  componentDidMount() {
    if (this.props.openIdTokenResponse.location.hash !== '') {
      //Cancel Action
      if (this.props.openIdTokenResponse.location.hash.indexOf(globals.CANCEL_CODE) !== -1) {
        this.routeToLogin();
      }
      //Forgot Password
      else if (this.props.openIdTokenResponse.location.hash.indexOf(globals.FORGOT_PASSWORD_CODE) !== -1) {
        this.routeToForgotPassword();
      }
      //Authentication Successfull
      else {
        this.props.setIdToken(this.props.openIdTokenResponse.location.hash.split('id_token=')[1]);
        this.setPath(this.props.openIdTokenResponse.location.hash);
        this.props.setQueryParams(this.props.openIdTokenResponse.location.hash);
        this.props.fetchjwks_uri();
        this.props.fetchAccess_uri();
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id_token != null && nextProps.kid != null && !nextProps.authStatus && nextProps.rsaPublicKey == null) {
      this.getSigningKey(nextProps.kid);
    }
  }

  setPath = (response) => {
    if (response.includes('#state')) {
      var regex = /.*#state=(.*)\&.*/;
      var path = response.replace(regex, '$1');

      this.setState({
        incomingPath: path.replace('%2f', ''),
      });
    }
  };

  routeToForgotPassword = () => {
    window.location.href = globals.PASSWORD_RESET_POLICY_URL;
  };

  routeToLogin = () => {
    window.location.href = globals.B2C_LOGIN_SIGNUP_POLICY_URL;
  };

  getKeys = (cb) => {
    request({ json: true, uri: globals.JWKS_URL, strictSSL: false }, (err, res) => {
      if (err || res.statusCode < 200 || res.statusCode >= 300) {
        if (res) {
          console.log((res.body && (res.body.message || res.body)) || res.statusMessage || `Http Error ${res.statusCode}`);
          //return cb(new JwksError(res.body && (res.body.message || res.body) || res.statusMessage || `Http Error ${res.statusCode}`));
        }
        return cb(err);
      }
      return cb(null, res.body.keys);
    });
  };

  getSigningKeys = (cb) => {
    this.getKeys((err, keys) => {
      if (err) {
        return cb(err);
      }

      if (!keys || !keys.length) {
        console.log('The JWKS endpoint did not contain any keys');
        //return cb(new JwksError('The JWKS endpoint did not contain any keys'));
      }

      const signingKeys = keys
        .filter((key) => key.use === 'sig' && key.kty === 'RSA' && key.kid && ((key.x5c && key.x5c.length) || (key.n && key.e)))
        .map((key) => {
          if (key.x5c && key.x5c.length) {
            return { kid: key.kid, nbf: key.nbf, publicKey: certToPEM(key.x5c[0]) };
          } else {
            return { kid: key.kid, nbf: key.nbf, rsaPublicKey: rsaPublicKeyToPEM(key.n, key.e) };
          }
        });

      if (!signingKeys.length) {
        console.log('The JWKS endpoint did not contain any signing keys');
        //return cb(new JwksError('The JWKS endpoint did not contain any signing keys'));
      }
      return cb(null, signingKeys);
    });
  };

  getSigningKey = (kid, cb) => {
    this.getSigningKeys((err, keys) => {
      if (err) {
        return cb(err);
      }

      const key = keys.find((k) => k.kid === kid);
      if (key) {
        this.props.setRsaPublicKey(key.rsaPublicKey);
        this.validateToken(key.rsaPublicKey);
      } else {
        console.log(`Unable to find a signing key that matches '${kid}'`);
        console.log('else: SHOULD NOT BE HERE');
        //return cb(new SigningKeyNotFoundError(`Unable to find a signing key that matches '${kid}'`));
      }
    });
  };

  validateToken = (rsaPublicKey) => {
    var authStatus = false;
    var claim = null;
    var err = null;

    claim = jwt.decode(this.props.id_token);
    authStatus = true;
    // jwt.verify(this.props.id_token, rsaPublicKey, { algorithms: ['RS256'], issuer: this.props.iss }, function(err, decoded){
    //   if (err) {
    //     err = err;
    //   }
    //   else{
    //     authStatus = true;
    //     claim = decoded;
    //   }
    // });

    // if (err != null) {
    //   console.log('error: ', err);
    //   this.routeToLogout()
    // }
    // else{
    this.setUpUser(authStatus, claim);
    //}
  };

  setUpUser = (authStatus, claim) => {
    this.props.setAuthStatus(authStatus, claim);
  };

  routeToLogout = () => {
    window.location.href = globals.B2C_LOGOUT_POLICY_URL;
  };

  render() {
    var path = '';

    if (this.state.incomingPath) {
      var array = this.state.incomingPath.split('%2c');
      if (array[0]) {
        path = `?ModuleID=${array[0]}`;
      }
      if (array[1]) {
        path = path + `&RouteID=${array[1]}`;
      }
    }

    return <div>{this.props.authStatus ? <Redirect to={{ pathname: '/', search: path }}></Redirect> : null}</div>;
  }
}
