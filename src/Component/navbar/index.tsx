import React, { useState } from 'react'
import styles from './style.module.scss'
import { setIndex, todoList } from '../../reducers/reducerUser'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import classnames from 'classnames'
import { motion } from "framer-motion"
const Navbar = () => {
  const [toggle, setToggle] = useState(false)
  const{ todo, arr_index}   = useSelector((state: RootState) => ({todo: state.userData.todo, arr_index: state.userData.arr_index}))
  const dispatch = useDispatch()
  const Todo: any = todo
  const Stages = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if(event){
      const forms = new FormData(event.currentTarget)
      const query = forms.get('Folder') as string 
      const Add = {folder: query, data: []}
      const array = [...Todo, Add ]
      dispatch(todoList(array))      
      const inputField = event.currentTarget.querySelector('input[name="Folder"]') as HTMLInputElement | null;
      setTimeout(()=>{
        if (inputField) {
          inputField.value = '';
        }
      },500)

    }

  }
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  }
  const Delete = (data: number) =>{
    const filter: any = Todo.filter((res: any, index: number)=> index !== data )
    dispatch(todoList(filter))
  }
  return (
    <>
    <div
    className={classnames({
      [styles.btnNavL]: !toggle,
      [styles.btnNavR]: toggle
    })} 
    onClick={()=>{setToggle(!toggle)}}
    >Button</div>
    <motion.nav className={styles.sidebar} animate={toggle ? "open" : "closed"}
      variants={variants} >
      <div className={styles.navtop}>
        <div className={styles.folder}>
          <h1>Folder</h1>
          {Todo?.map((res: any, idx: number)=>{
            return(
              <div key={idx} onClick={()=> dispatch(setIndex(Number(idx)))} style={{cursor: "pointer", color: arr_index === idx ? "blue": "black"}}>
                {res.folder}
              </div>
            )
          })}
        </div>
        <form onSubmit={Stages} className={styles.Stages}>
          <input required type="text" name="Folder" id="fold" />
          <button type='submit'>Todo list</button>
        </form>
      </div>
      <div className={styles.navbottom}>
        <h1>Settings</h1>
        <div>Change Color</div>
        <div>Text Size</div>
        <div>Delete</div>
        <div>Select All</div>
      </div>
    </motion.nav>
    </>
  )
}

export default Navbar
