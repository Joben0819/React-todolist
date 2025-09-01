
import logo from './logo.svg';
import {Routes, Route, Router, BrowserRouter} from 'react-router-dom'
import './App.css';
import Todolist from './TodoList/Dashboard'
import { useEffect, useState } from 'react';
import Ecommerce from './Ecommerce/Dashboard/index'
import loading from './assets/img/loading.png'
import styles from './style.module.scss'
function App() {
  const [load, setload] = useState(true)
  const pathname = sessionStorage.getItem('pathname')
  const path = '/'
  const dashboard = !pathname ? '/' : pathname

    useEffect(() => {
      if(window.location.pathname === path){
        if(dashboard !== '/'){
        window.location.href = dashboard
        }
      }else if(window.location.pathname === '/ecommerce'){
        sessionStorage.setItem('pathname', '/ecommerce')
      }else if(window.location.pathname === '/todolist'){
        sessionStorage.setItem('pathname', '/todolist')
      }
      setTimeout(() => {
        setload(false)
      }, 1000);
    }, [])
    console.log('loop here')
    if(load) return <><div className={styles.loading}><img src={loading} alt="load" /></div></>

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Todolist/>}/>
          <Route path='/todolist' element={<Todolist/>}/>
          <Route path='/ecommerce' element={<Ecommerce/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
