import { useState } from 'react';
import './App.css';
import { TodoInput } from './TodoInput';
import { Todo } from './Todos';

function App() {
  const [todoContent, setTodoContent] = useState('');
  const [todos, setTodos] = useState([]);

  const handleOnChange = (todoContent) => {
    if (!todoContent.length) {
      return;
    }
    const todoItem = {
      id: Math.random().toString(30).substr(2, 11),
      task: todoContent,
      complete: false
    }
    setTodoContent(todoContent);
    setTodos([
      ...todos,
      todoItem,
    ]);
    setTodoContent('');
  }

  const removeTodo = (id) => {
    console.log(id);
    setTodos([...todos.filter((todo) => todo.id !== id)])
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Задачник
        </h1>
        <nav>
          <button className='btn'>Все</button>
          <button className='btn'>Только важные</button>
          <button className='btn'>Выполненные</button>
        </nav>
      </header>
        <div className="todoList"> 
          {todos.map((todo) => (
            <Todo
              className='todoItem'
              todo={todo}
              removeToDo={removeTodo}
              key={todo.id}
            />
        ))}
        </div>

        <TodoInput onChange={handleOnChange}/>
    </div>
  );
}

export default App;
