import PropTypes from 'prop-types';
import React, {
  createElement,
  useReducer,
  useContext,
} from 'react';
import filesReducer from './reducers';

const FilesContext = React.createContext();
const FilesDispatchContext = React.createContext();
const initialState = { files: [] };

export const FilesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filesReducer, initialState);

  return createElement(
    FilesContext.Provider,
    { value: state },
    createElement(
      FilesDispatchContext.Provider, { value: dispatch },
      children,
    ),
  );
};

FilesProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export const useFilesContext = () => {
  const context = useContext(FilesContext);
  if (context === undefined) {
    throw new Error('Hmm?');
  }
  return context;
};


export const useFilesDispatch = () => useContext(FilesDispatchContext);
