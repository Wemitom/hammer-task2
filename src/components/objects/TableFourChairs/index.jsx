import { Circle, Rect, Group } from 'react-konva';
import PropTypes from 'prop-types';
import { GRID_SIZE } from '../../../constants';

const TableFourChairs = ({ x, y, onDragEnd }) => {
  const tableWidth = GRID_SIZE * 6;
  const tableHeight = GRID_SIZE * 3;
  const chairRadius = GRID_SIZE;
  const chairSpacingX = 0;
  const chairSpacingY = GRID_SIZE;

  const tableX = Math.round(x / GRID_SIZE) * GRID_SIZE;
  const tableY = Math.round(y / GRID_SIZE) * GRID_SIZE;

  const chair1X =
    Math.round((tableX + chairRadius - chairSpacingX) / GRID_SIZE) * GRID_SIZE;
  const chair1Y =
    Math.round(
      (tableY + tableHeight + chairRadius + chairSpacingY) / GRID_SIZE
    ) * GRID_SIZE;
  const chair2X =
    Math.round(
      (tableX + tableWidth - chairRadius - chairSpacingX) / GRID_SIZE
    ) * GRID_SIZE;
  const chair2Y = chair1Y;
  const chair3X = chair1X;
  const chair3Y =
    Math.round((tableY - chairRadius - chairSpacingY) / GRID_SIZE) * GRID_SIZE;
  const chair4X = chair2X;
  const chair4Y = chair3Y;

  return (
    <Group draggable onDragEnd={onDragEnd}>
      <Rect x={0} y={0} width={tableWidth} height={tableHeight} fill="#fff" />
      <Circle
        x={chair1X - tableX}
        y={chair1Y - tableY}
        radius={chairRadius}
        fill="#fff"
      />
      <Circle
        x={chair2X - tableX}
        y={chair2Y - tableY}
        radius={chairRadius}
        fill="#fff"
      />
      <Circle
        x={chair3X - tableX}
        y={chair3Y - tableY}
        radius={chairRadius}
        fill="#fff"
      />
      <Circle
        x={chair4X - tableX}
        y={chair4Y - tableY}
        radius={chairRadius}
        fill="#fff"
      />
    </Group>
  );
};

TableFourChairs.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  onDragEnd: PropTypes.func.isRequired,
};

export default TableFourChairs;
