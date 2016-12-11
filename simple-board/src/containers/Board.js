import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'

class Board extends Component {
  render() {
    return (
      <div>
        Here's board
        <Link to="/board/1">gogo</Link>
      </div>
    );
  }
}

Board.propTypes = {};
Board.defaultProps = {};

export default Board;
