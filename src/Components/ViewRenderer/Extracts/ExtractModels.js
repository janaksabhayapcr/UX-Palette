import * as globals from '../../../Globals/Variables';
import * as dataService from '../../Utils/DataService';
import React from 'react';

export async function extractTest({ user, services, body, guid, format, detokenization }) {
  let type = format ? format : 'csv';
  let fetchProperties = {
    BaseUrl: `${services.Renderer.URL}/view/render/file/${guid}?format=${type}&directive=${detokenization}`,
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

export async function extractRun({ user, services, body, guid, sid, manual = false }) {
  let view = await getView({ user, services, sid, id: guid });
  // Adding manual query param here to indicate that this extract is being manually run from the UI
  // When running an extract manually, we will skip certain updates in the backend (LastRunDate)
  let fetchProperties = {
    BaseUrl: `${services.Renderer.URL}/view/render/extract/${view.Link_SID}?manual=${manual}`,
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

export async function getViewExtracts({ user, services, extractViewID, firm = null }) {
  let headers = {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': services.Dashboard.subscription_key,
    DDHFirm: user.DDHFirm,
  };
  if (user.FirmId === 0 && firm !== null) {
    headers = { ...headers, 'x-universal-firm': firm };
  }
  let fetchProperties = {
    BaseUrl: `${services.Dashboard.URL}/EXTRACTS?$filter=ViewId eq ${extractViewID}`,
    Method: 'GET',
    SuccessMessage: 'Request Successful',
    FailureMessage: 'Request Failed',
    SuppressMessageOverride: false,
    ShowMessage: globals.ON_FAIL,
    HeaderVals: {
      ...headers,
    },
  };
  let response = await dataService.FetchData(fetchProperties);
  if (response.body && response.body.value && response.body.value) {
    return response.body.value;
  } else {
    return [];
  }
}

export async function getExtracts({ user, services, firm = null }) {
  let headers = {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': services.Dashboard.subscription_key,
    DDHFirm: user.DDHFirm,
  };
  if (user.FirmId === 0 && firm !== null) {
    headers = { ...headers, 'x-universal-firm': firm };
  }
  let fetchProperties = {
    BaseUrl: `${services.Dashboard.URL}/EXTRACT`,
    Method: 'GET',
    SuccessMessage: 'Request Successful',
    FailureMessage: 'Request Failed',
    SuppressMessageOverride: false,
    ShowMessage: globals.ON_FAIL,
    HeaderVals: {
      ...headers,
    },
  };
  let response = await dataService.FetchData(fetchProperties);
  if (response.body && response.body.value && response.body.value) {
    let extracts,
      extractOptions = [];

    if (response.body.value !== []) {
      extracts = response.body.value.sort((a, b) => a.Name.localeCompare(b.Name));
      extractOptions = extracts.map(({ Name, Extract_SID }, index) => (
        <option value={Extract_SID} key={index}>
          {' '}
          {Name}{' '}
        </option>
      ));
    }

    return [extracts, extractOptions];
  } else {
    return [];
  }
}

export async function getViewExtract({ user, services, extractSID, firm = null }) {
  let headers = {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': services.Dashboard.subscription_key,
    DDHFirm: user.DDHFirm,
  };
  if (user.FirmId === 0 && firm !== null) {
    headers = { ...headers, 'x-universal-firm': firm };
  }
  let fetchProperties = {
    BaseUrl: `${services.Dashboard.URL}/EXTRACT?$filter=Extract_SID eq ${extractSID}`,
    Method: 'GET',
    SuccessMessage: 'Request Successful',
    FailureMessage: 'Request Failed',
    SuppressMessageOverride: false,
    ShowMessage: globals.ON_FAIL,
    HeaderVals: {
      ...headers,
    },
  };
  let response = await dataService.FetchData(fetchProperties);
  if (response.body && response.body.value && response.body.value) {
    return response.body.value;
  } else {
    return [];
  }
}
export async function getExtractViewLinks({ user, services, extractViewID = '', firm = null }) {
  let headers = {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': services.Dashboard.subscription_key,
    DDHFirm: user.DDHFirm,
  };
  if (user.FirmId === 0 && firm !== null) {
    headers = { ...headers, 'x-universal-firm': firm };
  }
  let fetchProperties = {
    BaseUrl: `${services.Dashboard.URL}/EXTRACT_VIEW_LINK?$filter=ViewId eq ${extractViewID}`,
    Method: 'GET',
    SuccessMessage: 'Request Successful',
    FailureMessage: 'Request Failed',
    SuppressMessageOverride: false,
    ShowMessage: globals.ON_FAIL,
    HeaderVals: {
      ...headers,
    },
  };
  let response = await dataService.FetchData(fetchProperties);
  if (response.body && response.body.value) {
    return response.body.value;
  } else {
    return [];
  }
}
export async function getExtractControlTypes({ user, services }) {
  let fetchProperties = {
    BaseUrl: `${services.Dashboard.URL}/EXTRACT_CONTROL_TYPE`,
    Method: 'GET',
    SuccessMessage: 'Request Successful',
    FailureMessage: 'Request Failed',
    SuppressMessageOverride: false,
    ShowMessage: globals.ON_FAIL,
    HeaderVals: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': services.Dashboard.subscription_key,
      DDHFirm: user.DDHFirm,
    },
  };
  let response = await dataService.FetchData(fetchProperties);
  if (response.body && response.body.value && response.body.value) {
    let extractControlTypes,
      extractControlTypeOptions = [];

    if (response.body.value !== []) {
      extractControlTypes = response.body.value.sort((a, b) => a.Name.localeCompare(b.Name));
      extractControlTypeOptions = extractControlTypes.map(({ Name, TypeID }, index) => (
        <option value={TypeID} key={index}>
          {' '}
          {Name}{' '}
        </option>
      ));
      extractControlTypeOptions.unshift(<option value={null} key="999"></option>);
    }

    return [extractControlTypes, extractControlTypeOptions];
  } else {
    return [];
  }
}
export async function getExtractViewData({ user, services, extractViewID = '', firm = null }) {
  let headers = {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': services.Dashboard.subscription_key,
    DDHFirm: user.DDHFirm,
  };
  if (user.FirmId === 0 && firm !== null) {
    headers = { ...headers, 'x-universal-firm': firm };
  }
  let fetchProperties = {
    BaseUrl: `${services.Dashboard.URL}/VIEW?$filter=ViewId eq ${extractViewID}`,
    Method: 'GET',
    SuccessMessage: 'Request Successful',
    FailureMessage: 'Request Failed',
    SuppressMessageOverride: false,
    ShowMessage: globals.ON_FAIL,
    HeaderVals: {
      ...headers,
    },
  };
  let response = await dataService.FetchData(fetchProperties);
  if (response.body && response.body.value) {
    return response.body.value;
  } else {
    return [];
  }
}
export async function getFormats({ user, services }) {
  let fetchProperties = {
    BaseUrl: `${services.Dashboard.URL}/EXTRACT_FORMAT`,
    Method: 'GET',
    SuccessMessage: 'Request Successful',
    FailureMessage: 'Request Failed',
    SuppressMessageOverride: false,
    ShowMessage: globals.ON_FAIL,
    HeaderVals: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': services.Dashboard.subscription_key,
      DDHFirm: user.DDHFirm,
    },
  };
  let response = await dataService.FetchData(fetchProperties);
  if (response.body && response.body.value && response.body.value) {
    let formats,
      formatOptions = [];
    if (response.body.value !== []) {
      formats = response.body.value.sort((a, b) => a.Format.localeCompare(b.Format));
      formatOptions = formats.map(({ Format }) => (
        <option value={Format} key={Format}>
          {' '}
          {Format}{' '}
        </option>
      ));
    }

    return [formats, formatOptions];
  } else {
    return [];
  }
}

export async function getSchedulesOptions({ user, services }) {
  let fetchProperties = {
    BaseUrl: `${services.Dashboard.URL}/EXTRACT_SCHEDULE`,
    Method: 'GET',
    SuccessMessage: 'Request Successful',
    FailureMessage: 'Request Failed',
    SuppressMessageOverride: false,
    ShowMessage: globals.ON_FAIL,
    HeaderVals: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': services.Dashboard.subscription_key,
      DDHFirm: user.DDHFirm,
    },
  };
  let response = await dataService.FetchData(fetchProperties);
  if (response.body && response.body.value && response.body.value) {
    let schedules,
      scheduleOptions = [];

    if (response.body.value !== []) {
      schedules = response.body.value.sort((a, b) => a.Schedule.localeCompare(b.Schedule));
      scheduleOptions = schedules.map(({ Schedule }) => (
        <option value={Schedule} key={Schedule}>
          {' '}
          {Schedule}{' '}
        </option>
      ));
    }
    return scheduleOptions;
  } else {
    return [];
  }
}

export async function getLocations({ user, services }) {
  let fetchProperties = {
    BaseUrl: `${services.Dashboard.URL}/EXTRACT_LOCATION`,
    Method: 'GET',
    SuccessMessage: 'Request Successful',
    FailureMessage: 'Request Failed',
    SuppressMessageOverride: false,
    ShowMessage: globals.ON_FAIL,
    HeaderVals: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': services.Dashboard.subscription_key,
      DDHFirm: user.DDHFirm,
    },
  };
  let response = await dataService.FetchData(fetchProperties);
  if (response.body && response.body.value && response.body.value) {
    let locations,
      locationOptions = [];

    if (response.body.value !== []) {
      locations = response.body.value.sort((a, b) => a.Location.localeCompare(b.Location));
      locationOptions = locations.map(({ Location, Url, Path }) => (
        <option value={Location} key={Location}>
          {' '}
          {Location}
          {' (' + Url}
          {Path ? Path : ''}
          {') '}
        </option>
      ));
    }

    return [locations, locationOptions];
  } else {
    return [];
  }
}

