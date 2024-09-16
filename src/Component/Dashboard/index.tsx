import React,{useState, useEffect, } from 'react';
import axios from 'axios';
import { Users } from '../../Api';
import {  usersData } from '../../reducers/reducerUser';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';


const Dashboard = () => {
  const data = useSelector((state: RootState) => state.userData.data)
  const dispatch: AppDispatch = useDispatch()
  const [state, setstate] = useState(data)
  const [inputValue, setinputValue] = useState('')


  
 const DataFetch = async() =>{
    Users()
      .then((res:  any)=> {
        dispatch(usersData(res.data))
        setstate(res.data)
      })
    }

  useEffect(() => {
    DataFetch()
  }, [])


  const Click = ()=> {
        if(inputValue.length !== 0){
          const value = data.filter((data:any) => {return data.id === Number(inputValue)})
        setstate(value)
        }else{
          setstate(data)
        }
      
  }
  return (
    <div className="App">
      <input type="text" value={inputValue} onChange={(e)=>setinputValue(e.target.value)} /><button onClick={()=> Click()}>Click</button><br/>
      {state.map((res:any, idx: number)=>{
        return(
          <div key={idx}>
          {res.id} <br/>
          </div>
        )
      })}
    </div>
  )
}


export default Dashboard