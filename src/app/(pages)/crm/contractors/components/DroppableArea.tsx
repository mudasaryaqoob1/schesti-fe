// DroppableArea.js
import React from 'react';
import { useDrop } from 'react-dnd';
import { StandardToolType } from '../types';

type Props = {
    onDrop: (_item: { type: StandardToolType, tool?: StandardToolType }, _offset: any) => void;
    children: React.ReactNode;
};

const DroppableArea = ({ onDrop, children }: Props) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'TOOL',
        drop: (item: { type: StandardToolType, tool?: StandardToolType, [key: string]: any }, monitor) => {
            if (item.tool) {
                const delta = monitor.getDifferenceFromInitialOffset();
                if (!delta) return;

                const newPosition = {
                    x: item.position.x + delta.x,
                    y: item.position.y + delta.y,
                };
                onDrop(item, newPosition);
            } else {

                const offset = monitor.getClientOffset();
                onDrop(item, offset);
            }
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop}
            style={{
                minHeight: '100px',
                backgroundColor: isOver ? 'lightgreen' : 'lightgrey',
                padding: '10px',
                position: 'relative',
            }}
        >
            {children}
        </div>
    );
};

export default DroppableArea;
