import PropTypes from 'prop-types';
import React from 'react';

const Input = ({
  name, label, type, value, onChange, id,
}) => (
  <div className="field">
    <div className="control">
      <label htmlFor={name} className="label">
        { label }
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          id={id}
          className="input is-info"
        />
      </label>
    </div>
  </div>
);

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default Input;
