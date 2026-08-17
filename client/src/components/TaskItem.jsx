import { format } from 'date-fns';
import { Trash2, Calendar, Flag } from 'lucide-react';

function TaskItem({ task, onUpdate, onDelete }) {
  const isDone = task.status === 'done';

  const handleStatusChange = (e) => {
    onUpdate(task._id, { status: e.target.value });
  };

  return (
    <div className={`card task-item status-${task.status}`}>
      <div className="task-header">
        <div>
          <h3 className="task-title">{task.title}</h3>
          {task.description && <p className="task-desc">{task.description}</p>}
        </div>
        <select 
          className="form-control status-select" 
          style={{ width: 'auto', paddingRight: '2rem' }}
          value={task.status}
          onChange={handleStatusChange}
        >
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      
      <div className="task-footer">
        <div className="task-meta">
          <span className={`badge priority-${task.priority}`}>
            <Flag size={12} style={{ display: 'inline', marginRight: '4px' }} />
            {task.priority}
          </span>
          
          {task.dueDate && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={14} />
              {format(new Date(task.dueDate), 'MMM d, yyyy')}
            </span>
          )}
        </div>
        
        <button 
          className="btn btn-danger" 
          onClick={() => onDelete(task._id)}
          aria-label="Delete task"
          title="Delete task"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