export async function getWorkProcedures({ user, services }) {
  const service = services.Workflow;

  let fetchProperties = {
    BaseUrl: `${service.URL}/WORK_PROCEDURE`,
    Method: 'GET',
    SuccessMessage: 'Request Successful',
    FailureMessage: 'Request Failed',
    SuppressMessageOverride: false,
    ShowMessage: globals.ON_FAIL,
    HeaderVals: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': service.subscription_key,
      DDHFirm: user.DDHFirm,
    },
  };

  let response = await dataService.FetchData(fetchProperties);
  if (response.body && response.body.value && response.body.value) {
    let procedures,
      procedureOptions = [];

    if (response.body.value !== []) {
      procedures = response.body.value.sort((a, b) => a.Procedure.localeCompare(b.Procedure));
      procedureOptions = procedures.map(({ Procedure }) => (
        <option value={Procedure} key={Procedure}>
          {' '}
          {Procedure}{' '}
        </option>
      ));
    }
    return [procedures, procedureOptions];
  } else {
    return [];
  }
}

export async function newExtract({ user, services, form, link, firm = null }) {
  let bodyFirm = user.FirmId;
  let headers = {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': services.Dashboard.subscription_key,
    DDHFirm: user.DDHFirm,
  };
  if (user.FirmId === 0 && firm !== null) {
    headers = { ...headers, 'x-universal-firm': firm };
    bodyFirm = firm;
  }
  let extractBody = { ...form, FirmId: bodyFirm };
  extractBody['BatchDeliver'] = true;
  delete extractBody['ViewId'];
  delete extractBody['FileName'];
  delete extractBody['Schedules'];
  delete extractBody['Header'];
  delete extractBody['Footer'];
  let fetchProperties = {
    BaseUrl: `${services.Dashboard.URL}/EXTRACT`,
    Method: 'POST',
    SuccessMessage: 'Request Successful',
    FailureMessage: 'Request Failed',
    SuppressMessageOverride: false,
    ShowMessage: globals.ON_FAIL,
    CallBody: extractBody,
    HeaderVals: {
      ...headers,
    },
  };

  let extract = await dataService.FetchData(fetchProperties);
  let extractSchedule = { error: false };

  form.Schedules.forEach(async (elem) => {
    fetchProperties['BaseUrl'] = `${services.Dashboard.URL}/EXTRACT_SCHEDULE_DETAIL`;
    fetchProperties['CallBody'] = {
      Extract_SID: extract.body.Extract_SID,
      Schedule: elem.Schedule,
      ExtractTime: elem.ExtractTime,
      TargetTime: elem.TargetTime,
    };
    extractSchedule = await dataService.FetchData(fetchProperties);
  });

  let viewLinkBody = link
    ? {
        Extract_SID: extract.body.Extract_SID,
      }
    : {
        Extract_SID: extract.body.Extract_SID,
        ViewId: form.ViewId,
        FileName: form.FileName,
        Procedure: form.Procedure,
        Header: form.Header,
        Footer: form.Footer,
      };

  fetchProperties['BaseUrl'] = link !== undefined ? `${services.Dashboard.URL}/EXTRACT_VIEW_LINK?id=${link}` : `${services.Dashboard.URL}/EXTRACT_VIEW_LINK`;
  fetchProperties['Method'] = link !== undefined ? 'PATCH' : 'POST';
  fetchProperties['CallBody'] = viewLinkBody;

  let viewLink = await dataService.FetchData(fetchProperties);

  if (!extract.error && !viewLink.error && !extractSchedule.error) {
    return 'New Extract Created!';
  } else {
    return false;
  }
}

