import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { todoList } from '../../reducers/reducerUser'
import styles from './style.module.scss'
import Navbar from '../navbar'

const InputForm = () => {
  const {todo, arr_index  } = useSelector((state: RootState) => ({todo: state.userData.todo, arr_index: state.userData.arr_index}))
  const dispatch = useDispatch()
  const [number, setNumber] = useState(0)
  let dragged: HTMLElement | null = null
  const value: any = todo[arr_index ]


  useEffect(() => {
    setNumber(window.outerWidth)
    const resize = ()=> {
      setNumber(window.outerWidth)
    }

    window.addEventListener('resize', resize)

    return() =>{
      window.addEventListener('beforeunload', resize)
    }
    
  }, [])

  
  const updateStageByPush = (taskArray: any[], taskIndex: number, dragged: any) => {
    const Todo: any = todo[arr_index | 0]
    const value: any = [...Todo.data]
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
    map_Array(value)

  };

  const onClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if(event){
      const formdata: any = new FormData(event.currentTarget)
      const query = formdata.get("todolist") as string   
      const Todo: any = todo[arr_index]
      const value: any = Todo.data[0]
      const data = value?.data || []
      const added = [...data, query]
      const update = { ...value, data: added}
      const push = [update, ...Todo.data.slice( 1)]
      map_Array(push)
      const inputField = event.currentTarget.querySelector('input[name="todolist"]') as HTMLInputElement | null;
      setTimeout(()=>{
        if (inputField) {
          inputField.value = '';
        }
      },500)
    }
  }

  const onDelete = (dragged: any) => {
    const datatypeIndex = Number(dragged.dataset.datatype);
    const draggedIndex = Number(dragged.id);
    const Todo: any = todo[arr_index | 0]
    const value: any = [...Todo.data]
    const data = value[Number(dragged.dataset.datatype)].data.filter((res:any, idx: number)=> idx !== draggedIndex)
    value[datatypeIndex] = {
      ...value[datatypeIndex],
      data: data
    }
    map_Array(value)
  }
  const Stages = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if(event){
      const forms = new FormData(event.currentTarget)
      const query = forms.get('Stages') as string
      const Add = {stage: query, data: []}
      const stage_add =  Add
      map_Array(stage_add, true)
      const inputField = event.currentTarget.querySelector('input[name="Stages"]') as HTMLInputElement | null;
      setTimeout(()=>{
        if (inputField) {
          inputField.value = '';
        }
      },500)
    }
  }
  const deleteStage = (data: string) => {
    const Todo: any = todo[arr_index | 0]
    const filter = Todo.data.filter((res: any) => res.stage !== data)
    map_Array(filter)
  }
  const map_Array = (data: any, bool: boolean = false ) => {
    const Todo: any = todo[arr_index | 0]
    const updatedTodo = todo.map((item: any, index: number) => {
      if (index === arr_index && item.folder === Todo.folder) {
        return {
          ...item,
          data: bool ? [...item.data, data] : data,
        };
      }
      return { ...item }; 
    });
    dispatch(todoList(updatedTodo))
  }
  console.log(value)
  return (
    <>
    <div className={styles.container}>
      <Navbar number={number}/>
      <div className={styles.todoList}>
        <div className={styles.content} style={{ gridTemplateColumns: value.data.length !== 0 ? number >= 500 ? "repeat(5, 1fr)" : "": "", justifyContent: value.data.length !== 0 ? "flex-start": "center"}}>
          {value && value?.data.length === 0 ?
          <div className={styles.createList}>
            Create List
          </div> 
          :   
          value?.data?.map((res: any, index: number)=>{
            return(
              <div key={index} className={`zone ${styles.listed}`} id="todo"
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
                <ul style={{position: "relative"}}>
                  <div style={{position: "absolute", top: "-22px", right:"5px", cursor: "pointer"}} onClick={()=>{
                  deleteStage(res.stage)
                }}>x</div>
                {res?.data?.map((data: any, idx: number)=> {
                  return(
                    <li key={idx} className={styles.card} data-datatype={index} id={idx.toString()} style={{cursor: 'pointer', position:"relative"}} draggable="true" onDrag={(e: any)=>{ dragged = e.target }} 
                     >
                      {data} <span  onClick={(e)=>{
                        const id = document.getElementById(idx.toString()) as HTMLElement
                        onDelete(id)
                      }}>X</span>
                    </li>
                  )
                })}
                </ul>
              </div>
            )
          })
          }
        </div>
        <div className={styles.Formdata}>
          <form onSubmit={(e)=> todo && todo.length !== 0 ? Stages(e) : alert('Add Todolist First')} className={styles.Stages}>
            <input required type="text" name="Stages" id="stage" />
            <button type='submit'>Add Stages</button>
          </form>
          <form onSubmit={(e:any) =>  todo && value.data.length !== 0 ? onClick(e) : alert('Add Stages')} className={styles.TaskInput}>
            <input required type="text" name="todolist"/>
            <button type='submit' value='sbmit'>Add Task</button>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default InputForm