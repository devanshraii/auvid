import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { Group, Text } from '@mantine/core';

function FileDropZone({ onDrop }) {
  return (
    <Dropzone onDrop={onDrop} accept={[MIME_TYPES.video, MIME_TYPES.audio]} style={{ border: '2px dashed #ccc', padding: '20px' }}>
      {() => (
        <Group position="center" spacing="xl" style={{ minHeight: 200, pointerEvents: 'none' }}>
          <Text color="red" align="center">Drag videos or audio files here, or click to select files</Text>
        </Group>
      )}
    </Dropzone>
  );
}

export default FileDropZone;
