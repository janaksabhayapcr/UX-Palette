import * as globals from '../../Globals/Variables';
import * as dataService from './DataService';

export async function getTokens({ user, services, body }) {
  const service = services.PrivacyAPI;
  let fetchProperties = {
    BaseUrl: `${service.URL}/registry/lookup/global`,
    Method: 'POST',
    SuccessMessage: 'Request Successful',
    FailureMessage: 'Request Failed',
    SuppressMessageOverride: false,
    ShowMessage: globals.ON_FAIL,
    CallBody: body,
    HeaderVals: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': service.subscription_key,
      DDHFirm: user.DDHFirm,
    },
  };
  let response = await dataService.FetchData(fetchProperties);
  let tokens = [];
  if (response.body.Registry && response.body.Registry[0].Token) {
    let registries = response.body.Registry;
    for (let i in registries) {
      tokens.push(registries[i].Token);
    }
  }
  return tokens;
}

export async function postTokens({ user, services, body }) {
  const service = services.PrivacyAPI;
  let fetchProperties = {
    BaseUrl: `${service.URL}/registry/create`,
    Method: 'POST',
    SuccessMessage: 'Request Successful',
    FailureMessage: 'Request Failed',
    SuppressMessageOverride: false,
    ShowMessage: globals.ON_FAIL,
    CallBody: body,
    HeaderVals: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': service.subscription_key,
      DDHFirm: user.DDHFirm,
    },
  };
  let response = await dataService.FetchData(fetchProperties);
  let tokens = [];
  if (response.body.Registry && response.body.Registry[0].Token) {
    let registries = response.body.Registry;
    for (let i in registries) {
      tokens.push(registries[i].Token);
    }
  }
  return tokens;
}

export async function getDetokenizeField({ user, services, body }) {
  let getTokenFetchProperties = {
    BaseUrl: `${services.PrivacyAPI.URL}/registry/get`,
    Method: 'POST',
    SuccessMessage: 'Request Successful',
    FailureMessage: 'Request Failed',
    SuppressMessageOverride: false,
    ShowMessage: globals.NEVER,
    CallBody: body,
    HeaderVals: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': services.Enrollment.subscription_key,
      DDHFirm: user.DDHFirm,
    },
  };
  return await dataService.FetchData(getTokenFetchProperties);
}

export async function getTaxEntity({ user, services, filter = '' }) {
  let taxEntityFetchProperties = {
    BaseUrl: `${services.Enrollment.URL}/EnrollmentCoreHierarchy?$count=true&$top=1${filter}`,
    Method: 'GET',
    SuccessMessage: 'Request Successful',
    FailureMessage: 'Request Failed',
    SuppressMessageOverride: false,
    ShowMessage: globals.NEVER,
    HeaderVals: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': services.Enrollment.subscription_key,
      DDHFirm: user.DDHFirm,
    },
  };
  let response = await dataService.FetchData(taxEntityFetchProperties);

  if (response) {
    if (response.body) {
      return { values: response.body.value, count: response.body['@odata.count'] };
    }
  }

  return { values: [], count: 0 };
}
