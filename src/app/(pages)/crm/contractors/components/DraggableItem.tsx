import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

type Position = {
  x: number;
  y: number;
}

type Props<T extends { position: Position }> = {
  data: T;
  onDrop: (_data: T, _position: Position) => void;
  children: React.ReactNode;
  type: string;
}

const DraggableItem = <T extends { position: Position },>({ data, onDrop, children, }: Props<T>) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TOOL',
    item: data,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: 'TOOL',
    drop: (item: T, monitor) => {
      console.log("Dropping");
      const delta = monitor.getDifferenceFromInitialOffset();
      if (!delta) return;

      const newPosition = {
        x: data.position.x + delta.x,
        y: data.position.y + delta.y,
      };

      onDrop(item, newPosition);
    },
  }));

  return (
    <div
      ref={(node) => {
        drag(drop(node));
      }}
      style={{
        opacity: isDragging ? 0.5 : 1,
        position: 'absolute',
        left: data.position.x,
        top: data.position.y,
        cursor: 'move',
      }}
    >
      {children}
    </div>
  );
};

export default DraggableItem;
