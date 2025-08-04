export interface Question {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  isPublic: boolean;
  hasAudio: boolean;
  createdAt: string;
  author?: string;
}

export const categories = [
  'Technical',
  'Behavioral',
  'System Design',
  'Coding',
  'Leadership',
  'Culture Fit',
  'Product',
  'Strategy'
];

export const mockQuestions: Question[] = [
  {
    id: '1',
    question: 'Tell me about yourself and your background in software development.',
    answer: 'I am a passionate software developer with 5 years of experience in full-stack development. I specialize in React, Node.js, and cloud technologies. I have led teams of 3-5 developers and delivered multiple successful projects...',
    category: 'Behavioral',
    tags: ['introduction', 'experience', 'background'],
    isPublic: true,
    hasAudio: true,
    createdAt: '2024-01-15',
    author: 'John Doe'
  },
  {
    id: '2',
    question: 'How would you design a URL shortener like bit.ly?',
    answer: 'I would approach this system design problem by first understanding the requirements: we need to shorten URLs, redirect users, and handle high traffic. The key components would include...',
    category: 'System Design',
    tags: ['system-design', 'scalability', 'databases'],
    isPublic: true,
    hasAudio: false,
    createdAt: '2024-01-14',
    author: 'Jane Smith'
  },
  {
    id: '3',
    question: 'Describe a time when you had to handle a difficult team member.',
    answer: 'In my previous role as a team lead, I encountered a situation where a team member was consistently missing deadlines and seemed disengaged. I approached this by...',
    category: 'Leadership',
    tags: ['conflict-resolution', 'team-management', 'communication'],
    isPublic: false,
    hasAudio: true,
    createdAt: '2024-01-13'
  },
  {
    id: '4',
    question: 'What is the difference between REST and GraphQL?',
    answer: 'REST and GraphQL are both API design approaches, but they differ significantly in their philosophy and implementation. REST is resource-based and uses multiple endpoints...',
    category: 'Technical',
    tags: ['api', 'rest', 'graphql', 'backend'],
    isPublic: true,
    hasAudio: false,
    createdAt: '2024-01-12',
    author: 'Mike Johnson'
  },
  {
    id: '5',
    question: 'How do you handle tight deadlines and pressure?',
    answer: 'I handle pressure by breaking down complex tasks into manageable pieces, prioritizing based on impact, and maintaining clear communication with stakeholders...',
    category: 'Behavioral',
    tags: ['stress-management', 'time-management', 'prioritization'],
    isPublic: false,
    hasAudio: true,
    createdAt: '2024-01-11'
  }
];