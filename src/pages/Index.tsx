
import React from 'react';
import TaskOptimizer from '@/components/TaskOptimizer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/50">
      <header className="w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium tracking-wide mb-4 animate-scale-in">
            INTELLIGENT TASK MANAGEMENT
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            AI Task Optimizer
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Enter your tasks, and our AI will analyze sentiment to create an optimized schedule 
            with time estimates for maximum productivity.
          </p>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <TaskOptimizer />
      </main>

      <footer className="w-full max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <p>
          Designed with precision and minimalism. Enter tasks with commas for detailed analysis.
        </p>
      </footer>
    </div>
  );
};

export default Index;
