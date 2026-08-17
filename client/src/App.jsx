import { useState, useEffect } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from './services/api';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { LayoutList, AlertCircle } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filters and sorting
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTasks(statusFilter, sortBy);
      setTasks(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [statusFilter, sortBy]);

  const handleCreateTask = async (taskData) => {
    try {
      setError(null);
      await createTask(taskData);
      loadTasks(); // Reload to get sorted list and new task
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create task');
      throw err; // throw to form to show error there if needed, or handle here
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    try {
      setError(null);
      // Optimistic update
      setTasks(tasks.map(t => t._id === id ? { ...t, ...taskData } : t));
      await updateTask(id, taskData);
      loadTasks(); // Refetch to ensure consistency
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update task');
      loadTasks(); // Revert optimistic update
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      setError(null);
      setTasks(tasks.filter(t => t._id !== id));
      await deleteTask(id);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete task');
      loadTasks();
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>
          <LayoutList size={32} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '10px' }} />
          Task Master
        </h1>
        <p className="subtitle">Organize your life, efficiently.</p>
      </header>

      {error && (
        <div className="error-msg">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      <TaskForm onSubmit={handleCreateTask} />
      
      <div className="filters">
        <div className="filter-group">
          <label className="form-label" style={{ marginBottom: 0 }}>Status Filter:</label>
          <select 
            className="form-control status-select" 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Tasks</option>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="form-label" style={{ marginBottom: 0 }}>Sort By:</label>
          <select 
            className="form-control status-select" 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="createdAt">Newest</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loader-container"><div className="loader"></div></div>
      ) : (
        <TaskList 
          tasks={tasks} 
          onUpdate={handleUpdateTask} 
          onDelete={handleDeleteTask} 
        />
      )}
    </div>
  );
}

export default App;
