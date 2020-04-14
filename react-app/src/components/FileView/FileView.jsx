import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFilesContext } from '../../contexts/files/filesContext';

const FileView = ({ triggered }) => {
  const state = useFilesContext();
  const [filesAdded, onFilesAdded] = useState(0);
  const [filesTotal, onTotalChange] = useState(0);
  useEffect(() => {
    const added = state.files.length > 0 ? state.files.length - filesTotal : 0;
    onFilesAdded(added);
    onTotalChange(state.files.length);
  }, [state]);
  return (
    triggered
      ? (
        <div style={{
          display: 'block', width: '100%', position: 'fixed', bottom: 0,
        }}
        >
          <div
            className="level"
          >
            <div className="level-item has-text-centered has-background-white is-block" style={{ flex: 1 }}>
              <p className="title has-text-dark">
                { filesAdded }
                &nbsp; Files Added
              </p>
            </div>
          </div>
        </div>
      )
      : (
        <></>
      )
  );
};
FileView.propTypes = {
  triggered: PropTypes.bool.isRequired,
};

export default FileView;
