import { Button, ButtonGroup } from '@mantine/core';

function SelectionButtonGroup({ type }) {
  if (type === 'audio') {
    return (
      <ButtonGroup>
        <Button>Edit Audio</Button>
        <Button>Remove Audio</Button>
      </ButtonGroup>
    );
  }

  if (type === 'video') {
    return (
      <ButtonGroup>
        <Button>Edit Video</Button>
        <Button>Remove Video</Button>
      </ButtonGroup>
    );
  }

  return (
    <ButtonGroup>
      <Button>Upload</Button>
      <Button>Clear All</Button>
    </ButtonGroup>
  );
}

export default SelectionButtonGroup;
