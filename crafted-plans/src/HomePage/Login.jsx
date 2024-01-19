import React from 'react'

const Login = () => {
  return (
    <div className='login/register'>
        <h1 className="login-title">Login</h1>
        <div className="login-btns-toggle">
          <button className="login-button">Login</button>
          <button className="login-button">Sign Up</button>
        </div>
      <div className="login-container">
        <form className="login-form">
          <label className="label-login">
            <input 
            type="text" 
            placeholder='Email'
            value="Email"
            className="input-login" />
          </label>
          <label className="label-login">
            <input 
            type="password" 
            placeholder='Password'
            value="Password"
            className="input-login" />
          </label>
          <input type="submit" className="login-submit" />
        </form>
      </div>
      <div className="register-container">
          <form  className="register-form">
          <label className="label-login">
            <input 
            type="text" 
            placeholder='Full name'
            value="fullName"
            className="input-login" />
          </label>
          <label className="label-login">
            <input 
            type="text" 
            placeholder='Email'
            value="email"
            className="input-login" />
          </label>
          <label className="label-login">
            <input 
            type="text" 
            placeholder='Phone Number'
            value="phoneNumber"
            className="input-login" />
          </label>
          <label className="label-login">
            <input 
            type="password" 
            placeholder='Password'
            value="password"
            className="input-login" />
          </label>
          </form>
      </div>
    </div>
  )
}

export default Login
