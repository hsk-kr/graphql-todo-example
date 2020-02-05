import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'reactstrap';

const Loading = ({ color = 'primary', size = '5em' }) => {
  return (
    <Spinner type="grow" color={color} style={{ width: size, height: size }} />
  );
};

Loading.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
};

export default memo(Loading);
