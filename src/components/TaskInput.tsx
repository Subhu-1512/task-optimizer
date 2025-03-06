
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

interface TaskInputProps {
  onSubmit: (tasks: string) => void;
  isProcessing: boolean;
}

const TaskInput: React.FC<TaskInputProps> = ({ onSubmit, isProcessing }) => {
  const [input, setInput] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please enter your tasks separated by commas.",
        variant: "destructive",
      });
      return;
    }
    
    onSubmit(input);
  };

  return (
    <Card className="glass-card w-full max-w-3xl mx-auto overflow-hidden">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label 
              htmlFor="tasks" 
              className="block text-sm font-medium text-foreground/80"
            >
              Enter your tasks
            </label>
            <p className="text-xs text-muted-foreground">
              Separate multiple tasks with commas (e.g., "Complete project, Call client, Review documents")
            </p>
            <textarea
              id="tasks"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Write emails, prepare presentation, team meeting, research competitors..."
              className="w-full min-h-[120px] px-4 py-3 rounded-lg border border-input bg-background/50 focus:ring-2 focus:ring-ring focus:border-input input-transition"
              disabled={isProcessing}
            />
          </div>
          <Button 
            type="submit" 
            className="w-full transition-all duration-300 hover:shadow-md"
            disabled={isProcessing}
          >
            {isProcessing ? 'Analyzing...' : 'Optimize Tasks'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TaskInput;
