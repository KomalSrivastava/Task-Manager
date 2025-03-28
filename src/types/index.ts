export interface Task {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  category: string;
  dueDate?: string;
  weather?: {
    temp: number;
    condition: string;
  };
}

export interface User {
  id: string;
  username: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface WeatherData {
  temp: number;
  condition: string;
}

export interface TaskStats {
  total: number;
  completed: number;
  high: number;
  medium: number;
  low: number;
  overdue: number;
}