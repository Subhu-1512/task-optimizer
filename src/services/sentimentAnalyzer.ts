
import { TaskWithAnalysis } from '@/components/TaskItem';

const POSITIVE_KEYWORDS = [
  'happy', 'excited', 'easy', 'simple', 'quick', 'enjoy', 'fun',
  'create', 'play', 'relax', 'creative', 'design', 'connect',
  'inspire', 'motivate', 'interesting', 'passion', 'progress',
  'family', 'friend', 'celebration', 'party', 'festival', 'holiday',
  'birthday', 'weekend', 'hobby', 'leisure', 'game', 'vacation'
];

const NEGATIVE_KEYWORDS = [
  'urgent', 'deadline', 'difficult', 'complex', 'hard', 'problem',
  'fix', 'trouble', 'issue', 'error', 'bug', 'complaint', 'review',
  'stress', 'worry', 'critical', 'overdue', 'challenging', 'tired'
];

const BUSINESS_KEYWORDS = [
  'meeting', 'presentation', 'client', 'report', 'project', 'deadline',
  'email', 'call', 'business', 'work', 'job', 'interview', 'payment', 
  'invoice', 'contract', 'important', 'urgent', 'boss', 'colleague',
  'conference', 'manager', 'director', 'office', 'corporate', 'professional'
];

const PERSONAL_KEYWORDS = [
  'family', 'friend', 'dinner', 'lunch', 'movie', 'party', 'celebration',
  'birthday', 'wedding', 'festival', 'holiday', 'shopping', 'gym', 'exercise',
  'hobby', 'game', 'weekend', 'vacation', 'trip', 'visit', 'personal',
  'home', 'garden', 'cooking', 'cleaning', 'grocery'
];

const analyzeSentiment = (task: string): 'positive' | 'neutral' | 'negative' => {
  const lowerTask = task.toLowerCase();
  
  const isBusinessTask = BUSINESS_KEYWORDS.some(keyword => lowerTask.includes(keyword));
  
  const isPersonalTask = PERSONAL_KEYWORDS.some(keyword => lowerTask.includes(keyword));
  
  if (isBusinessTask) {
    return 'neutral';
  }
  
  if (isPersonalTask) {
    return 'positive';
  }
  
  const positiveScore = POSITIVE_KEYWORDS.reduce((score, keyword) => 
    lowerTask.includes(keyword) ? score + 1 : score, 0);
  
  const negativeScore = NEGATIVE_KEYWORDS.reduce((score, keyword) => 
    lowerTask.includes(keyword) ? score + 1 : score, 0);
  
  if (positiveScore > negativeScore) return 'positive';
  if (negativeScore > positiveScore) return 'negative';
  
  return 'neutral';
};

const estimateTime = (task: string, sentiment: 'positive' | 'neutral' | 'negative'): number => {
  const lowerTask = task.toLowerCase();
  const words = task.split(' ').length;
  const characters = task.length;
  
  let baseTime = Math.max(15, Math.min(120, words * 4 + characters * 0.1));
  
  const isBusinessTask = BUSINESS_KEYWORDS.some(keyword => lowerTask.includes(keyword));
  if (isBusinessTask) {
    baseTime = baseTime * 1.2; 
  }
  
  switch (sentiment) {
    case 'positive':
      return Math.round(baseTime * 0.8); 
    case 'negative':
      return Math.round(baseTime * 1.3); 
    default:
      return Math.round(baseTime);
  }
};

const determinePriority = (task: string, sentiment: 'positive' | 'neutral' | 'negative'): 'high' | 'medium' | 'low' => {
  const lowerTask = task.toLowerCase();
  
  if ((lowerTask.includes('urgent') || 
       lowerTask.includes('deadline') || 
       lowerTask.includes('important') ||
       lowerTask.includes('asap') ||
       lowerTask.includes('critical')) &&
      BUSINESS_KEYWORDS.some(keyword => lowerTask.includes(keyword))) {
    return 'high';
  }
  
  if (BUSINESS_KEYWORDS.some(keyword => lowerTask.includes(keyword))) {
    return 'high';
  }
  
  if (PERSONAL_KEYWORDS.some(keyword => lowerTask.includes(keyword))) {
    return lowerTask.includes('important') ? 'medium' : 'low';
  }
  
  if (sentiment === 'negative') return 'high';
  if (sentiment === 'neutral') return 'medium';
  return 'low';
};

export const analyzeTasks = (tasksInput: string): TaskWithAnalysis[] => {
  if (!tasksInput || tasksInput.trim() === '') {
    return []; 
  }
  
  try {
    const taskStrings = tasksInput
      .split(',')
      .map(task => task.trim())
      .filter(task => task.length > 0);
    
    if (taskStrings.length === 0) {
      return [];
    }
    
    const analyzedTasks = taskStrings.map((task, index) => {
      const sentiment = analyzeSentiment(task);
      const estimatedTime = estimateTime(task, sentiment);
      const priority = determinePriority(task, sentiment);
      
      return {
        id: `task-${index}`,
        task,
        sentiment,
        estimatedTime,
        priority
      };
    });
    
    return analyzedTasks.sort((a, b) => {
      const priorityValues = { high: 3, medium: 2, low: 1 };
      return priorityValues[b.priority] - priorityValues[a.priority];
    });
  } catch (error) {
    console.error("Error analyzing tasks:", error);
    return []; 
  }
};
