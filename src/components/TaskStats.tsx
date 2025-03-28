import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { CheckCircle2, AlertTriangle, Clock, Flag, CalendarClock } from 'lucide-react';
import { motion } from 'framer-motion';

const TaskStats: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    high: tasks.filter(t => t.priority === 'high').length,
    medium: tasks.filter(t => t.priority === 'medium').length,
    low: tasks.filter(t => t.priority === 'low').length,
    overdue: tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date()).length
  };

  const statItems = [
    { label: 'Total Tasks', value: stats.total, icon: CheckCircle2, color: 'text-blue-500 bg-blue-50' },
    { label: 'Completed', value: stats.completed, icon: CheckCircle2, color: 'text-green-500 bg-green-50' },
    { label: 'High Priority', value: stats.high, icon: AlertTriangle, color: 'text-red-500 bg-red-50' },
    { label: 'Medium Priority', value: stats.medium, icon: Clock, color: 'text-yellow-500 bg-yellow-50' },
    { label: 'Low Priority', value: stats.low, icon: Flag, color: 'text-indigo-500 bg-indigo-50' },
    { label: 'Overdue', value: stats.overdue, icon: CalendarClock, color: 'text-orange-500 bg-orange-50' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
    >
      {statItems.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white p-4 rounded-xl shadow-md"
        >
          <div className={`flex items-center justify-center w-12 h-12 rounded-lg mb-3 ${item.color}`}>
            <item.icon className="w-6 h-6" />
          </div>
          <h3 className="text-gray-600 text-sm font-medium">{item.label}</h3>
          <p className="text-2xl font-bold text-gray-800">{item.value}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TaskStats;