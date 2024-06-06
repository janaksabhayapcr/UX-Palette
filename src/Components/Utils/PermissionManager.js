import * as globals from '../../Globals/Variables';
import * as dataService from './DataService';

export async function getPermission(services, assets) {
  let Permissions = [];
  let returnedPermissions = [];
  let returnObj = {
    view: false,
    edit: false,
    upload: false,
    download: false,
    ProcessId: 0,
  };

  assets.map((entry) => {
    Permissions.push({
      AssetType: entry.assetType,
      AssetId: entry.assetId,
      ProcessId: entry.assetId,
    });
  });

  let fetchProperties = {
    BaseUrl: `${services.DashboardAPI.URL}/permission/get`,
    Method: 'POST',
    SuccessMessage: 'Request Successful',
    FailureMessage: 'Request Failed',
    SuppressMessageOverride: true,
    ShowMessage: globals.ON_FAIL,
    CallBody: { Permissions },
    HeaderVals: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': services.DashboardAPI.subscription_key,
    },
  };

  let response = await dataService.FetchData(fetchProperties);
  if (!response.error) {
    let json = response.body.Permissions;
    if (json.length !== 0) {
      for (var j in json) {
        returnObj = {
          view: false,
          edit: false,
          upload: false,
          download: false,
          ProcessId: 0,
        };
        returnObj.view = json[j].View;
        returnObj.edit = json[j].Edit;
        returnObj.download = json[j].Download;
        returnObj.upload = json[j].Upload;
        returnObj.ProcessId = json[j].ProcessId;
        returnedPermissions.push(returnObj);
      }
      return returnedPermissions;
    } else {
      returnObj.ProcessId = json[0].ProcessId;
      returnedPermissions.push(returnObj);
      return returnedPermissions;
    }
  } else {
    returnedPermissions.push(returnObj);
    return returnedPermissions;
  }
}

export function isAllowed(allowedRoles, userRoles) {
  for (let i in allowedRoles) {
    for (let j in userRoles) {
      if (allowedRoles[i] === userRoles[j].Name) {
        return true;
      }
    }
  }
  return false;
}
