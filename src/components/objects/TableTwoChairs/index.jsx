import PropTypes from 'prop-types';
import { Circle, Rect, Group } from 'react-konva';

import { GRID_SIZE } from '../../../constants';

const TableTwoChairs = ({ x, y, rotation, onDragEnd, onClick }) => {
  const tableWidth = GRID_SIZE * 4;
  const tableHeight = GRID_SIZE * 3;
  const chairRadius = GRID_SIZE;
  const chairSpacingY = GRID_SIZE;

  const chairPositions = [
    {
      x: 2 * chairRadius,
      y: tableHeight + chairRadius + chairSpacingY,
    },
    {
      x: 2 * chairRadius,
      y: chairRadius - tableHeight,
    },
  ];

  return (
    <Group
      draggable
      onDragEnd={onDragEnd}
      onClick={onClick}
      x={x || 0}
      y={y || chairRadius * 2 + chairSpacingY}
      rotation={rotation}
    >
      <Rect width={tableWidth} height={tableHeight} fill="#fff" />
      {chairPositions.map(({ x, y }) => (
        <Circle
          key={`${x}-${y}`}
          x={x}
          y={y}
          radius={chairRadius}
          fill="#fff"
        />
      ))}
    </Group>
  );
};

TableTwoChairs.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  rotation: PropTypes.number,
  onDragEnd: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TableTwoChairs;
