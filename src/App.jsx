import { Tab, Tabs, Box, Card } from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Stage, Layer, Rect } from 'react-konva';
import { TableFourChairs } from './components/objects';
import { GRID_COUNT, GRID_SIZE } from './constants';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Card>{children}</Card>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function App() {
  const [category, setCategory] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: GRID_SIZE * 2 });

  const handleDragEnd = (e) => {
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

    e.target.getLayer().batchDraw();

    setPosition({ x, y });
  };

  return (
    <>
      <Box>
        <Box>
          <Tabs
            value={category}
            onChange={(_, value) => {
              console.log(value);
              setCategory(value);
            }}
          >
            <Tab label="Tab 1" />
            <Tab label="Tab 2" />
            <Tab label="Tab 3" />
          </Tabs>
        </Box>
        <TabPanel value={category} index={0}></TabPanel>
        <TabPanel value={category} index={1}>
          Tab 2 Content
        </TabPanel>
        <TabPanel value={category} index={2}>
          Tab 3 Content
        </TabPanel>
      </Box>

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

          <TableFourChairs {...position} onDragEnd={handleDragEnd} />
        </Layer>
      </Stage>
    </>
  );
}

export default App;
