import ToDoItem from './ToDoItem';

function ToDoList({ tasks, removeTask }) {
  if (tasks.length === 0) {
    return <p className="empty">Список пуст. Добавьте задачу!</p>;
  }

  return (
    <ul className="todo-list">
      {tasks.map(task => (
        <ToDoItem key={task.id} task={task} removeTask={removeTask} />
      ))}
    </ul>
  );
}

export default ToDoList;