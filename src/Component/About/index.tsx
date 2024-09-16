import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { todoList } from '../../reducers/reducerUser'
import styles from './style.module.scss'

const InputForm = () => {
  const todo = useSelector((state: RootState) => state.userData.todo)
  const dispatch = useDispatch()
  let dragged: HTMLElement | null = null

  const listTodo = todo.filter((res:any)=>{ return res.stage === "todo"})
  const listProgres = todo.filter((res:any)=>{ return res.stage === "process"})
  const listDone = todo.filter((res:any)=>{ return res.stage === "done"})

  const updateStageByPush = (taskArray: any[], taskIndex: number, dragged: any) => {
    const value: any = [...todo]
    const datatypeIndex = Number(dragged.dataset.datatype);
    const draggedIndex = Number(dragged.id);
    const data = value[Number(dragged.dataset.datatype)].data.filter((res:any, idx: number)=> idx !== draggedIndex)
    value[datatypeIndex] = {
      ...value[datatypeIndex],
      data: data
    }
    value[Number(taskIndex)] ={
      ...value[Number(taskIndex)],
      data:[...(value[Number(taskIndex)]?.data || []), dragged.innerText]
    }
    dispatch(todoList(value))

  };

  const onClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if(event){
      const formdata: any = new FormData(event.currentTarget)
      const query = formdata.get("todolist") as string   
      const value: any = todo[0]
      const data = value?.data || []
      const added = [...data, query]
      const update = { ...value, data: added}
      const push = [update, ...todo.slice( 1)]
      dispatch(todoList(push))
      console.log(dragged)
    }
  }

  const onDelete = (dragged: any) => {
    const datatypeIndex = Number(dragged.dataset.datatype);
    const draggedIndex = Number(dragged.id);
    const value: any = [...todo]
    const data = value[Number(dragged.dataset.datatype)].data.filter((res:any, idx: number)=> idx !== draggedIndex)
    value[datatypeIndex] = {
      ...value[datatypeIndex],
      data: data
    }
    dispatch(todoList(value))
  }
  const Stages = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if(event){
    const forms = new FormData(event.currentTarget)
    const query = forms.get('Stages') as string 
    const hero = 'fars'
    const Add = {stage: query, data: []}
    const array = [...todo, Add ]
    dispatch(todoList(array))
    console.log(query)
  }
  }
  console.log(todo)
  return (
    <>
    <div className={styles.container}>
      {todo.map((res: any, index: number)=>{
        return(
          <div className="zone" id="todo"
          onDrop={(e)=>{
            e.preventDefault()
            if(dragged){
              updateStageByPush(res, index, dragged)
            } 
          }} onDragOver={(e)=> {
            e.preventDefault()
          }}
          >
            <h1>{res.stage}</h1>
            {res.data.map((data: any, idx: number)=> {
              return(
                <div key={idx} data-datatype={index} id={idx.toString()} style={{cursor: 'pointer', position:"relative"}} draggable="true" onDrag={(e: any)=>{ dragged = e.target }} 
                onClick={(e)=>{onDelete(e.target)}} >
                  {data}<br/>
                </div>
              )
            })}
          </div>
        )
      })
      }
    
      {/* <div className="zone" id="process" onDrop={(e)=>{
        e.preventDefault()
        if(dragged){
          updateStageByPush(todo, dragged.id, 'process')
        }
      }} onDragOver={(e)=> {
        e.preventDefault()
      }}>
        <h1>Process</h1>
        {listProgres.map((res: any, idx: number)=> {
          return(
            <div key={idx} id={res.task} style={{cursor: 'pointer'}} draggable="true" onDrag={(e: any)=>{
              dragged = e.target
            }} >
              {res.task}<br/>
            </div>
          )
        })}
      </div>
      <div className="zone" id="done" onDrop={(e)=>{
        e.preventDefault()
        if(dragged){
          updateStageByPush(todo, dragged.id, 'done')
        }
      }} onDragOver={(e)=> {
        e.preventDefault()
      }}>
        <h1>Done</h1>
        {listDone.map((res: any, idx: number)=> {
          return(
            <div key={idx} id={res.task} style={{cursor: 'pointer'}} draggable="true" onDrag={(e: any)=>{
              dragged = e.target
            }} >
              {res.task}<br/>
            </div>
          )
        })}
      </div> */}
    </div>
    <form onSubmit={Stages}>
      <input type="text" name="Stages" id="stage" />
      <button type='submit'>Add Stages</button>
    </form>
    <form onSubmit={ onClick}>
      <input type="text" name="todolist"/>
      <button type='submit' value='sbmit'>Add Task</button>
    </form>
    </>
  )
}

export default InputForm