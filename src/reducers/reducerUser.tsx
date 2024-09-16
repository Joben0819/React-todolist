import {createSlice} from '@reduxjs/toolkit'
import { Users } from '../Api'

export type Ttodo = {
    todo: string[]
}

export const initialState = {
    data: [],
    todo: []
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
        }
    }
})


export const{
    usersData,
    todoList
} = reducerData.actions


export default reducerData.reducer


// export const DataFetch = async(dispatch: any) =>{
//     Users()
//       .then((res:  any)=> {
//         dispatch(usersData(res.data))
//       })
//     }
