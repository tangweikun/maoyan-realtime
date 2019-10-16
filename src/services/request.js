import { formatQueryParams } from './formatQueryParams';

export async function postRequest(path, params = {}) {
  const options = {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
    }
  };

  return fetch(path, options)
    .then(checkStatus)
    .then(parseJSON)
    .catch(error => console.log(error));
}

export async function getRequest(path, params = {}) {
  const options = {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    }
  };

  return fetch(path + formatQueryParams(params), options)
    .then(checkStatus)
    .then(parseJSON)
    .catch(error => console.log(error));
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function parseJSON(response) {
  return response.json();
}

