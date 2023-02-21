import axios from "axios";

const url = "//localhost:8080/todo";

export function getTodos(){
    return axios.get(url)
}

export function addTodo(data){
    return axios.post(url,data)
}

export function deleteTodo(id){
    return axios.delete(url+`/${id}`)
}

export function updateTodo(id,description,isCompleted){
    return axios.put(url,{id:id,description:description, isCompleted:isCompleted})
}