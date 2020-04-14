import React, { useState, useEffect } from 'react';
import { FilesProvider, useFilesContext } from '../../contexts/files/filesContext';
import FileView from '../FileView/FileView';

import './Bucket.css';
import BucketView from './BucketView';

const Bucket = () => {
  const [triggered, onTriggeredModal] = useState(false);
  const [currentDir, changeDir] = useState('');
  return (
    <FilesProvider>
      <>
        <BucketView
          onTriggeredModal={onTriggeredModal}
          changeDir={changeDir}
          currentDir={currentDir}
        />
        <FileView triggered={triggered} />
      </>
    </FilesProvider>
  );
};

export default Bucket;
