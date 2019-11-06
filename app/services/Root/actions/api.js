import { ADD_API } from './types';

export function addApi(api, firstName, lastName, email) {
  return {
    type: ADD_API,
    payload: api,
    firstNamepayload: firstName,
    lastNamepayload: lastName,
    emailpayload: email
  };
}
