import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

export default function Signin() {
  const [showPassword,setShowPassword] = useState(false)
  const [email,setEmail] = useState('')
  const [name,setName] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()
  // handling email input
  const emailChange = (e) =>{
    setEmail(e.target.value)
  }
  //handling nameChange
  const nameChange = (e) =>{
    setName(e.target.vale)
  }
  //handling password input
  const passwordChange = (e) =>{
    setPassword(e.target.value)  
  }
  //handle showpassword
  const checkShowPassword = ()=>{
    setShowPassword((prevState) => !prevState)
  }
  return (
    <div>
      <div className="pageContainer">
        <header>
           <p className="pageHeadre">
             Welcome Back!
           </p>
        </header>
        <main>
          <form>
          <input onChange = {nameChange} type="text" className='nameInput' placeholder='Name' id = "name" value = {name} />
            <input onChange = {emailChange} type="text" className='emailInput' placeholder='Email' id = "email" value = {email} />
           <div className='passwordInputDiv'>
              <input type= {showPassword ? "text" : "password"} onChange = {passwordChange} className = 'passwordInput' placeholder='Password' value = {password} id = 'password' />
              <img src= {visibilityIcon} alt="showPassword" className='showPassword' onClick = {() => checkShowPassword()} />
            </div>
          <Link to= '/forgotPassword' className='forgotPasswordLink' >forgot password</Link>
            <div className='signUpBar'>
              <p className="signUpText">
                Register
              </p>
              <button className='signUpButton'>
                <ArrowRightIcon fill = 'white' width = '34px' height = '34px'/>
              </button>
            </div>
          </form>
          <Link to='/login' className='registerLink'>Log In..if Already registered</Link>
        </main>
      </div>
    </div>
  )
}
