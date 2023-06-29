import React, { useState, useEffect } from 'react';
import axios from 'axios';


const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editedTodo, setEditedTodo] = useState('');
  const [priority, setPriority] = useState('Low');

  useEffect(() => {
    fetchTodos();
  }, []);
 //this function is for fetching all the data from the json sever
  const fetchTodos = async () => {   
    try {
      const response = await axios.get('http://localhost:7000/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };
// this function is for posting the data on to the json sever
  const createTodo = async (newTodo) => {
    try {
      const response = await axios.post('http://localhost:7000/todos', {
        todo: newTodo,
        priority: priority,
        completed: false, // Add the completed property with initial value false
      });
      setTodos([...todos, response.data]);
      setNewTodo('');
      setPriority('Low');
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };
// this is for updating a paticuler task on the list 
  const updateTodo = async (index, updatedTodo) => {
    try {
      await axios.put(`http://localhost:7000/todos/${todos[index].id}`, {
        todo: updatedTodo,
        priority: priority,
        completed: todos[index].completed, // Preserve the existing completed value
      });
      const updatedTodos = [...todos];
      updatedTodos[index].todo = updatedTodo;
      updatedTodos[index].priority = priority;
      setTodos(updatedTodos);
      setEditMode(false);
      setEditIndex(null);
      setEditedTodo('');
      setPriority('Low');
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };
//this is for deleting a paticula task from the list
  const deleteTodo = async (index) => {
    try {
      await axios.delete(`http://localhost:7000/todos/${todos[index].id}`);
      const updatedTodos = todos.filter((_, i) => i !== index);
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      createTodo(newTodo);
    }
  };

  const handleDeleteTodo = (index) => {
    deleteTodo(index);
  };

  const handleEditTodo = (index) => {
    setEditMode(true);
    setEditIndex(index);
    setEditedTodo(todos[index].todo);
    setPriority(todos[index].priority);
  };

  const handleUpdateTodo = () => {
    if (editedTodo.trim() !== '') {
      updateTodo(editIndex, editedTodo);
    }
  };
 
  const handleToggleComplete = async (index) => {
    try {
      const updatedTodo = { ...todos[index] };
      updatedTodo.completed = !updatedTodo.completed;
      await axios.put(`http://localhost:7000/todos/${updatedTodo.id}`, updatedTodo);
      const updatedTodos = [...todos];
      updatedTodos[index] = updatedTodo;
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };
// this for stating the priority clolor that has be chosen
  const priorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'red';
      case 'Medium':
        return 'orange';
      case 'Low':
      default:
        return 'medium';
    }
  };

  return (
    <div className="todo-List">
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {editMode && editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editedTodo}
                  onChange={(e) => setEditedTodo(e.target.value)}
                />
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </>
            ) : (
              <>
                <span
                  style={{
                    color: priorityColor(todo.priority),
                    textDecoration: todo.completed ? 'line-through' : 'none',
                  }}
                >
                  {todo.todo}
                </span>
                <span style={{ color: priorityColor(todo.priority) }}>
                  {' '}
                  - {todo.priority}
                </span>
              </>
            )}
            {editMode && editIndex === index ? (
              <button onClick={handleUpdateTodo}>Update</button>
            ) : (
              <button onClick={() => handleEditTodo(index)}>Edit</button>
            )}
            <button onClick={() => handleDeleteTodo(index)}>Delete</button>
            <button onClick={() => handleToggleComplete(index)}>
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
