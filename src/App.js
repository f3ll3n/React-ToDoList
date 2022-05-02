import { useEffect, useState } from 'react';
import './App.css';
import { TodoInput } from './TodoInput';
import { Todo } from './Todos';

function App() {
  //todos - состояние и массив принимающий в себя ячейки строк из input(a), либо же массив из localstorage
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('items')) || []);
  //filtered - измененённый массив todos в зависимости от указанных фильтров, передаётся в map для рендеринга
  const [filtered, setFiltered] = useState(todos);

  //Обновление filtered из todos 
  useEffect(() => {
    setFiltered(todos)
  }, [todos])

  //Обновление localStorage из todos
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(todos));
  }, [todos])

  //Обновление todos
  useEffect( () => {
    setTodos(todos)
  }, [todos]);

  //Функция, принимающая строку из компонента TodoInput по изменению
  const handleOnChange = (todoContent) => {
    //Если строка отсутствует, то ничего не выводим
    if (!todoContent.length) {
      return;
    }
  //Даём todoItem рандомное id
    const todoItem = {
      id: Math.random().toString(30).substr(2, 11),
      task: todoContent,
      complete: false
    }
   //Помещаем новый todoItem в массив todos
    setTodos((todos) => [
      ...todos,
      todoItem,
    ]);
  }

  //Функция, принимающая id, которая по клику пробегается по массиву с условием
  //создающая копию todos и изменяющая булевое значение нужного item(a) complete на противоположное
  const completeTodo = (id) => {
    setTodos([
      ...todos.map((todo) => 
        todo.id === id ? { ...todo, complete: !todo.complete } : {...todo }
      )
    ])
  }
   //Функция, принимающая id, которая по клику пробегается по массиву с условием
  //возвращающая массив по фильтру без item(a), по которому произведён клик
  const removeTodo = (id) => {
    setTodos([...todos.filter((todo) => todo.id !== id)])
  }

  //Функция, принимающая параметр с котором вызывалась
  //задающая фильтр в зависимости от значения параметра, возвращающая массив в новое состояние.
  const setTodosFilter = (status) => {
    if(status === 'all'){
      setFiltered(todos);
    }
    else{
      let newTodo = [...todos].filter(todo => todo.complete === status)
      setFiltered(newTodo)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Задачник
        </h1>
        <p></p>
        <nav>
          <button onClick={()=>setTodosFilter('all')} className='btn' >Все</button>
          <button onClick={()=>setTodosFilter(false)} className='btn'>Текущие</button>
          <button onClick={()=>setTodosFilter(true)} className='btn'>Выполненные</button>
        </nav>
      </header>
        <div className="todoList_block"> 
          {filtered.map((todo) => (
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
