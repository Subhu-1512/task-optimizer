
import React, { useState } from 'react';
import TaskInput from './TaskInput';
import TaskResult from './TaskResult';
import { TaskWithAnalysis } from './TaskItem';
import { analyzeTasks } from '@/services/sentimentAnalyzer';
import { useToast } from '@/components/ui/use-toast';

const TaskOptimizer: React.FC = () => {
  const [analyzedTasks, setAnalyzedTasks] = useState<TaskWithAnalysis[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [hasResults, setHasResults] = useState(false);
  const { toast } = useToast();

  const handleTaskSubmit = (tasksInput: string) => {
    setIsProcessing(true);
    setHasResults(false);
    
    if (!tasksInput || tasksInput.trim() === '') {
      toast({
        title: "Invalid Input",
        description: "Please enter at least one task.",
        variant: "destructive",
      });
      setIsProcessing(false);
      return;
    }
    
    setTimeout(() => {
      try {
        const tasks = analyzeTasks(tasksInput);
        
        if (tasks.length === 0) {
          toast({
            title: "No Tasks Found",
            description: "Please enter valid tasks separated by commas.",
            variant: "destructive",
          });
          setIsProcessing(false);
          return;
        }
        
        setAnalyzedTasks(tasks);
        
        const total = tasks.reduce((sum, task) => sum + task.estimatedTime, 0);
        setTotalTime(total);
        
        setHasResults(true);
        
        toast({
          title: "Analysis Complete",
          description: `Optimized ${tasks.length} tasks based on sentiment analysis.`,
        });
      } catch (error) {
        console.error("Error in task analysis:", error);
        toast({
          title: "Analysis Failed",
          description: "There was an error analyzing your tasks. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsProcessing(false);
      }
    }, 1500);
  };

  return (
    <div className="space-y-8 w-full max-w-4xl mx-auto">
      <TaskInput onSubmit={handleTaskSubmit} isProcessing={isProcessing} />
      
      {isProcessing && (
        <div className="flex justify-center items-center py-8">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
          <span className="ml-3 text-muted-foreground">Analyzing tasks...</span>
        </div>
      )}
      
      {hasResults && !isProcessing && analyzedTasks.length > 0 && (
        <TaskResult tasks={analyzedTasks} totalTime={totalTime} />
      )}
    </div>
  );
};

export default TaskOptimizer;
