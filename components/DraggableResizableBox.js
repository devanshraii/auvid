import { useState } from 'react';
import { Rnd } from 'react-rnd';

function DraggableResizableBox({ children }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 200, height: 200 });

  return (
    <Rnd
      size={{ width: size.width, height: size.height }}
      position={{ x: position.x, y: position.y }}
      onDragStop={(e, d) => setPosition({ x: d.x, y: d.y })}
      onResizeStop={(e, direction, ref, delta, position) => {
        setSize({
          width: ref.style.width,
          height: ref.style.height,
        });
        setPosition(position);
      }}
    >
      <div style={{ border: '1px solid black', padding: 10 }}>
        {children}
      </div>
    </Rnd>
  );
}

export default DraggableResizableBox;
