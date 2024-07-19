import React from 'react';
import { useDrag, } from 'react-dnd';
import { PdfContractMode } from '../types';

type Position = {
  x: number;
  y: number;
}

type Props<T extends { position: Position }> = {
  data: T;
  children: React.ReactNode;
  type: string;
  mode: PdfContractMode
}

const DraggableItem = <T extends { position: Position },>({ data, children, mode }: Props<T>) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TOOL',
    item: data,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));


  return (
    <div
      ref={(node) => {
        drag(node);
      }}
      style={{
        opacity: isDragging ? 0.5 : 1,
        position: 'absolute',
        left: data.position.x,
        top: data.position.y,
        cursor: mode === 'edit-fields' ? 'move' : 'pointer',
      }}
    >
      {children}
    </div>
  );
};

export default DraggableItem;
