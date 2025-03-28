import React from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface TaskSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onCategoryChange: (category: string) => void;
  selectedCategory: string;
}

const TaskSearch: React.FC<TaskSearchProps> = ({
  searchTerm,
  onSearchChange,
  onCategoryChange,
  selectedCategory
}) => {
  const categories = ['All', 'Work', 'Personal', 'Shopping', 'Health', 'Education'];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 bg-white p-6 rounded-xl shadow-lg space-y-4"
    >
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition duration-200 ${
              selectedCategory === category
                ? 'bg-purple-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default TaskSearch;