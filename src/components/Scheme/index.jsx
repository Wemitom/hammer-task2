import PropTypes from 'prop-types';
import { Stage, Layer, Rect } from 'react-konva';
import { useDispatch, useSelector } from 'react-redux';

import { GRID_COUNT, GRID_SIZE } from '../../constants';
import { updateObject } from '../../store/objectsSlice';
import {
  TableFourChairs,
  TableTwoChairs,
  CircleThreeChairs,
  Wall,
} from '../objects';

const Scheme = ({ setLastSelected }) => {
  const objects = useSelector((state) => state.objects);
  const dispatcher = useDispatch();

  const handleDragEnd = (e, i) => {
    setLastSelected(i);

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

    dispatcher(updateObject({ i, x, y }));

    e.target.getLayer().batchDraw();
  };

  const getObject = (id, props) => {
    switch (id) {
      case 0:
        return <TableFourChairs {...props} />;
      case 1:
        return <TableTwoChairs {...props} />;
      case 2:
        return <CircleThreeChairs {...props} />;
      case 3:
        return <Wall size={1} {...props} />;
      case 4:
        return <Wall size={2} {...props} />;
      case 5:
        return <Wall size={5} {...props} />;
      case 6:
        return <Wall size={6} {...props} />;
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
          getObject(object.id, {
            key: i,
            onDragEnd: (e) => handleDragEnd(e, i),
            onClick: () => setLastSelected(i),
            x: object.x,
            y: object.y,
            rotation: object.rotation,
          })
        )}
      </Layer>
    </Stage>
  );
};

Scheme.propTypes = {
  setLastSelected: PropTypes.func.isRequired,
};

export default Scheme;
