import * as globals from '../../Globals/Variables';
import * as dataService from '../Utils/DataService';

export async function deleteLayoutViewLink({ user, services, layoutViewId }) {
  let fetchProperties = {
    BaseUrl: `${services.Dashboard.URL}/LAYOUT_VIEW_LINK?id=${layoutViewId}`,
    Method: 'DELETE',
    SuccessMessage: 'Request Successful',
    FailureMessage: 'Request Failed',
    SuppressMessageOverride: false,
    ShowMessage: globals.ON_FAIL,
    HeaderVals: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': services.Dashboard.subscription_key,
    },
  };
  return await dataService.FetchData(fetchProperties);
}

export async function getLayoutViewLink({ user, services, layoutViewId }) {
  let fetchProperties = {
    BaseUrl: `${services.Dashboard.URL}/LAYOUT_VIEW_LINK?id=${layoutViewId}`,
    Method: 'GET',
    SuccessMessage: 'Request Successful',
    FailureMessage: 'Request Failed',
    SuppressMessageOverride: false,
    ShowMessage: globals.NEVER,
    HeaderVals: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': services.Dashboard.subscription_key,
    },
  };
  let response = await dataService.FetchData(fetchProperties);
  if (!response.error && response.body) {
    return { error: false, body: response.body };
  } else {
    return [];
  }
}

export async function getView({ user, services, viewId }) {
  let fetchProperties = {
    BaseUrl: `${services.Dashboard.URL}/VIEW?id=${viewId}`,
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

  let response = await dataService.FetchData(fetchProperties);
  if (!response.error && response.body) {
    return response;
  } else {
    return [];
  }
}

export async function serverSideRenderer({ user, services, viewType, id, body }) {
  let fetchProperties = {
    BaseUrl: `${services.Renderer.URL}/view/render/${id}?viewType=${viewType}`,
    Method: 'POST',
    SuccessMessage: 'Request Successful',
    FailureMessage: 'Request Failed',
    SuppressMessageOverride: false,
    ShowMessage: globals.ON_FAIL,
    CallBody: body,
    HeaderVals: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': services.Renderer.subscription_key,
    },
  };
  return await dataService.FetchData(fetchProperties);
}

export async function serverSideRendererTable({ user, services, viewType, id, body }) {
  let fetchProperties = {
    BaseUrl: `${services.Renderer.URL}/view/table/${id}?viewType=${viewType}`,
    Method: 'POST',
    SuccessMessage: 'Request Successful',
    FailureMessage: 'Request Failed',
    SuppressMessageOverride: false,
    ShowMessage: globals.ON_FAIL,
    CallBody: body,
    HeaderVals: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': services.Renderer.subscription_key,
    },
  };
  return await dataService.FetchData(fetchProperties);
}

export async function extractTest({ user, services, body, guid, format }) {
  let type = format ? format : 'csv';
  let fetchProperties = {
    BaseUrl: `${services.Renderer.URL}/view/render/file/${guid}?format=${type}`,
    Method: 'POST',
    SuccessMessage: 'Request Successful',
    FailureMessage: 'Request Failed',
    SuppressMessageOverride: false,
    ShowMessage: globals.ON_FAIL,
    CallBody: body,
    HeaderVals: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': services.Renderer.subscription_key,
    },
  };

  let response = await dataService.FetchData(fetchProperties);

  if (!response.error && response.body.Value) {
    return { value: response.body.Value[0], error: false };
  } else {
    return { value: [], error: true };
  }
}

export async function extractRun({ user, services, body, guid }) {
  let fetchProperties = {
    BaseUrl: `${services.Renderer.URL}/view/render/extract/${guid}`,
    Method: 'POST',
    SuccessMessage: 'Request Successful',
    FailureMessage: 'Request Failed',
    SuppressMessageOverride: false,
    ShowMessage: globals.ON_FAIL,
    CallBody: body,
    HeaderVals: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': services.Renderer.subscription_key,
    },
  };
  let response = await dataService.FetchData(fetchProperties);

  if (!response.error && response.body) {
    return { value: response.body, error: false };
  } else {
    return { value: [], error: true };
  }
}
