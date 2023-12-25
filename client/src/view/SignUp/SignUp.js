import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './SignUp.css'




export default function SignUp() {
  
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpass, setConfirmpass] = useState('')

    const postApiOfUser=async()=>{
        if(!username){
            alert("please enter your name")
            return
        }
        if(!email){
            alert("please enter your email")
            return
        }
        if(!password){
            alert("please enter your password")
            return
        }
        if(!confirmpass){
            alert("please enter confirm password")
            return
        }
        
        if(password!=confirmpass){
            alert("password should same")
            return
        }
       try{
        const response = await axios.post('/api/2fauth/singup',
         {
            username:username,
            email:email,
            password:password,
            })
         if(response?.data?.message){
            localStorage.setItem('2fauthsign', JSON.stringify(response?.data?.data))
               alert(response?.data?.message)
                window.location.href='/login'
            }else{
                alert("invalid credential")
            }
     }catch(err){
        console.log(err)
     }
     
       

    }
  return (
    <div className='signup-container'>
            <div className='signup-subcontainer'>
                <h1 className='heading'>create new account</h1>
                <div className='input-group'>
                    <label className='input-label' htmlFor='name'>Name</label>
                    <input type='text' placeholder='enter you full name' id='name' className='input-field' value={username} onChange={(e) => {
                        setUsername(e.target.value)
                    }} />
                 </div>
                 <div className='input-group'>
                    <label className='input-label' htmlFor='email'>Email</label>
                    <input type='email' placeholder='enter you email'id='email' className='input-field'
                    value={email} onChange={(e) => {
                        setEmail(e.target.value)
                    }}  />
                </div>
                <div className='input-group'>
                    <label className='input-label' htmlFor='password'>Password</label>
                    <input type='password' placeholder='password' id='password' className='input-field'
                    value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }}  />
                </div>
                <div className='input-group'>
                    <label className='input-label' htmlFor='confirmpass'>Confirm Password</label>
                    <input type='password' placeholder='confirm password' id='confirmpass' className='input-field'
                    value={confirmpass} onChange={(e) => {
                        setConfirmpass(e.target.value)
                    }}  />
                </div>
               <Link to={'/login'} className='hyperlink-text'><div className='text'>Already Have An Account</div></Link> 
                <button className='btn' type='button' onClick={postApiOfUser} >sign up</button>

            </div>

        </div>
  )
}
