import { Gantt } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';

export function GanttComponent() {
  return (
    <div>
      <Gantt
        tasks={[
          {
            start: new Date(2020, 1, 3),
            end: new Date(2020, 1, 4),
            name: 'Idea',
            id: 'Task 0',
            type: 'task',
            progress: 45,
            isDisabled: true,
            styles: {
              progressColor: '#ffbb54',
              progressSelectedColor: '#ff9e0d',
            },
            dependencies: ['Task 1'],
          },
          {
            start: new Date(2020, 1, 1),
            end: new Date(2020, 1, 2),
            name: 'Idea',
            id: 'Task 1',
            type: 'task',
            progress: 45,
            isDisabled: true,
            styles: {
              progressColor: '#ffbb54',
              progressSelectedColor: '#ff9e0d',
            },
          },
        ]}
      />
    </div>
  );
}