export async function deleteExtract({ user, services, extract, id, sid, firm = null }) {
  let headers = {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': services.Dashboard.subscription_key,
    DDHFirm: user.DDHFirm,
  };
  if (user.FirmId === 0 && firm !== null) {
    headers = { ...headers, 'x-universal-firm': firm };
  }
  if (extract) {
    let fetchProperties = {
      BaseUrl: `${services.Dashboard.URL}/EXTRACT?id=${sid}`,
      Method: 'DELETE',
      SuccessMessage: 'Request Successful',
      FailureMessage: 'Request Failed',
      SuppressMessageOverride: false,
      ShowMessage: globals.ON_FAIL,
      HeaderVals: {
        ...headers,
      },
    };

    let extractCall = await dataService.FetchData(fetchProperties);
    if (!extractCall.error) {
      return true;
    } else {
      return false;
    }
  } else {
    let view = await getView({ user, services, sid, id });

    let fetchProperties = {
      BaseUrl: `${services.Dashboard.URL}/EXTRACT_VIEW_LINK?id=${view.Link_SID}`,
      Method: 'DELETE',
      SuccessMessage: 'Request Successful',
      FailureMessage: 'Request Failed',
      SuppressMessageOverride: false,
      ShowMessage: globals.ON_FAIL,
      HeaderVals: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': services.Dashboard.subscription_key,
        DDHFirm: user.DDHFirm,
      },
    };

    let deleteLink = await dataService.FetchData(fetchProperties);

    if (!deleteLink.error) {
      return true;
    } else {
      return false;
    }
  }
}

