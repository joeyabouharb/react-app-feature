/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { downloadFile } from '../../services/fileService';

const File = ({
  name, access_token, multiSelectOn, addToSelect,
}) => {
  const linkRef = React.createRef();
  const [anchorLink, onLinkChanged] = useState('#');
  const [active, toggle] = useState(false);
  const OnClick = () => {
    downloadFile(access_token, name)
      .then((data) => {
        const href = window.URL.createObjectURL(data);
        const a = linkRef.current;
        a.download = name.split('/').slice(-1).pop();
        onLinkChanged(href);
        a.click();
        onLinkChanged('#');
      // eslint-disable-next-line no-console
      }).catch((err) => console.log(err));
  };
  return (
    <div className="panel-block has-text-left section">
      <button
        className="button is-white has-text-dark is-fullwidth has-text-left"
        style={{ justifyContent: 'start' }}
        onClick={OnClick}
        type="button"
      >
        <span className="panel-icon">
          <FontAwesomeIcon icon={faFileAlt} />
        </span>
        { name.split('/').slice(-1).pop() }
      </button>
      <a
        download
        href={anchorLink}
        ref={linkRef}
        className="is-invisible"
      />
      <label className={`checkbox${!multiSelectOn ? ' is-invisible' : ''}`} htmlFor={name}>
        <input
          type="checkbox"
          checked={active}
          onChange={() => {
            toggle(!active);

            addToSelect(name, !active);
          }}
        />
      </label>
    </div>
  );
};

File.propTypes = {
  name: PropTypes.string.isRequired,
  access_token: PropTypes.string.isRequired,
  addToSelect: PropTypes.func.isRequired,
  multiSelectOn: PropTypes.bool.isRequired,
};

export default File;
