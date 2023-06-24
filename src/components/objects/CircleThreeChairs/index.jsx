import { Circle, Group } from 'react-konva';
import PropTypes from 'prop-types';
import { GRID_SIZE } from '../../../constants';

const CircleThreeChairs = ({ x, y, onDragEnd }) => {
  const tableRadius = GRID_SIZE * 2;
  const chairRadius = GRID_SIZE;
  const chairSpacingY = GRID_SIZE;

  const chairPositions = [
    {
      x: tableRadius - chairRadius - GRID_SIZE,
      y: tableRadius + chairRadius + chairSpacingY,
    },
    {
      x: chairRadius - tableRadius - 2 * GRID_SIZE,
      y: chairRadius - tableRadius - GRID_SIZE,
    },
    {
      x: tableRadius - chairRadius + 2 * GRID_SIZE,
      y: chairRadius - tableRadius - GRID_SIZE,
    },
  ];

  return (
    <Group
      draggable
      onDragEnd={onDragEnd}
      x={x || tableRadius + chairRadius * 2}
      y={y || tableRadius + chairRadius}
    >
      <Circle radius={tableRadius} fill="#fff" />
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

CircleThreeChairs.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  onDragEnd: PropTypes.func.isRequired,
};

export default CircleThreeChairs;
