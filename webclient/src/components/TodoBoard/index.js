import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';

const TodoBoard = ({ onLogout }) => {
  return (
    <div>
      <button type="button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

TodoBoard.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default TodoBoard;
