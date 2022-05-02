//Компонент, отображающий текстовую строку, статуc
export const Todo = ({ todo, removeToDo, completeTodo }) => {
    return(
        <div className={todo.complete ? 'todoItem strike' : 'todoItem'}>
            <div className={todo.complete ? 'todo-complete_button' : 'todo-complete_button strike'}
            onClick={() => completeTodo(todo.id)} key={todo.id}>
                {todo.complete ? 'X' : '☑'}
            </div>
            <p className='todo-text'>
                {todo.task}
            </p>
            <div className="todo-сomplete">{todo.complete ? 'Решено' : 'Не решено'}</div>
            <div className="todo-delete" onClick={() => removeToDo(todo.id)}>X</div>
        </div>
    )
}