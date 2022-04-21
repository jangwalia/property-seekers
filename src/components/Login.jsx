import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

export default function Login() {
  const [showPassword,setShowPassword] = useState(false)
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()
  // handling email input
  const emailChange = (e) =>{
    setEmail(e.target.value)
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
            <input onChange = {emailChange} type="text" className='emailInput' placeholder='Email' id = "email" value = {email} />
            <div className='passwordInputDiv'>
              <input type= {showPassword ? "text" : "password"} onChange = {passwordChange} className = 'passwordInput' placeholder='Password' value = {password} id = 'password' />
              <img src= {visibilityIcon} alt="showPassword" className='showPassword' onClick = {() => checkShowPassword()} />
            </div>
          <Link to= '/forgotPassword' className='forgotPasswordLink' >forgot password</Link>
            <div className='signInBar'>
              <p className="signInText">
                Log In
              </p>
              <button className='signInButton'>
                <ArrowRightIcon fill = 'white' width = '34px' height = '34px'/>
              </button>
            </div>
          </form>
          <Link to='/signup' className='registerLink'>Register Instead</Link>
        </main>
      </div>
    </div>
  )
}
