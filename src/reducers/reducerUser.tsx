import {createSlice} from '@reduxjs/toolkit'
import { Users } from '../Api'
import { color } from 'framer-motion'

export type Ttodo = {
    todo: string[]
}

export const initialState = {
    data: [],
    todo: [],
    arr_index: 0,
    color: 'aliceblue',
    font_size: 0,
    delete: false,
    fontFamily: ''
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
        },
        setColor:(state, action) => {
            state.color = action.payload
        },
        setFonSize: (state, action )=>{
            state.font_size = action.payload
        },
        setFontFamily: (state, action )=>{
            state.fontFamily = action.payload
        }
    }
})


export const{
    usersData,
    todoList,
    setIndex,
    setColor,
    setFonSize,
    setFontFamily
} = reducerData.actions


export default reducerData.reducer


// export const DataFetch = async(dispatch: any) =>{
//     Users()
//       .then((res:  any)=> {
//         dispatch(usersData(res.data))
//       })
//     }
