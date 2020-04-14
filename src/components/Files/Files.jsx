import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFileAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import { retrieveFiles, deleteSelectedFiles } from '../../services/fileService';
import { useAuthContext } from '../../contexts/auth/useAuthContext';
import File from './File';
import Directory from './Directory';

const Files = ({ currentDir, changeDir, uploadTriggered }) => {
  const { access_token } = useAuthContext();
  const [dirList, onDirectoryChange] = useState([]);
  const [multiSelectOn, triggerMultiSelect] = useState(false);
  const [selected, addToSelect] = useState([]);
  useEffect(() => {
    retrieveFiles(access_token, currentDir)
      .then((response) => {
        onDirectoryChange(response.result.reverse());
      });
  }, [currentDir, uploadTriggered]);
  const deleteSelected = () => {
    deleteSelectedFiles(access_token, { selected });
    triggerMultiSelect(false);
    addToSelect([]);
  };
  const pushToSelect = (file, active) => {
    if (active) {
      console.log('hello!')
      addToSelect([...selected, file]);
    } else {
      const list = selected.filter((value) => value !== file);
      addToSelect(list);
    }
  };
  const display = dirList.map((object) => {
    if (object.name) {
      return (
        <File
          name={object.name}
          key={object.name}
          access_token={access_token}
          multiSelectOn={multiSelectOn}
          addToSelect={pushToSelect}
        />
      );
    }
    return (
      <Directory
        prefix={object.prefix}
        key={object.prefix}
        changeDir={changeDir}
      />
    );
  });

  return (
    <div className="container is-white">
      <nav className="panel has-background-white">
        <div className="panel-heading is-flex">
          <p className="has-text-light is-7" style={{ wordBreak: 'break-word', flexGrow: 1 }}>
            Your Files: &nbsp;
            {`${!currentDir ? '/' : currentDir}`}
          </p>
          <div className="field">
            <div className="control">
              {
              currentDir
                ? (
                  <button
                    type="button"
                    className="button is-dark is-pulled-right is-small is-7"
                    onClick={() => {
                      const upADir = currentDir.split('/');
                      if (upADir.length > 2) {
                        changeDir(`${upADir.slice(0, -2).join('/')}/`);
                      } else {
                        changeDir('');
                      }
                    }}
                  >
                    Back
                  </button>
                ) : <div />
            }
            </div>
          </div>
        </div>
        <div className="panel-block">
          <p className="control has-icons-left">
            <input className="input" type="text" placeholder="Search" />
            <span className="icon is-left">
              <FontAwesomeIcon icon={faSearch} />
            </span>
          </p>
        </div>
        { display }
        <div className="panel-block">
          {
            !multiSelectOn
              ? (
                <button className="button is-link is-outlined" type="button" onClick={() => triggerMultiSelect(true)}>
                  Select...
                </button>
              )
              : (
                <div>
                  <button className="button is-link is-outlined" type="button" onClick={deleteSelected}> Delete </button>
                </div>
              )
          }
        </div>
      </nav>
    </div>
  );
};

Files.propTypes = {
  currentDir: PropTypes.string.isRequired,
  changeDir: PropTypes.func.isRequired,
  uploadTriggered: PropTypes.bool.isRequired,
};

export default Files;
