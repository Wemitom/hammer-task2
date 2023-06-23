import {
  Tab,
  Tabs,
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
} from '@mui/material';
import { useState } from 'react';
import Scheme from './components/Scheme';
import tabs from './constants/objects';

function App() {
  const [category, setCategory] = useState(0);
  const [objects, setObjects] = useState([]);

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
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab.label} />
            ))}
          </Tabs>
        </Box>
        <Stack role="tabpanel" aria-labelledby="ta" alignItems="center">
          <Stack sx={{ p: 2 }} overflow="auto" width="80%">
            <Stack
              direction="row"
              width="fit-content"
              spacing={2}
              flexShrink={0}
              flexGrow={1}
            >
              {tabs[category].objects.map((obj) => (
                <Card
                  key={obj.label}
                  sx={{ cursor: 'pointer' }}
                  onClick={() => setObjects([...objects, obj])}
                >
                  <CardMedia
                    component="img"
                    sx={{ objectFit: 'contain', width: 150 }}
                    image={obj.image}
                    alt={obj.label}
                  />
                  <CardContent>
                    <p>{obj.label}</p>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Box>

      <Box sx={{ p: 2 }} bgcolor="#121212" width="fit-content" borderRadius={5}>
        <Scheme objects={objects} />
      </Box>
    </>
  );
}

export default App;
