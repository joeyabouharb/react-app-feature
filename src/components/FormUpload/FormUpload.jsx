import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import './dropzone.sass';
import { addFiles, clearFiles } from '../../contexts/files/actions';
import { useFilesContext, useFilesDispatch } from '../../contexts/files/filesContext';
import { FilesUpload } from '../../services/fileService';
import { useAuthContext } from '../../contexts/auth/useAuthContext';

const FormUpload = ({ onTriggeredModal, currentDir, onUploadTriggered, uploadTriggered }) => {
  const { files } = useFilesContext();
  const dispatchFile = useFilesDispatch();
  const { access_token } = useAuthContext();
  const fileInputRef = React.createRef();
  const openFileDialog = function openDialog() {
    fileInputRef.current.click();
  };
  const onSubmit = (event) => {
    event.preventDefault();
    FilesUpload(files, access_token)
      .then(() => {
        dispatchFile(clearFiles());
        onUploadTriggered(!uploadTriggered);
      });
  };

  const onFilesAdded = (event) => {
    const data = Object.values(event.target.files).map((fileData) => (
      { fileData, fileInfo: { parentDir: currentDir } }
    ));
    dispatchFile(addFiles(data));
    onTriggeredModal(true);
    setTimeout(() => {
      onTriggeredModal(false);
    }, 2000);
  };
  const reset = () => {
    dispatchFile(clearFiles());
  };
  const refresh = () => {
    onUploadTriggered(!uploadTriggered);
  };
  return (
    <form
      encType="multipart/form-data"
      id="form"
      method="POST"
      onSubmit={onSubmit}
    >
      <div className="field">
        <div
          className="file is-dark is-boxed is-centered"
          onClick={openFileDialog}
          tabIndex="0"
          onKeyPress={() => {}}
          role="button"
        >
          <label className="file-label" htmlFor="fileNames">
            <input
              ref={fileInputRef}
              className="file-input"
              type="file"
              multiple="multiple"
              name="fileNames"
              onChange={onFilesAdded}
            />
            <span className="file-cta">
              <span className="file-icon">
                <FontAwesomeIcon icon={faCloudUploadAlt} />
              </span>
              <span className="file-label">
                Select Files
              </span>
            </span>
          </label>
        </div>
      </div>
      <div className="field">
        <div className="control is-flex is-centered justified flexed-col">
          <button className="button is-warning is-centered" type="submit"> Upload </button>
          <button className="button is-danger is-centered" type="button" onClick={reset}> Reset </button>
          <button className="button is-light is-centered" type="button" onClick={refresh}> Refresh </button>

        </div>
      </div>
    </form>
  );
};

FormUpload.propTypes = {
  onTriggeredModal: PropTypes.func.isRequired,
  currentDir: PropTypes.string.isRequired,
  onUploadTriggered: PropTypes.func.isRequired,
  uploadTriggered: PropTypes.bool.isRequired,
};

export default FormUpload;
