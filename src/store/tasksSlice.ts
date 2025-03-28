import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../types';

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    updateTaskWeather: (state, action: PayloadAction<{ id: string; weather: { temp: number; condition: string } }>) => {
      const task = state.tasks.find(t => t.id === action.payload.id);
      if (task) {
        task.weather = action.payload.weather;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
  },
});

export const { addTask, removeTask, toggleTask, updateTaskWeather } = tasksSlice.actions;
export default tasksSlice.reducer;