import React, { useEffect, useState } from 'react'
import styles from './style.module.scss'
import { setColor, setFonSize, setFontFamily, setIndex, todoList } from '../../reducers/reducerUser'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import classnames from 'classnames'
import { motion } from "framer-motion"
import navigation from '../Dashboard/navigation-bar.png'
import close from './close.png'
type TNavbar = {
  number: number
  toggle: any
  setToggle: () => void
}


const Navbar = ({number , toggle , setToggle}:TNavbar) => {
  const{ todo, arr_index, color, font_size, fontFamily}   = useSelector((state: RootState) => ({todo: state.userData.todo, arr_index: state.userData.arr_index , color:state.userData.color, font_size:state.userData.font_size, fontFamily: state.userData.fontFamily}))
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

  const fontFamilies = [
    "Arial", "Verdana", "Helvetica", "Times New Roman", "Courier New", "Georgia", 
    "Trebuchet MS", "Comic Sans MS", "Impact", "Lucida Console", "Tahoma", "Palatino", 
    "Garamond", "Arial Black", "Bookman", "Candara", "Franklin Gothic Medium"
];
  return (
    <>
    <div
    className={classnames({
      [styles.btnNavL]: !toggle
    })} 
    onClick={()=>{setToggle()}}
    style={{display:  toggle ? "none" : "block" }}
    ><img src={navigation} alt="navigation" style={{width: "5%"}} /></div>
    <motion.div className={styles.sidebar} animate={ number >= 841  ? "open" : toggle === true ? "open" : "closed" }
      variants={variants} >
      <div className={styles.btnNavR} onClick={()=>{setToggle()}}>
        <img src={close} alt="navigation" style={{width: "3%"}} />
      </div>
      <div className={styles.navtop}>
        <div className={styles.folder}>
          <h1>Folder</h1>
          {Todo?.map((res: any, idx: number)=>{
            return(
              <div key={idx} className={styles.files} onClick={()=> {dispatch(setIndex(Number(idx))); number <= 841 && setToggle()}} style={{cursor: "pointer", color: arr_index === idx ? "blue": "black"}}>
                {res.folder}
              </div>
            )
          })}
        </div>
        <form onSubmit={Stages} className={styles.Stages}>
          <input required type="text" name="Folder" id="fold" />
          <button type='submit'>Add Floder</button>
        </form>
      </div>
      <div className={styles.navbottom}>
        <h1>Settings</h1>
        <div className={styles.color_change}> 
          <span>Change Color:</span> 
          <input type="color" value={color} className={styles.color} onChange={(e)=> {
            dispatch(setColor(e.target.value))
          }} /> 
        </div>
        <div className={styles.text_size}>
          <span>Font Size: </span>           
          <input type="number" placeholder={font_size.toString()} onChange={(e)=> {
            if(Number(e.target.value) <= 300){
              console.log(e.target.value)
              dispatch(setFonSize(Number(e.target.value)))
            }
          }} min="0" max="300" className={styles.range} />
        </div> 
        <div className={styles.onDelete}> 
          <span>Delete:</span> 
          <div className={styles.switch}>
            <label htmlFor="">Yes</label>
            <input type="radio" name="bolean" value="Yes"/>
            <label htmlFor="">No</label>
            <input type="radio" name="bolean" value="Yes" checked={true}/>
          </div>
        </div>
        <div className={styles.fontFamily}>
          <span>Font Style</span> 
          <select name="cars" id="cars" className={styles.select} value={fontFamily} onChange={(e)=>dispatch(setFontFamily(e.target.value))}>
            {
              fontFamilies.map((res: any)=> {
                return(
                  <option value={res}>{res}</option>
                )
              })
            }
          </select>
        </div> 
      </div>
    </motion.div>
    </>
  )
}

export default Navbar
