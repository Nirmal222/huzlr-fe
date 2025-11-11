export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: 'file' | 'image' | 'link';
  size?: number;
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Comment {
  id: string;
  text: string;
  author: string;
  authorAvatar?: string;
  timestamp: Date;
}

export interface CardData {
  id: string;
  title: string;
  content: string;
  status: string;
  priority: 'low' | 'medium' | 'high';
  assignees: string[];
  dueDate?: Date;
  tags: string[];
  attachments: Attachment[];
  subtasks: Subtask[];
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ColumnData {
  id: string;
  title: string;
  wipLimit?: number;
  color?: string;
}

export interface BoardData {
  id: string;
  title: string;
  columns: ColumnData[];
  cards: CardData[];
}

// Sample users for assignees
export const users = [
  { id: 'user1', name: 'Alex Johnson', avatar: 'AJ' },
  { id: 'user2', name: 'Sarah Chen', avatar: 'SC' },
  { id: 'user3', name: 'Mike Wilson', avatar: 'MW' },
  { id: 'user4', name: 'Emily Davis', avatar: 'ED' },
];

// Available tags
export const availableTags = [
  { id: 'bug', label: 'Bug', color: '#ef4444' },
  { id: 'feature', label: 'Feature', color: '#3b82f6' },
  { id: 'enhancement', label: 'Enhancement', color: '#8b5cf6' },
  { id: 'documentation', label: 'Documentation', color: '#06b6d4' },
  { id: 'design', label: 'Design', color: '#ec4899' },
  { id: 'testing', label: 'Testing', color: '#f59e0b' },
];

export const initialBoard: BoardData = {
  id: 'board1',
  title: 'Project Development',
  columns: [
    { id: 'todo', title: 'To Do', wipLimit: 5, color: '#6b7280' },
    { id: 'inprogress', title: 'In Progress', wipLimit: 3, color: '#3b82f6' },
    { id: 'review', title: 'Review', wipLimit: 2, color: '#f59e0b' },
    { id: 'done', title: 'Done', color: '#10b981' },
  ],
  cards: [
    {
      id: 'task1',
      title: 'Setup authentication system',
      content: 'Implement OAuth2 authentication with Google and GitHub providers',
      status: 'todo',
      priority: 'high',
      assignees: ['user1', 'user2'],
      dueDate: new Date('2025-01-15'),
      tags: ['feature', 'enhancement'],
      attachments: [
        { id: 'att1', name: 'auth-diagram.png', url: '#', type: 'image' },
      ],
      subtasks: [
        { id: 'sub1', title: 'Setup OAuth providers', completed: false },
        { id: 'sub2', title: 'Create login UI', completed: false },
        { id: 'sub3', title: 'Add session management', completed: false },
      ],
      comments: [
        {
          id: 'com1',
          text: 'We should prioritize Google OAuth first',
          author: 'Alex Johnson',
          authorAvatar: 'AJ',
          timestamp: new Date('2025-01-10'),
        },
      ],
      createdAt: new Date('2025-01-09'),
      updatedAt: new Date('2025-01-10'),
    },
    {
      id: 'task2',
      title: 'Fix navigation bug',
      content: 'Users report navigation menu not closing on mobile devices',
      status: 'inprogress',
      priority: 'high',
      assignees: ['user3'],
      dueDate: new Date('2025-01-12'),
      tags: ['bug'],
      attachments: [],
      subtasks: [
        { id: 'sub4', title: 'Reproduce the issue', completed: true },
        { id: 'sub5', title: 'Fix the bug', completed: false },
      ],
      comments: [],
      createdAt: new Date('2025-01-08'),
      updatedAt: new Date('2025-01-11'),
    },
    {
      id: 'task3',
      title: 'Update documentation',
      content: 'Add API documentation for new endpoints',
      status: 'review',
      priority: 'medium',
      assignees: ['user4'],
      dueDate: new Date('2025-01-20'),
      tags: ['documentation'],
      attachments: [],
      subtasks: [],
      comments: [],
      createdAt: new Date('2025-01-07'),
      updatedAt: new Date('2025-01-10'),
    },
    {
      id: 'task4',
      title: 'Design new dashboard',
      content: 'Create mockups for the analytics dashboard',
      status: 'done',
      priority: 'low',
      assignees: ['user2', 'user4'],
      tags: ['design', 'feature'],
      attachments: [],
      subtasks: [
        { id: 'sub6', title: 'Create wireframes', completed: true },
        { id: 'sub7', title: 'Design high-fidelity mockups', completed: true },
      ],
      comments: [],
      createdAt: new Date('2025-01-05'),
      updatedAt: new Date('2025-01-09'),
    },
  ],
};