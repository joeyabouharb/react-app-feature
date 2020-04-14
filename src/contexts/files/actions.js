import types from './types';

export const addAFile = (file) => ({
  type: types.ADD_FILE, payload: file,
});

export const addFiles = (files) => ({
  type: types.ADD_FILES, payload: files,
});

export const clearFiles = () => ({
  type: types.CLEAR_FILES, payload: null,
});

export const deleteFiles = (fileIndexes) => ({
  type: types.DELETE_FILE, payload: fileIndexes,
});

export const letModalSleep = () => ({
  type: types.MODAL_SLEEPS, payload: null,
});
