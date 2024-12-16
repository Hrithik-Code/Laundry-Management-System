import React, { useEffect } from 'react'
import DashboardContent from '../Components/Dashboard'
import {useNavigate} from 'react-router-dom'
export default function Dashboard() {
  let navigate=useNavigate()
  useEffect(()=>{
    if(localStorage.getItem("Token")==null){
      navigate('/adminLogin');
    }
  },[])
  return (
    <div>
        <DashboardContent/>
    </div>
  )
}
