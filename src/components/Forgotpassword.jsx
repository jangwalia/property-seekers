import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'
import { ReactComponent as ArrowRight } from '../assets/svg/keyboardArrowRightIcon.svg'
import forgotPassword from "../assets/svg/forgotPassword.png"
import './Forgotpassword.css'

export default function Forgotpassword() {
  const [email, setEmail] = useState(" ")

  const onChange =  e => { 
    setEmail(e.target.value)
   }

// Handling submission on form
  const onSubmit = async e => {
    e.preventDefault()
    try {
      // getting user from database
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success('Email has been sent!')
      console.log('testing', auth)
    } catch (error) {
      toast.error('Could not reset password!')
      console.log('testing error', error.message)
    }
  }
 
  return (
    <div className='passwordContainer shadow-lg p-8 mb-5 rounded'>
      <header className='forgotPasswordTitle'>
      <img src={forgotPassword} className="forgotPasswordIcon"/>
        <p >
          Forgot Password
        </p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input type="email" className='emailInput' id='email' value={email} onChange={onChange} />
          <Link className='forgotPasswordLink' to='/login'>
            Login
          </Link>
          <div className='signInBar'>
            <div className='signInText'>
              Send Reset Link
            </div>
            <button className='passwordResetButton'><ArrowRight fill='white' width='34px' height='34px' /> 
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
