import React, {useState, useEffect} from 'react';
import { toast, Toaster } from "react-hot-toast";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/login.css';



const Login = () => {
  const [user, setUser] = useState(null);
  const [fullNameError, setFullNameError] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword,setShowPassword]= useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [confirmPassError, setConfirmPassError] = useState("");
  const [loginError, setLoginError] = useState("");
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const navigate= useNavigate();

  const [isRegisterFormVisible, setRegisterFormVisible] = useState(false);
  const [isLoginFormVisible, setLoginFormVisible] = useState(true);
  
  const handleRegister = (e) => {
    e.preventDefault();
    setFullNameError("");
    setPhoneNumberError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPassError("");
    if (fullName.trim().indexOf(" ") === -1) {
      setFullNameError("First name and Last name*");
      return;
    }
    const emailTest = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailTest.test(email)) {
      setEmailError("myemail@example.com*");
      return;
    }
    const passwordTest =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordTest.test(password)) {
      setPasswordError("at least 1 digit,1 capital letter,1 small letter,1 special and longer than 8*");
      return;
    } 
    if(password !== confirmPass){
      setConfirmPassError("passwords don't match*");
      return;
    }
    const newUser = {
      fullName,
      email,
      password,
      phoneNumber,
      role:"customer"
    };
    axios
    .post(`https://crafted-plans.onrender.com/users/register`, newUser)
    .then((response) => {
      const token = response.data.token;
      const id = response.data.id;
      localStorage.setItem("token",token);
      localStorage.setItem("id",id);
      toast.success("Successfully registered, Please Login!")
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
 
    
  }

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(`https://crafted-plans.onrender.com/users/login`, { email, password })
      .then((response) => {
        const token = response.data.token;
        const id = response.data.id;
        toast.success("You logged in successfully!");
        localStorage.setItem("token",token);
        localStorage.setItem("id",id);
        navigate('/')
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        throw error;
      });
    
  };
  return (
    <div>
       <Toaster toastOptions={{ duration: 4000 }} />
       {user ? (
        <h2>  👍Login Success</h2>
       ):(
        <div className="register">
          {isLoginFormVisible && (
         
         <form className="card2"
         onSubmit={(e)=>handleLogin(e)}
         >
          <div>
          <input
            type="text"
            className="register-input"
            placeholder="EMAIL"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          </div>
          <div className='password-hide-open'>
          <input
             type={showPassword ? 'text' : 'password'}
            className="register-input1"
            placeholder="PASSWORD"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
              className="absolute top-1/2 transform -translate-y-1/2 right-2 cursor-pointer"
              onClick={togglePasswordVisibility}
              >
              {showPassword ? (
                <img
                  src="/Images/open.svg"
                  alt="show-password"
                  height="16"
                  width="20"
                  viewBox="0 0 640 512"
                />
              ) : (
                <img
                  src="/Images/hide.svg"
                  alt="hide-password"
                  height="16"
                  width="18"
                  viewBox="0 0 576 512"
                />
              )}
            </div>
         
          {loginError &&
            <p className="error">{loginError}</p>
          }
          </div>
          <button className="register-button" type="submit">Sign in</button>
          <span className="link">
            Don't have an account?
            <span
              className="link2"
              onClick={() => {  
                setRegisterFormVisible(true);
                setLoginFormVisible(false);
              }}
            >
              Register
            </span>
          </span>

        </form>
       )}
          {isRegisterFormVisible && (
          <form className="card" onSubmit={(e)=>handleRegister(e)}>
            <div>
              <input 
              type="text"
              className='register-input'
              placeholder='Full Name'
              required
              onChange={(e) => setFullName(e.target.value)}
               />
               {fullNameError && <p className='error'>{fullNameError}</p>}
            </div>
            <input 
              type="number"
              className='register-input'
              placeholder='Phone Number'
              required
              onChange={(e) => setphoneNumber(e.target.value)}
               />
               <input 
              type="email"
              className='register-input'
              placeholder='Email'
              required
              onChange={(e) => setEmail(e.target.value)}
               />
               {emailError && <p className="error">{emailError}</p>}
               <div className='password-hide-open'>
               <input
               type={showPassword ? 'text' : 'password'}
              className="register-input1"
              placeholder="PASSWORD"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute top-1/2 transform -translate-y-1/2 right-2 cursor-pointer"
              onClick={togglePasswordVisibility}
              >
              {showPassword ? (
                <img
                  src="/Images/open.svg"
                  alt="show-password"
                  height="16"
                  width="20"
                  viewBox="0 0 640 512"
                />
              ) : (
                <img
                  src="/Images/hide.svg"
                  alt="hide-password"
                  height="16"
                  width="18"
                  viewBox="0 0 576 512"
                />
              )}
            </div>
            {passwordError && <p className="error">{passwordError}</p>}
            </div>
            <input
              type="password"
              className="register-input"
              placeholder="CONFIRM PASSWORD"
              required
              onChange={(e) => setConfirmPass(e.target.value)}
            />
            {confirmPassError && <p className="error">{confirmPassError}</p>}
            <button className="register-button" type="submit">
            Register
          </button>
          <span className="link">
            Already have an account?
            <span
              className="link2"
              onClick={() => {
                setRegisterFormVisible(false);
                setLoginFormVisible(true);
              }}
            >
              Sign in
            </span>
          </span>
          </form>
          )}
          </div>
       )}
       
       
       
       </div>
  )
}

export default Login
