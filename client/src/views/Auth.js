import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'

const Auth = () => {
    
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div>
        {isLogin? <LoginForm setIsLogin={setIsLogin}/> : <SignupForm setIsLogin={setIsLogin}/>}
    </div>
  )
}

export default Auth