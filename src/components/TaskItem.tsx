
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

export interface TaskWithAnalysis {
  id: string;
  task: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  estimatedTime: number; // in minutes
  priority: 'high' | 'medium' | 'low';
}

interface TaskItemProps {
  task: TaskWithAnalysis;
  index: number;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, index }) => {
  const sentimentColors = {
    positive: 'bg-green-50 border-green-200 text-green-700',
    neutral: 'bg-blue-50 border-blue-200 text-blue-700',
    negative: 'bg-amber-50 border-amber-200 text-amber-700'
  };
  
  const priorityBadge = {
    high: 'bg-red-100 text-red-700 border-red-200',
    medium: 'bg-amber-100 text-amber-700 border-amber-200',
    low: 'bg-green-100 text-green-700 border-green-200'
  };

  return (
    <Card 
      className={`task-item border ${sentimentColors[task.sentiment]} transition-all duration-300 hover:shadow-md`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex-1">
          <h3 className="font-medium text-foreground">{task.task}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className={priorityBadge[task.priority]}>
              {task.priority} priority
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-3.5 w-3.5 mr-1" />
              <span>{task.estimatedTime} min</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskItem;
