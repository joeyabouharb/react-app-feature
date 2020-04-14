import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Files from '../Files/Files';
import FormUpload from '../FormUpload/FormUpload';
import { addFiles } from '../../contexts/files/actions';
import getAllFileEntries from '../../utils/directoryReader';
import { useFilesDispatch } from '../../contexts/files/filesContext';

const BucketView = ({ onTriggeredModal, changeDir, currentDir }) => {
  const dispatch = useFilesDispatch();
  const [uploadTriggered, onUploadTriggered] = useState(false);
  const onFileDrop = function onDrop(event) {
    event.preventDefault();
    getAllFileEntries(event.dataTransfer.items, currentDir).then((files) => {
      dispatch(addFiles(files));
      onTriggeredModal(true);
    }).then(() => {
      setTimeout(() => {
        onTriggeredModal(false);
      }, 4000);
    });
  };
  const onDragOver = function onDragOver(event) {
    event.preventDefault();
  };
  const onDragLeave = function onDragLeave(event) {
    event.preventDefault();
  };
  return (
    <div
      className="container"
      onDrop={onFileDrop}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
    >
      <div className="section">
        <div className="">
          <FormUpload
            onTriggeredModal={onTriggeredModal}
            currentDir={currentDir}
            onUploadTriggered={onUploadTriggered}
            uploadTriggered={uploadTriggered}
          />
        </div>
        <div
          className=""
        >
          <Files
            currentDir={currentDir}
            changeDir={changeDir}
            uploadTriggered={uploadTriggered}
          />
        </div>
      </div>
    </div>
  );
};

BucketView.propTypes = {
  onTriggeredModal: PropTypes.func.isRequired,
  changeDir: PropTypes.func.isRequired,
  currentDir: PropTypes.string.isRequired,
};

export default BucketView;