export async function patchViewData({ user, services, body, id, firm = null }) {
  let headers = {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': services.Dashboard.subscription_key,
  };
  if (user.FirmId === 0 && firm !== null) {
    headers = { ...headers, 'x-universal-firm': firm };
  }
  let fetchProperties = {
    BaseUrl: `${services.Dashboard.URL}/VIEW?id=${id}`,
    Method: 'PATCH',
    SuccessMessage: 'Request Successful',
    FailureMessage: 'Request Failed',
    SuppressMessageOverride: false,
    ShowMessage: globals.NEVER,
    CallBody: body,
    HeaderVals: {
      ...headers,
    },
  };
  return await dataService.FetchData(fetchProperties);
}

export async function patchExtract({ user, services, form, id, del = null, firm = null }) {
  let bodyFirm = user.FirmId;
  let headers = {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': services.Dashboard.subscription_key,
    DDHFirm: user.DDHFirm,
  };
  if (user.FirmId === 0 && firm !== null) {
    headers = { ...headers, 'x-universal-firm': firm };
    bodyFirm = firm;
  }

  let extractBody = { ...form, FirmId: bodyFirm };
  delete extractBody['ViewId'];
  delete extractBody['FileName'];
  delete extractBody['Schedules'];
  delete extractBody['Header'];
  delete extractBody['Footer'];
  let fetchProperties = {
    BaseUrl: `${services.Dashboard.URL}/EXTRACT?id=${id}`,
    Method: 'PATCH',
    SuccessMessage: 'Request Successful',
    FailureMessage: 'Request Failed',
    SuppressMessageOverride: false,
    ShowMessage: globals.ON_FAIL,
    CallBody: extractBody,
    HeaderVals: {
      ...headers,
    },
  };

  let extract = await dataService.FetchData(fetchProperties);

  let extractSchedule = { error: false };

  if (del) {
    fetchProperties['Method'] = 'DELETE';
    fetchProperties['CallBody'] = null;

    del.forEach(async (elem) => {
      fetchProperties['BaseUrl'] = `${services.Dashboard.URL}/EXTRACT_SCHEDULE_DETAIL?id=${elem}`;
      extractSchedule = await dataService.FetchData(fetchProperties);
    });
  }

  form.Schedules.forEach(async (elem) => {
    const scheduleDetailBody = {
      Extract_SID: id,
      Schedule: elem.Schedule,
      ExtractTime: elem.ExtractTime,
      TargetTime: elem.TargetTime,
    };

    const method = elem.Detail_SID ? 'PATCH' : 'POST';
    const baseURL = elem.Detail_SID ? `?id=${elem.Detail_SID}` : '';

    if (elem.Detail_SID) {
      scheduleDetailBody['Detail_SID'] = elem.Detail_SID;
    }

    fetchProperties['BaseUrl'] = `${services.Dashboard.URL}/EXTRACT_SCHEDULE_DETAIL` + baseURL;
    fetchProperties['CallBody'] = scheduleDetailBody;
    fetchProperties['Method'] = method;
    extractSchedule = await dataService.FetchData(fetchProperties);
  });

  if (!extract.error && !extractSchedule.error) {
    return 'Extract Updated!';
  } else {
    return false;
  }
}

