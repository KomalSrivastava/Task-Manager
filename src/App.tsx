import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { restoreAuth, logout } from './store/authSlice';
import LoginForm from './components/LoginForm';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import TaskStats from './components/TaskStats';
import { LogOut, CheckSquare } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(restoreAuth());
  }, [dispatch]);

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-3 rounded-lg">
              <CheckSquare className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
                Task Manager
              </h1>
              <p className="text-gray-600">Welcome back, {user?.username}!</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch(logout())}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200 flex items-center space-x-2 shadow-md"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </motion.button>
        </motion.div>
        <TaskStats />
        <TaskInput />
        <TaskList />
      </div>
    </div>
  );
}

export default App;