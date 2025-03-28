import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { removeTask, toggleTask, updateTaskWeather } from '../store/tasksSlice';
import { CheckCircle, XCircle, Sun, Cloud, AlertTriangle, Clock, Flag, CalendarClock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TaskSearch from './TaskSearch';

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchWeather = async (taskId: string) => {
      try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=auto:ip`);
        const data = await response.json();
        const weather = {
          temp: Math.round(data.current.temp_c),
          condition: data.current.condition.text.toLowerCase().includes('sun') ? 'sunny' : 'cloudy',
        };
        dispatch(updateTaskWeather({ id: taskId, weather }));
      } catch (error) {
        const weather = {
          temp: Math.floor(Math.random() * 30) + 10,
          condition: Math.random() > 0.5 ? 'sunny' : 'cloudy',
        };
        dispatch(updateTaskWeather({ id: taskId, weather }));
      }
    };

    tasks.forEach(task => {
      if (!task.weather) {
        fetchWeather(task.id);
      }
    });
  }, [tasks, dispatch]);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || task.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <Clock className="w-4 h-4" />;
      case 'low': return <Flag className="w-4 h-4" />;
      default: return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-50';
      case 'medium': return 'text-yellow-500 bg-yellow-50';
      case 'low': return 'text-green-500 bg-green-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  const isOverdue = (dueDate: string) => {
    return dueDate && new Date(dueDate) < new Date();
  };

  return (
    <>
      <TaskSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <AnimatePresence>
        <div className="space-y-4">
          {filteredTasks.map(task => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className={`bg-white p-6 rounded-xl shadow-lg transition-all duration-200 ${
                task.completed ? 'opacity-75' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => dispatch(toggleTask(task.id))}
                    className={`${task.completed ? 'text-green-500' : 'text-gray-400'} hover:text-green-600 transition-colors`}
                  >
                    <CheckCircle className="w-6 h-6" />
                  </motion.button>
                  <div className="flex-1">
                    <p className={`text-lg ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                      {task.title}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className={`text-sm font-medium px-3 py-1 rounded-full flex items-center space-x-1 ${getPriorityColor(task.priority)}`}>
                        {getPriorityIcon(task.priority)}
                        <span>{task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>
                      </span>
                      <span className="text-sm font-medium px-3 py-1 rounded-full bg-purple-50 text-purple-500">
                        {task.category}
                      </span>
                      {task.dueDate && (
                        <span className={`text-sm font-medium px-3 py-1 rounded-full flex items-center space-x-1 ${
                          isOverdue(task.dueDate) ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'
                        }`}>
                          <CalendarClock className="w-4 h-4 mr-1" />
                          {new Date(task.dueDate).toLocaleString()}
                        </span>
                      )}
                      {task.weather && (
                        <span className="flex items-center space-x-2 text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                          {task.weather.condition === 'sunny' ? (
                            <Sun className="w-4 h-4 text-yellow-500" />
                          ) : (
                            <Cloud className="w-4 h-4 text-gray-500" />
                          )}
                          <span>{task.weather.temp}°C</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => dispatch(removeTask(task.id))}
                  className="text-red-500 hover:text-red-600 transition-colors ml-4"
                >
                  <XCircle className="w-6 h-6" />
                </motion.button>
              </div>
            </motion.div>
          ))}
          {filteredTasks.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-xl text-gray-500">No tasks found. Try adjusting your search or category filter.</p>
            </motion.div>
          )}
        </div>
      </AnimatePresence>
    </>
  );
};

export default TaskList;