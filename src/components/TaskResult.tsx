
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TaskItem, { TaskWithAnalysis } from './TaskItem';

interface TaskResultProps {
  tasks: TaskWithAnalysis[];
  totalTime: number;
}

const TaskResult: React.FC<TaskResultProps> = ({ tasks, totalTime }) => {
  const hours = Math.floor(totalTime / 60);
  const minutes = totalTime % 60;
  
  const timeString = hours > 0 
    ? `${hours} hour${hours !== 1 ? 's' : ''} ${minutes > 0 ? `${minutes} min` : ''}`
    : `${minutes} minutes`;

  return (
    <Card className="glass-card w-full max-w-3xl mx-auto animate-scale-in overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium">
          Optimized Task Schedule
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Total estimated time: <span className="font-medium">{timeString}</span>
        </p>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        {tasks.map((task, index) => (
          <TaskItem key={task.id} task={task} index={index} />
        ))}
      </CardContent>
    </Card>
  );
};

export default TaskResult;
