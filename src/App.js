import { useEffect, useState } from 'react';
import './App.css';
import { TodoInput } from './TodoInput';
import { Todo } from './Todos';

function App() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('items')) || []);
  const [todosReady, setTodosReady] = useState(true);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(todos));
  }, [todos])

  const handleOnChange = (todoContent) => {
    if (!todoContent.length) {
      return;
    }
    const todoItem = {
      id: Math.random().toString(30).substr(2, 11),
      task: todoContent,
      complete: false
    }
    setTodos((todos) => [
      ...todos,
      todoItem,
    ]);
  }
  const completeTodo = (id) => {
    setTodos([
      ...todos.map((todo) => 
        todo.id === id ? { ...todo, complete: !todo.complete } : {...todo }
      )
    ])
}
  const removeTodo = (id) => {
    setTodos([...todos.filter((todo) => todo.id !== id)])
  }
  
  const setReadyTodosFilter = () => {
    setTodosReady(
      !todosReady
    );
    console.log(todosReady);
    todosReady ? setTodos([...todos.filter((todo) => todo.complete === true)]) || localStorage.setItem('itemsSave', JSON.stringify(todos)) : setTodos(JSON.parse(localStorage.getItem('itemsSave'))) 
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
          <button onClick={setReadyTodosFilter} className='btn'>Выполненные</button>
        </nav>
      </header>
        <div className="todoList"> 
          {todos.map((todo) => (
            <Todo
              todo={todo}
              completeTodo={completeTodo}
              removeToDo={removeTodo}
              key={todo.id}
              complete={todo.complete}
            />
        ))}
        </div>

        <TodoInput onChange={handleOnChange}/>
    </div>
  );
}

export default App;
