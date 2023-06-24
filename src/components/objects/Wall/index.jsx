import PropTypes from 'prop-types';
import { Rect } from 'react-konva';

import { GRID_SIZE } from '../../../constants';

const Wall = ({ x, y, rotation, size, onDragEnd, onClick }) => (
  <Rect
    draggable
    x={x}
    y={y}
    rotation={rotation}
    width={size * GRID_SIZE}
    height={GRID_SIZE / 2}
    onDragEnd={onDragEnd}
    onClick={onClick}
    fill={'#fff'}
  />
);

Wall.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  rotation: PropTypes.number,
  size: PropTypes.number,
  onDragEnd: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Wall;
