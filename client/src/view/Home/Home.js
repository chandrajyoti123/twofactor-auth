import React from 'react'
import { useEffect } from 'react'
import './Home.css'

export default function Home() {
  useEffect(()=>{
    if(!(JSON.parse(localStorage.getItem('2fauthlogin')))){
      if(!(JSON.parse(localStorage.getItem('2fauthsign')))){
        window.location.href='/signup'
      }
        window.location.href='/login'
    }
  },[])

  return (
    <div className='home-container' >
      this is home page
    </div>
  )
}
