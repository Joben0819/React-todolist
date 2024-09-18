import {createSlice} from '@reduxjs/toolkit'
import { Users } from '../Api'

export type Ttodo = {
    todo: string[]
}

export const initialState = {
    data: [],
    todo: [],
    arr_index: 0
}


const reducerData = createSlice({
    name: "userData",
    initialState,
    reducers: {
        usersData:(state, action) => {
            state.data = action.payload
        },
        todoList:(state, action) => {
            state.todo = action.payload
        },
        setIndex:(state, action) => {
            state.arr_index = action.payload
        }
    }
})


export const{
    usersData,
    todoList,
    setIndex
} = reducerData.actions


export default reducerData.reducer


// export const DataFetch = async(dispatch: any) =>{
//     Users()
//       .then((res:  any)=> {
//         dispatch(usersData(res.data))
//       })
//     }
