import { useState } from 'react';
import { Container, Grid } from '@mantine/core';
import FileDropZone from '/components/DropZone.js';
import DraggableResizableBox from '/components/DraggableResizableBox.js';
import SelectionButtonGroup from '/components/SelectionButtonGroup.js';

export default function Home() {
  const [files, setFiles] = useState([]);
  const [selectedType, setSelectedType] = useState(null);

  const handleDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
    if (acceptedFiles.length > 0) {
      const fileType = acceptedFiles[0].type.startsWith('video') ? 'video' : 'audio';
      setSelectedType(fileType);
    }
  };

  return (
    <Container>
      <FileDropZone onDrop={handleDrop} />
      <Grid>
        <Grid.Col span={8}>
          {files.length > 0 && (
            <DraggableResizableBox>
              {selectedType === 'video' && (
                <video controls style={{ width: '100%' }}>
                  <source src={URL.createObjectURL(files[0])} type={files[0].type} />
                </video>
              )}
              {selectedType === 'audio' && (
                <audio controls style={{ width: '100%' }}>
                  <source src={URL.createObjectURL(files[0])} type={files[0].type} />
                </audio>
              )}
            </DraggableResizableBox>
          )}
        </Grid.Col>
        <Grid.Col span={4}>
          <SelectionButtonGroup type={selectedType} />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
