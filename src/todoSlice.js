// import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// const initialState = {
//   todos: [],
// };

// const todoSlice = createSlice({
//   name: 'todos',
//   initialState,
//   reducers: {
//     addTodo: (state, action) => {
//       const { title, dueDate } = action.payload;
//       const newTodo = {
//         id: Date.now(),
//         title,
//         dueDate,
//         completed: false,
//       };
//       state.todos.push(newTodo);
//       axios.post('/todos', newTodo);
//     },
//     toggleComplete: (state, action) => {
//       const id = action.payload;
//       const todo = state.todos.find((todo) => todo.id === id);
//       if (todo) {
//         todo.completed = !todo.completed;
//         axios.put(`/todos/${id}`, todo);
//       }
//     },
//     setTodos: (state, action) => {
//       state.todos = action.payload;
//     },
//   },
// });

// export const { addTodo, toggleComplete, setTodos } = todoSlice.actions;

// export const fetchTodos = () => async (dispatch) => {
//   try {
//     const response = await axios.get('/todos');
//     dispatch(setTodos(response.data));
//   } catch (error) {
//     console.error('Error fetching todos:', error);
//   }
// };

// export const selectTodos = (state) => state.todos.todos;

// export default todoSlice.reducer;