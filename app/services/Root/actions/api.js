import { ADD_API } from './types';

export function addApi(api) {
  return {
    type: ADD_API,
    payload: api
  };
}
