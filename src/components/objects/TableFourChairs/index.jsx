import { Circle, Rect, Group } from 'react-konva';
import PropTypes from 'prop-types';
import { GRID_SIZE } from '../../../constants';

const TableFourChairs = ({ x, y, onDragEnd }) => {
  const tableWidth = GRID_SIZE * 6;
  const tableHeight = GRID_SIZE * 3;
  const chairRadius = GRID_SIZE;
  const chairSpacingX = 0;
  const chairSpacingY = GRID_SIZE;

  const chairPositions = [
    {
      x: chairRadius - chairSpacingX,
      y: tableHeight + chairRadius + chairSpacingY,
    },
    {
      x: tableWidth - chairRadius - chairSpacingX,
      y: tableHeight + chairRadius + chairSpacingY,
    },
    {
      x: chairRadius - chairSpacingX,
      y: chairRadius - tableHeight,
    },
    {
      x: tableWidth - chairRadius - chairSpacingX,
      y: chairRadius - tableHeight,
    },
  ];

  return (
    <Group
      draggable
      onDragEnd={onDragEnd}
      x={x || 0}
      y={y || chairRadius * 2 + chairSpacingY}
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

TableFourChairs.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  onDragEnd: PropTypes.func.isRequired,
};

export default TableFourChairs;
