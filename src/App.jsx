import { useState, useCallback } from 'react';

import {
  Tab,
  Tabs,
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  ButtonGroup,
  Button,
  Modal,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';

import Scheme from './components/Scheme';
import tabs from './constants/objects';
import { addObject, clearObjects } from './store/objectsSlice';

const Dropzone = ({ setScheme }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const fileReader = new FileReader();
      fileReader.onload = () => {
        const scheme = JSON.parse(fileReader.result);
        setScheme(scheme);
      };

      fileReader.readAsText(file);
    },
    [setScheme]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div className="dropzone">
        <span className="dropzone__icon">+</span>
        {isDragActive ? (
          <p>Перетащите файл</p>
        ) : (
          <p>Выберите файлы для импорта или перетащите его в эту область</p>
        )}
      </div>
    </div>
  );
};

Dropzone.propTypes = {
  setScheme: PropTypes.func.isRequired,
};

const ImportModal = ({ open, handleClose }) => {
  const [scheme, setScheme] = useState(null);
  const dispatcher = useDispatch();

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Импорт схемы
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {scheme ? 'Схема загружена' : 'Выберите файл для импорта'}
        </Typography>

        {!scheme && <Dropzone setScheme={setScheme} />}

        <Stack justifyContent="center">
          <Button
            onClick={() => {
              dispatcher(clearObjects());

              scheme.forEach((obj) => {
                dispatcher(addObject(obj));
              });

              setScheme(null);
              handleClose();
            }}
            color="primary"
            disabled={!scheme}
          >
            Импортировать
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

ImportModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

function App() {
  const [category, setCategory] = useState(0);
  const [importOpen, setImportOpen] = useState(false);

  const objects = useSelector((state) => state.objects);
  const dispatcher = useDispatch();

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ p: 6 }}
        className="scheme"
      >
        <Box width="100%">
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
                    sx={{ cursor: 'pointer', width: 150 }}
                    onClick={() => dispatcher(addObject(obj))}
                  >
                    <CardMedia
                      component="img"
                      sx={{ objectFit: 'contain', width: 150 }}
                      image={obj.image}
                      alt={obj.label}
                    />
                    <CardContent>
                      <p style={{ wordWrap: 'break-word' }}>{obj.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Box>

        <Stack
          sx={{ p: 2 }}
          bgcolor="#121212"
          width="fit-content"
          borderRadius={5}
          gap={3}
          alignItems="center"
        >
          <Scheme />
          <ButtonGroup>
            <Button
              href={`data:text/json;charset=utf-8,${JSON.stringify(
                objects.map((obj) => ({ id: obj.id, x: obj.x, y: obj.y }))
              )}`}
              download="scheme.json"
              variant="contained"
            >
              Экспорт
            </Button>
            <Button onClick={() => setImportOpen(true)} variant="contained">
              Импорт
            </Button>
          </ButtonGroup>
        </Stack>
      </Stack>

      <ImportModal open={importOpen} handleClose={() => setImportOpen(false)} />
    </>
  );
}

export default App;