export async function patchView({ user, services, form, sid, id, link, firm = null }) {
  let headers = {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': services.Dashboard.subscription_key,
    DDHFirm: user.DDHFirm,
  };
  if (user.FirmId === 0 && firm !== null) {
    headers = { ...headers, 'x-universal-firm': firm };
  }
  let fetchProperties = {
    BaseUrl: `${services.Dashboard.URL}/EXTRACT_VIEW_LINK?id=${link}`,
    Method: 'PATCH',
    SuccessMessage: 'Request Successful',
    FailureMessage: 'Request Failed',
    SuppressMessageOverride: false,
    ShowMessage: globals.ON_FAIL,
    CallBody: {
      Extract_SID: sid,
      ViewId: id,
      FileName: form.FileName,
      Procedure: form.Procedure,
      Header: form.Header,
      Footer: form.Footer,
    },
    HeaderVals: {
      ...headers,
    },
  };

  let patch = await dataService.FetchData(fetchProperties);

  if (!patch.error) {
    return 'View Updated!';
  } else {
    return false;
  }
}

export async function newView({ user, services, form, sid, id, firm = null }) {
  let headers = {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': services.Dashboard.subscription_key,
    DDHFirm: user.DDHFirm,
  };
  if (user.FirmId === 0 && firm !== null) {
    headers = { ...headers, 'x-universal-firm': firm };
  }
  let fetchProperties = {
    BaseUrl: `${services.Dashboard.URL}/EXTRACT_VIEW_LINK`,
    Method: 'POST',
    SuccessMessage: 'Request Successful',
    FailureMessage: 'Request Failed',
    SuppressMessageOverride: false,
    ShowMessage: globals.ON_FAIL,
    CallBody: {
      Extract_SID: sid,
      ViewId: id,
      FileName: form.FileName,
      Procedure: form.Procedure,
      Header: form.Header,
      Footer: form.Footer,
    },
    HeaderVals: {
      ...headers,
    },
  };

  let patch = await dataService.FetchData(fetchProperties);

  if (!patch.error) {
    return 'View Updated!';
  } else {
    return false;
  }
}

