import * as validationManager from '../Utils/ValidationManager';
import React, { Component } from 'react';
// @params
//  checkRequired: boolean if we even need to check for individual required fields yet or not, (have they hit save)
//  data: Object with data
//  requiredFieldName: Name of field
// @return
//  boolean true
export function showRequired(checkRequired, data, requiredFieldName) {
  if (!checkRequired) {
    return false;
  } //Arent ready to check yet
  if (!data || data[requiredFieldName] === null || data[requiredFieldName] === undefined || data[requiredFieldName] === '') {
    return true; //Field is missing value, should show required
  } else {
    //Field has a value, no need to show required
    return false;
  }
}

// @params
//  data: Object with data
//  requiredFieldName: Array with names of fields
//  optionalPhonEmail: boolean check for Phone and Email specifically.  One or the other is required when set to true.
// @return
//  boolean true
export function hasRequired(data, requiredFieldNames, optionalPhoneEmail) {
  // if optionalPhoneEmail = true, make sure we have either a Phone or an Email
  if (optionalPhoneEmail === true) {
    let missing_error = false;
    let missing = [];
    for (let b in requiredFieldNames) {
      if (!data || data[requiredFieldNames[b]] === null || data[requiredFieldNames[b]] === undefined || data[requiredFieldNames[b]] === '') {
        missing.push(requiredFieldNames[b]);
        missing_error = true;
      }
    }
    if (missing.indexOf('email') !== -1 && missing.indexOf('phone') !== -1 && missing.length === 2) {
      validationManager.CustomAlert(true, 'Please provide either a "Phone" or "Email"!', 'Error');
      return false; //Email Phone Check, show message
    } else {
      if (missing_error === true) {
        //If we have an Email or a Phone then just remove them from the required list and check the other required fields.
        if (missing.indexOf('email') !== -1) {
          missing.splice(missing.indexOf('email'), 1);
        }
        if (missing.indexOf('phone') !== -1) {
          missing.splice(missing.indexOf('phone'), 1);
        }
        //Check if we still have no missing fields
        if (missing.length === 0) {
          return true; // No missing fields
        } else {
          validationManager.CustomAlert(true, 'Please provide all required fields!', 'Error');
          return false; //Field is missing value, should show required
        }
      }
    }
  } else {
    // Process Required Fields like we have always processed them
    for (let i in requiredFieldNames) {
      if (!data || data[requiredFieldNames[i]] === null || data[requiredFieldNames[i]] === undefined || data[requiredFieldNames[i]] === '') {
        validationManager.CustomAlert(true, 'Please provide all required fields!', 'Error');
        return false; //Field is missing value, should show required
      }
    }
  }

  return true; //All required fields have values
}

export function getRequiredAsterisk(always, requiredFields, field, viewOnly) {
  let returnAsterisk = '';
  if ((requiredFields.indexOf(field) !== -1 || always) && !viewOnly) {
    returnAsterisk = <i className="fa fas fa-asterisk required-field"></i>;
  }
  return returnAsterisk;
}
