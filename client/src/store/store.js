import { configureStore, createSlice } from '@reduxjs/toolkit'

function setLocalStorage(data) {
    localStorage.setItem("todos",JSON.stringify(data))
}

function getLocalStorage() {
    let data = localStorage.getItem("todos") || "[]"
    return JSON.parse(data)
}

const todoSlice = createSlice({
    name: "todo",
    initialState: {value: getLocalStorage()},
    reducers: {
        addTodo: (state,action) => {
            state.value = [action.payload,...state.value]
            setLocalStorage(state.value)
        },
        removeTodo: (state,action) => {
            state.value = state.value.filter((val,index)=> index !== action.payload)
            setLocalStorage(state.value)
        },
        updateTodo: (state,action) => {
            let newData = [...state.value]
            newData[action.payload].done = !newData[action.payload].done
            state.value = newData
            setLocalStorage(state.value)
        },
        clearTodo: (state) => {
            state.value = []
            setLocalStorage([])
        }
    }
})
export const { addTodo, removeTodo, updateTodo, clearTodo } = todoSlice.actions

export const store = configureStore({
    reducer: {
        todo: todoSlice.reducer
    }
})