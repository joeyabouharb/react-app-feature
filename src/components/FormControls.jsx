import PropTypes from 'prop-types';
import React from 'react';

const Input = ({
  name, label, type, value, onChange, id,
}) => (
  <div>
    <div>
      <label htmlFor="Email_Username">
        { label }
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          id={id}
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
