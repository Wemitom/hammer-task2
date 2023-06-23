import { useState } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import { GRID_COUNT, GRID_SIZE } from '../../constants';
import { TableFourChairs, TableTwoChairs } from '../objects';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const Scheme = ({ objects }) => {
  const [positions, setPositions] = useState([]);
  console.log(positions);

  const handleDragEnd = (e, i) => {
    const xRelativeToGrid = e.target.x() % GRID_SIZE;
    const yRelativeToGrid = e.target.y() % GRID_SIZE;

    const snapX =
      xRelativeToGrid < GRID_SIZE / 2
        ? -xRelativeToGrid
        : GRID_SIZE - xRelativeToGrid;
    const snapY =
      yRelativeToGrid < GRID_SIZE / 2
        ? -yRelativeToGrid
        : GRID_SIZE - yRelativeToGrid;

    const x = Math.round((e.target.x() + snapX) / GRID_SIZE) * GRID_SIZE;
    const y = Math.round((e.target.y() + snapY) / GRID_SIZE) * GRID_SIZE;

    e.target.x(x);
    e.target.y(y);

    setPositions(
      positions.map((pos, ind) => {
        if (ind === i)
          return {
            ...pos,
            x: x,
            y: y,
          };
        else return pos;
      })
    );

    e.target.getLayer().batchDraw();
  };

  useEffect(() => {
    objects.length && setPositions((pos) => [...pos, { x: 0, y: 0 }]);
  }, [objects]);

  const getObject = (type, props) => {
    switch (type) {
      case 'table-four-chairs':
        return <TableFourChairs {...props} />;
      case 'table-two-chairs':
        return <TableTwoChairs {...props} />;
      default:
        return null;
    }
  };

  return (
    <Stage width={GRID_SIZE * GRID_COUNT} height={GRID_SIZE * GRID_COUNT}>
      <Layer>
        {[...Array(GRID_COUNT)].map((_, i) => (
          <Rect
            key={`gridLineX${i}`}
            x={i * GRID_SIZE}
            y={0}
            width={1}
            height={GRID_SIZE * GRID_COUNT}
            fill="#ddd"
          />
        ))}
        {[...Array(GRID_COUNT)].map((_, i) => (
          <Rect
            key={`gridLineY${i}`}
            x={0}
            y={i * GRID_SIZE}
            width={GRID_SIZE * GRID_COUNT}
            height={1}
            fill="#ddd"
          />
        ))}

        {objects.map((object, i) =>
          getObject(object.type, {
            key: i,
            onDragEnd: (e) => handleDragEnd(e, i),
          })
        )}
      </Layer>
    </Stage>
  );
};

Scheme.propTypes = {
  objects: PropTypes.arrayOf(PropTypes.object),
};

export default Scheme;
