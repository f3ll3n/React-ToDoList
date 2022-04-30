
export const Todo = ({ todo, removeToDo }) => {
  
    return(
        <div className="todoItem" key={todo.id}>
            <p>
                {todo.task}
            </p>
            <div className="todo-delete" onClick={() => removeToDo(todo.id)}>X</div>
        </div>
    )
}