export async function getView({ user, services, sid, id, firm = null }) {
  let headers = {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': services.Dashboard.subscription_key,
    DDHFirm: user.DDHFirm,
  };
  if (user.FirmId === 0 && firm !== null) {
    headers = { ...headers, 'x-universal-firm': firm };
  }
  let fetchProperties = {
    BaseUrl: `${services.Dashboard.URL}/EXTRACT_VIEW_LINK?$filter=ViewId eq ${id} and Extract_SID eq ${sid}`,
    Method: 'GET',
    SuccessMessage: 'Request Successful',
    FailureMessage: 'Request Failed',
    SuppressMessageOverride: false,
    ShowMessage: globals.ON_FAIL,
    HeaderVals: {
      ...headers,
    },
  };

  let getLink = await dataService.FetchData(fetchProperties);
  return getLink.body.value[0];
}

export async function getExtract({ user, services, sid, firm = null }) {
  let headers = {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': services.Dashboard.subscription_key,
    DDHFirm: user.DDHFirm,
  };
  if (user.FirmId === 0 && firm !== null) {
    headers = { ...headers, 'x-universal-firm': firm };
  }
  let fetchProperties = {
    BaseUrl: `${services.Dashboard.URL}/EXTRACT?id=${sid}`,
    Method: 'GET',
    SuccessMessage: 'Request Successful',
    FailureMessage: 'Request Failed',
    SuppressMessageOverride: false,
    ShowMessage: globals.ON_FAIL,
    HeaderVals: {
      ...headers,
    },
  };

  let getLink = await dataService.FetchData(fetchProperties);
  return getLink.body;
}

export async function getSpecificExtract({ user, services, sid, firm = null }) {
  let headers = {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': services.Dashboard.subscription_key,
    DDHFirm: user.DDHFirm,
  };
  if (user.FirmId === 0 && firm !== null) {
    headers = { ...headers, 'x-universal-firm': firm };
  }
  let fetchProperties = {
    BaseUrl: `${services.Dashboard.URL}/EXTRACT?$filter=Extract_SID eq ${sid}`,
    Method: 'GET',
    SuccessMessage: 'Request Successful',
    FailureMessage: 'Request Failed',
    SuppressMessageOverride: false,
    ShowMessage: globals.ON_FAIL,
    HeaderVals: {
      ...headers,
    },
  };
  let response = await dataService.FetchData(fetchProperties);
  if (response.body && response.body.value && response.body.value) {
    return response.body.value[0];
  } else {
    return {};
  }
}

export async function getExtractSchedule({ user, services, extractSid }) {
  let fetchProperties = {
    BaseUrl: `${services.Dashboard.URL}/EXTRACT_SCHEDULE_DETAIL?$filter=Extract_SID eq ${extractSid}`,
    Method: 'GET',
    SuccessMessage: 'Request Successful',
    FailureMessage: 'Request Failed',
    SuppressMessageOverride: false,
    ShowMessage: globals.ON_FAIL,
    HeaderVals: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': services.Dashboard.subscription_key,
      DDHFirm: user.DDHFirm,
    },
  };
  let response = await dataService.FetchData(fetchProperties);

  if (response.body && response.body.value) {
    return response.body.value;
  } else {
    return [];
  }
}

export async function patchExtractBody({ user, services, body = {}, id, firm = null }) {
  let bodyFirm = user.FirmId;
  let headers = {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': services.Dashboard.subscription_key,
    DDHFirm: user.DDHFirm,
  };
  if (user.FirmId === 0 && firm !== null) {
    headers = { ...headers, 'x-universal-firm': firm };
    bodyFirm = firm;
  }

  let fetchProperties = {
    BaseUrl: `${services.Dashboard.URL}/EXTRACT?id=${id}`,
    Method: 'PATCH',
    SuccessMessage: 'Request Successful',
    FailureMessage: 'Request Failed',
    SuppressMessageOverride: false,
    ShowMessage: globals.ON_FAIL,
    CallBody: body,
    HeaderVals: {
      ...headers,
    },
  };

  let extract = await dataService.FetchData(fetchProperties);

  if (!extract.error) {
    return true; // success
  } else {
    return false; // fail
  }
}
