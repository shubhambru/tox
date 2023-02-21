import {getTodos, addTodo, deleteTodo, updateTodo} from "./APIs"
import { useEffect, useState } from "react";

function App() {

  const [isLoaded,setLoaded] = useState(false)
  const [todos,setTodo] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [editTodo,setEditTodo] = useState(-1)
  const [editTodoText, setEditTodoText] = useState("")

  useEffect(()=>{
    fetchTodos()
  },[])

  function fetchTodos(){
    getTodos().then(res=>{
      setLoaded(true)
      if(res.status===200){
        setTodo(res.data)
      }
    })
  }

  return (
    <div>
      <header>
        <h1 className="text-4xl font-semibold text-center my-3 sm:my-3">Spring Boot Todo</h1>
      </header>
      <section className="flex flex-col justify-center items-center">
        <form 
          onSubmit={
            (event)=>{
              event.preventDefault()
              if(inputValue!==""){
                addTodo({description:inputValue}).then(res=>
                {
                  if(res.status===201){
                    console.log("added")
                    setInputValue("")
                    fetchTodos()
                  }
                })
              }
            }
          }
        >
          <input 
            className="rounded-lg p-3 min-w-[300px] sm:min-w-[500px] md:min-w-[700px] mx-8 my-6 bg-gray-200" 
            placeholder="Add a todo"
            value={inputValue}
            onChange={(event)=>{
              event.preventDefault();
              setInputValue(event.target.value)
            }}
            type="text" />
        </form>
        <div className="rounded-lg p-6 min-w-[300px] sm:min-w-[500px] md:min-w-[700px] mx-8 my-6 bg-[#6552FF] text-white">
          {
            isLoaded?
            (
              todos.length===0?
                <p className='text-2xl font-semibold text-center my-2 sm:my-3'>No records found</p>:
                todos.map((todo,index)=>{ 
                  return (
                    <div className="flex items-center p-1">
                      {
                        editTodo===index?
                        (<form className="flex items-center w-full" onSubmit={(event)=>{
                            event.preventDefault()
                            updateTodo(todo.id,editTodoText,todo.isCompleted).then(res=>{
                              setEditTodo(-1)
                              if(res.status===200){
                                fetchTodos()
                              }
                            })
                          }}>
                            <input 
                              className="bg-gray-200 rounded-lg p-1 text-black"
                              placeholder="Enter Todo Description"
                              value={editTodoText}
                              onChange={(event)=>{
                                event.preventDefault()
                                setEditTodoText(event.target.value)
                              }}
                              />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                              className="rounded-full p-1 w-7 h-7 ml-2 hover:bg-purple-600 cursor-pointer"
                              onClick={()=>{setEditTodo(-1)}}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </form>
                        ):
                        (<p 
                          className={todo.isCompleted?"w-full line-through":"w-full"}
                          onClick={()=>{
                            setEditTodo(index)
                            setEditTodoText(todo.description)
                          }}>
                            {todo.description}
                        </p>)
                      }
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                        className="rounded-full p-1 w-7 h-7 mr-4 hover:bg-purple-600 cursor-pointer" 
                        onClick={()=>{
                          updateTodo(todo.id,todo.description,!todo.isCompleted).then(res=>{
                            setEditTodo(-1)
                            if(res.status===200){
                              fetchTodos()
                            }
                          })
                        }}>
                        {
                          todo.isCompleted?
                          (<path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />):
                          (<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />)
                        }
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                        className="rounded-full p-1 w-7 h-7 hover:bg-purple-600 cursor-pointer"
                        onClick={()=>{
                          deleteTodo(todo.id).then(res=>{
                            setEditTodo(-1)
                            if(res.status===200){
                              fetchTodos()
                            }
                          })
                        }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                      
                    </div>
                  )
                })
            )
            :(<p className='text-2xl font-semibold text-center my-2 sm:my-3'>Loading...</p>)
          }
        </div>
      </section>
    </div>
  );
}

export default App;
