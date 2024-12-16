import React from 'react'
import LandingPage from '../Components/Landingpage'
import MenuOption from '../Components/MenuOption'
import { Card, Table } from '@mui/material'
import CustomizedTables from '../Components/TableProducts'
import Dashboard from '../Components/Dashboard'
import Header from '../Components/Header'
// import Card from '../Components/Card'
import { ListActionTypes } from '@mui/base/useList'
import Footer from '../Components/Footer'
import Index from './Index';





export default function Home() {
  return (
    <div>
      
        {/* <LandingPage/> */}
        
      <Header/>
      <Index/>
      <Footer/>
      {/* <Card/> */}
     
      
      {/* <CustomizedTables/> */}
    </div>
    
    
  )
}

