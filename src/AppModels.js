import * as globals from './Globals/Variables';
import * as dataService from './Components/Utils/DataService';

export async function getToken({ body }) {
  let fetchProperties = {
    BaseUrl: globals.TOKEN_URL,
    Method: 'POST',
    SuccessMessage: 'Request Successful',
    FailureMessage: 'Request Failed',
    SuppressMessageOverride: false,
    ShowMessage: globals.ON_FAIL,
    CallBody: body,
    HeaderVals: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': globals.SUB_KEY,
      'x-universal-firm-secret': globals.SESSION_KEY,
    },
  };
  return await await dataService.FetchData(fetchProperties);
}

export async function getCode({ body }) {
  let fetchProperties = {
    BaseUrl: globals.CODE_URL,
    Method: 'POST',
    SuccessMessage: 'Request Successful',
    FailureMessage: 'Request Failed',
    SuppressMessageOverride: false,
    ShowMessage: globals.ON_FAIL,
    CallBody: body,
    HeaderVals: {
      'Content-Type': 'application/json',
    },
  };
  return await await dataService.FetchData(fetchProperties);
}

//Creates an account in "Creating" status as well as signers tied to the account's context
//using Contact.ReferenceID which ties to Account.RelationshipID
export async function persistExternalData(services, body) {
  let createAccountFetchProperties = {
    BaseUrl: `${services.Enrollment.URL}/ExternalCRM/CreateSigners`,
    Method: 'POST',
    SuccessMessage: '',
    FailureMessage: '',
    CallBody: body,
    SuppressMessageOverride: false,
    ShowMessage: globals.NEVER,
    HeaderVals: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': services.Enrollment.subscription_key,
    },
  };
  return await dataService.FetchData(createAccountFetchProperties);
}

export async function cleanupSignersForReferenceID(services, body) {
  let cleanupFetchProperties = {
    BaseUrl: `${services.Enrollment.URL}/ExternalCRM/Cleanup`,
    Method: 'POST',
    SuccessMessage: '',
    FailureMessage: '',
    CallBody: body,
    SuppressMessageOverride: false,
    ShowMessage: globals.NEVER,
    HeaderVals: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': services.Enrollment.subscription_key,
    },
  };
  return await dataService.FetchData(cleanupFetchProperties);
}

export async function getHelp({ user, services }, subscription, url) {
  let fetchProps = {
    BaseUrl: url,
    Method: 'GET',
    SuccessMessage: 'Request Successful',
    FailureMessage: 'Request Failed',
    SuppressMessageOverride: false,
    ShowMessage: globals.NEVER,
    HeaderVals: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': subscription,
    },
  };
  let response = await dataService.FetchData(fetchProps);

  return response;
}

export async function postHelp({ user, services }, subscription, url, body) {
  let fetchProps = {
    BaseUrl: url,
    Method: 'POST',
    SuccessMessage: 'Request Successful',
    FailureMessage: 'Request Failed',
    SuppressMessageOverride: false,
    ShowMessage: globals.NEVER,
    CallBody: body,
    HeaderVals: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': subscription,
    },
  };
  let response = await dataService.FetchData(fetchProps);

  return response;
}

export async function patchHelp({ user, services }, subscription, url, body) {
  let fetchProps = {
    BaseUrl: url,
    Method: 'PATCH',
    SuccessMessage: 'Request Successful',
    FailureMessage: 'Request Failed',
    SuppressMessageOverride: false,
    ShowMessage: globals.NEVER,
    CallBody: JSON.stringify(body),
    DDHFirm: user.DDHFirm,
    HeaderVals: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': subscription,
    },
  };
  let response = await dataService.FetchData(fetchProps);

  return response;
}

export async function updateUserTeamEmail(user, services, email) {
  let fetchProps = {
    BaseUrl: `${services.Dashboard.URL}/USER?id=${user.userId}`,
    Method: 'PATCH',
    SuccessMessage: '',
    FailureMessage: 'Request Failed',
    SuppressMessageOverride: false,
    ShowMessage: globals.ON_FAIL,
    CallBody: {'TeamEmail':email},
    HeaderVals: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': services.Dashboard.subscription_key,
    },
  };
  let response = await dataService.FetchData(fetchProps);

  return response;
}
