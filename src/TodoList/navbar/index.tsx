import React, { useEffect, useState } from 'react'
import styles from './style.module.scss'
import { setColor, setFonSize, setFontFamily, setIndex, setName, todoList } from '../../reducers/reducerUser'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import classnames from 'classnames'
import { motion } from "framer-motion"
import navigation from '../Dashboard/navigation-bar.png'
import avatar from './blank_avatar.png'
import file from '../../assets/img/file.png'
import categories from '../../assets/img/category.png' 
import logo_todo from '../../assets/img/2_20241010_092404_0001.png'
import category from '../../assets/img/create_category.png'
import stages from '../../assets/img/add_stages.png'
import add_task from '../../assets/img/add_task.png'
import addition from '../../assets/img/additional.png'
import moved from '../../assets/img/drag_delete.png'
import phone_category from '../../assets/img/phone_create_category.png'
import phone_stages from '../../assets/img/phone_add_Stages.png'
import phone_add_task from '../../assets/img/phone_add_task.png'
import phone_addition from '../../assets/img/phone_addition.png'
import phone_move from '../../assets/img/phone_task_move.png'
import close from './close.png'
import { authProvider, handleSignOut, fetchUsers } from '../Provider/Auth'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';


type TNavbar = {
  number: number
  toggle: any
  setToggle: () => void
}


const Navbar = ({number , toggle , setToggle}:TNavbar) => {
  const{ todo, arr_index, color, font_size, fontFamily, name}   = useSelector((state: RootState) => ({todo: state.userData.todo, arr_index: state.userData.arr_index , color:state.userData.color, font_size:state.userData.font_size, fontFamily: state.userData.fontFamily, name: state.userData.name}))
  const dispatch = useDispatch()
  const [modal, setmodal] = useState(false)
  const [instruct, setinstruct] = useState(false)
  const Todo: any = todo
  const userInfo: any[] = name
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

// const signIn = (data: any) =>{
//   console.log(data.email, 'valueData')
//   const userInfo = [{name: data.email, img:  data.photoURL}]
//   dispatch(setName(userInfo))
//   fetchUsers(data.email, userData, [] )
// }

// const signOut = () => {
//   console.log(todo ,"hello")
//   handleSignOut(userInfo[0].name, todo, Empty)
// }
// const Empty = () => {
//   dispatch(setName([]))
// }
// const userData = ( res: any) => { 
//   const object: any[] = Object.values(res)
//     const data = object.length ? object : []
//     console.log(data,res.folders, 'userData')
//   dispatch(todoList(res.folder))
// }

const static_data = [
  {"folder": "Personal", data:[]},
  {"folder": "Work", data:[]},
  {"folder": "Wishlist", data:[]}
  
]
useEffect(() => {
  setTimeout(()=>{
    localStorage.setItem('reload', 'true')

  },500)
  const reload = localStorage.getItem('reload')
  if(!reload){
    setToggle()
    setinstruct(true)
    dispatch(todoList(static_data))    
  }  
}, [])

let phone = window.navigator.userAgent.indexOf("Mobi") === -1
  return (
    <>
    <div
    className={classnames({
      [styles.btnNavL]: !toggle
    })} 
    onClick={()=>{setToggle()}}
    style={{display:  toggle ? "none" : "block" }}
    >
      <img src={navigation} alt="navigation" style={{width: "10%"}} />
    </div>
    <motion.div className={styles.sidebar} animate={ number >= 841  ? "open" : toggle === true ? "open" : "closed" }
      variants={variants} >
      {/* <div className={styles.userInfo}>
        {
          name.length === 0 ?
          <span onClick={()=> authProvider(signIn)}>sign In</span>  
          :
          <span onClick={()=> signOut()}>sign Out</span>  
        }
        
        <div className={styles.imgContainer}>
          <img src={userInfo.length !== 0 ? userInfo[0].img : avatar} alt="navigation" />
        </div>
      </div> */}
      <div className={styles.btnNavR} onClick={()=>{setToggle()}}>
        <img src={close} alt="navigation" style={{width: "3%"}} />
      </div>
      <div className={styles.navtop}>
        <div className={styles.folder}>
          <div className={styles.logo} style={{backgroundImage: `${logo_todo}`}}>
            {/* <img src={logo_todo} alt="logo" /> */}
          </div>
          <div className={styles.category}>
            <img src={categories} alt="category" />
            <span>Category</span>
            <span className={styles.question} onClick={()=> setinstruct(true)}>?</span>
          </div>
          <div className={styles.container_files}>
            {Todo?.map((res: any, idx: number)=>{
              return(
                <div key={idx} className={styles.files} onClick={()=> {dispatch(setIndex(Number(idx))); number <= 841 && setToggle()}} style={{cursor: "pointer", color: arr_index === idx ? "blue": "black"}}>
                  <img src={file} alt="file"  style={{width: "7%"}}/>
                  {res.folder}
                  <div className={styles.delete} onClick={()=>{
                      Delete(idx)
                    }}>
                      x
                    </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className={styles.create} onClick={()=>{setmodal(true)}}>
          Create New +
        </div>
        <div className={styles.modal} style={{display: modal ? "flex" : "none"}}>
          <form onSubmit={Stages} className={styles.Stages}>
            <input required type="text" name="Folder" id="fold" />
            <button type='submit'>Add Catergory</button>
          </form>
          <span className={styles.exit} onClick={()=>{setmodal(false)}}>X</span>
        </div>
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
          <input type="number" placeholder={font_size?.toString()} onChange={(e)=> {
            if(Number(e.target.value) <= 300){
              dispatch(setFonSize(Number(e.target.value)))
            }
          }} min="0" max="300" className={styles.range} />
        </div> 
        <div className={styles.fontFamily}>
          <span>Font Style</span> 
          <select name="cars" id="cars" className={styles.select} value={fontFamily} onChange={(e)=>dispatch(setFontFamily(e.target.value))}>
            {
              fontFamilies.map((res: any, index: number)=> {
                return(
                  <option key={index} value={res}>{res}</option>
                )
              })
            }
          </select>
        </div> 
      </div>
      <div className={styles.instruction} style={{display: instruct ? "flex":"none"}}>
        <span className={styles.exit} onClick={()=> setinstruct(false)}>X</span>
        <h1>INSTRUCTION</h1>
        <Swiper pagination={true} modules={[Pagination]} className={`mySwiper ${styles.swiper}`}>
          <SwiperSlide><img src={phone ? category: phone_category} alt="category" /></SwiperSlide>
          <SwiperSlide><img src={ phone ? stages : phone_stages} alt="stages" /></SwiperSlide>
          <SwiperSlide><img src={ phone ? add_task : phone_add_task} alt="task" /></SwiperSlide>
          <SwiperSlide><img src={ phone ? moved : phone_move} alt="drag" /></SwiperSlide>
          <SwiperSlide><img src={ phone ? addition : phone_addition} alt="addition" /></SwiperSlide>
        </Swiper>
      </div>
    </motion.div>
    </>
  )
}

export default Navbar
