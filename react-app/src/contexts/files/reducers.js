import types from './types';

const filesReducer = (state, { type, payload }) => {
  console.log(type);
  if (type === types.ADD_FILE) {
    return { files: [...state.files, payload] };
  } if (type === types.ADD_FILES) {
    return { files: [...state.files, ...payload] };
  } if (type === types.CLEAR_FILES) {
    return { files: [] };
  }
  return state;
};

export default filesReducer;
