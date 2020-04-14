/* eslint-disable camelcase */
const URL = 'http://localhost:4545/api';

export const FilesUpload = (files, access_token) => {
  const data = new FormData();

  files.forEach(({ fileData, fileInfo }) => {
    console.log(`${fileInfo.parentDir}${fileInfo.fullPath ? fileInfo.fullPath.slice(1) : fileData.name}`);
    data.append(
      'file',
      fileData,
      `${fileInfo.parentDir}${fileInfo.fullPath ? fileInfo.fullPath.slice(1) : fileData.name}`,
    );
  });
  return fetch(`${URL}/files/upload`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${access_token}`,
    },
    body: data,
  }).then((response) => {
    if (response.status === 200) {
      return response.json();
    } if (response.status === 400) {
      return Promise.reject(new Error(':('));
    }
    return Promise.reject(new Error(':|'));
  });
};

export const retrieveFiles = (token, dir = '/') => fetch(
  `${URL}/files?dir=${dir}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  },
).then((response) => response.json());

export const downloadFile = (token, file) => fetch(
  `${URL}/files/download?file=${encodeURIComponent(file)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  },
).then((data) => {
  if (data.status === 200) {
    return data.blob();
  }
  return Promise.reject(data.json().then((error) => error));
}).catch(async (result) => Promise.reject(await result));

export const deleteSelectedFiles = (token, files) => fetch(
  `${URL}/files/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(files),
  },
).then(() => {}).catch((err) => console.log(err));
