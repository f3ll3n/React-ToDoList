import { useState } from "react";


export const TodoInput = ( {onChange} ) => {
    const [todoText, setTodoText] = useState('');
    
    const handlerOnChange = (event) => {
        setTodoText(event.currentTarget.value)
        
    }

    const handlerOnClick = (e) => {
        e.preventDefault();
        onChange(todoText)
        setTodoText('');
    }
    
    return(
        <div className="input">
            <form>
                <textarea 
                value={todoText} 
                onChange={handlerOnChange} 
                placeholder='Написать новое задание'
                />
                <button className='btn' 
                onClick={handlerOnClick}> Добавить</button>
            </form>
        </div>
    )
}