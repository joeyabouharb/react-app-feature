import React from 'react';
import PropTypes from 'prop-types';
import DotLoader from 'react-spinners/DotLoader';

const Loading = (props) => (
  <div className="section">
    <div
      className="container card is-flex"
      style={{
        padding: '2rem',
        maxWidth: '700px',
        borderRadius: '0.5rem',
        justifyContent: 'center',
      }}
    >
      <DotLoader size={100} loading={props.loading} />
    </div>
  </div>
);

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Loading;
