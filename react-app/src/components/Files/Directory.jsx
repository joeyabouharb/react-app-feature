import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

const Directory = ({
  prefix, changeDir
}) => (
  <div className="panel-block has-text-left">
    <button
      className="button is-white has-text-dark is-fullwidth has-text-left is-pulled-left"
      type="button"
      style={{ justifyContent: 'start' }}
      onClick={() => changeDir(prefix)}
    >
      <span className="panel-icon">
        <FontAwesomeIcon icon={faFolder} />
      </span>
      { prefix }
    </button>
  </div>
);

Directory.propTypes = {
  prefix: PropTypes.string.isRequired,
  changeDir: PropTypes.func.isRequired,
};

export default Directory;
