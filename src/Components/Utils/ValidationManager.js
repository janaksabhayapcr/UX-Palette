import iziToast from 'izitoast';
import * as globals from '../../Globals/Variables';

iziToast.settings({
  position: 'topLeft',
  timeout: 5000,
  zindex: 999999999,
});

/*
	CustomAlert(isError, type, message)
	
	isError: true|false
		Displays either a green or red toast.

	type: "VALIDATION FAILED"
		any type or catetory of the action taken.

	message: "Account Name is required"
		any message to describe action taken
*/
export function CustomAlert(isError, type, message) {
  if (!isError) {
    iziToast.success({
      title: message,
      message: type,
    });
  } else {
    iziToast.error({
      title: message,
      message: type,
    });
  }
}

/*
	ResolveHTTPResponse(response, successMessage, errorMessage, supressMessage)

	response: res
		The response coming in from fetch() API request

	successMessage: "Request Successful"
		Message to be displayed upon HTTP status code in the 200's
		
	errorMessage: "Request Failed"
		Message to be displayed upon HTTP status codes between 300 and 500

	supressMessage: true|false
		Flag to show or not show message.
*/
export function ResolveHTTPResponse(response, successMessage, errorMessage, supressMessage, supressCode) {
  let requestSuccessful = true;
  let code = '0';
  if (response) {
    switch (true) {
      //SUCCESS
      case response.status < 300:
        code = ' ';
        break;

      //REDIRECTION
      case response.status < 400:
        code = response.statusText;
        break;

      //UNAUTHORIZED
      case response.status === 401:
        // document.cookie = `x_universal_id=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;${globals.SAMESITECOOKIE}`;
        // document.cookie = `x_universal_forceBoot=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;${globals.SAMESITECOOKIE}`;
        // localStorage.clear();
        // window.location = globals.B2C_LOGOUT_POLICY_URL
        // supressMessage = true
        break;

      //CLIENT ERRORS
      case response.status < 500:
        code = 'Unkown Error';
        requestSuccessful = false;
        break;

      //SERVER ERRORS
      case response.status < 600:
        code = 'Server Error';
        requestSuccessful = false;
        break;

      default:
        code = 'Unkown Error';
        requestSuccessful = false;
    }
  }
  if (!supressMessage) {
    if (requestSuccessful) {
      iziToast.success({
        title: successMessage,
        message: supressCode ? '' : code,
      });
    } else {
      response.json().then((body) => {
        try {
          // Check if we have a detailed message on what went wrong in the Value array
          body['Value'] && JSON.stringify(body['Value'])
            ? Object.keys(body['Value']).forEach(function (key) {
                iziToast.error({
                  title: body['Message'] ? body['Message'] : errorMessage,
                  message: body['Value'][key]['UserMessage'],
                });
              })
            : console.log(body['UserMessage']);
          // If we don't have a detailed message above, try some other nodes in the response to get a meaningful message
          // Last resort is just to show an error and the code
          iziToast.error({
            title: body['Message'] ? body['Message'] : errorMessage,
            message: body['UserMessage']
              ? body['UserMessage']
              : JSON.stringify(body[Object.keys(body)[0]][0]['UserMessage'])
              ? body[Object.keys(body)[0]][0]['UserMessage']
              : supressCode
              ? ''
              : code,
          });
        } catch (e) {
          iziToast.error({
            title: 'Error',
            message: errorMessage ? errorMessage : 'An error has occured',
          });
        }
      });

      // try{
      // 	response.clone().json().then(body =>

      // 		iziToast.error({
      // 			title: errorMessage,
      // 			message:
      // 			JSON.stringify(body['Value']) ?
      // 			JSON.stringify(test)
      // 			:
      // 			JSON.stringify(body['UserMessage']) ?

      // 			JSON.stringify(body['UserMessage'])

      // 			:
      // 			body[Object.keys(body)[0]][0]['UserMessage']

      // 		}))
      // }catch(e){
      // 	iziToast.error({
      // 		title: errorMessage,
      // 		message: supressCode ? '' : code,
      // 	});
      // }
    }
  }

  if (requestSuccessful) {
    return response
      .json()
      .then((json) => {
        return { error: false, body: json };
      })
      .catch((err) => {
        return { error: false, body: null };
      });
  } else {
    return response
      .json()
      .then((json) => ({ error: true, body: json }))
      .catch((err) => ({ error: true, body: null }));
  }
}

export function toastMessage(success, message, title, position='topLeft') {
  let msg = {};

  if(title && message) {
    msg = {
      title: title,
      message: message,
      position: position
    }
  }else{
    msg = {
      title: message,
      position: position
    }
  }

  if (success) {
    iziToast.success({...msg});
  } else {
    iziToast.error({...msg});
  }
}
