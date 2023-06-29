
import React from "react";
import './App.css'
import { useState } from 'react'
import * as yup from 'yup' // importing functions from yup library
 

function LoginPage() {

     const [userName,setUserName]= useState('')
     const [email,setEmail] =useState('');
     const [password,setPassword] = useState('');
     
     const [message,setMessage]= useState("");


     const userSchema = yup.object().shape({
        // name can not be an empty string so we will use the required function
        userName: yup.string().required(),
        // email can not be an empty string so we will use the required function
        email: yup.string().email().required(),
        // password can not be an empty string so we will use the required function. Also, we have used the `min` function to set the minimum length of the password. Yup passwords by default handle the conditions of at least one upper case, at least one lower case, and at least one special character in the password
        password: yup.string().min(8).required(),
       
      })


    
     async function validateForm() {
       
        let Credentials = {
        userName: userName,          
        email: email,
        password: password,
         
        }

    const error = await userSchema.isValid(Credentials)
    
    if (error) {
        setMessage("Enter proper username,email and password")
    } 
    
  }

  
    
    return (
       <div className="Login-page">
              
           <form onClick={validateForm}>

              <input type = "text" placeholder="Name" onChange={(e) => setUserName(e.target.value)}></input><br></br>
              
              < input type = "text" placeholder="email" onChange={(e) => setEmail(e.target.value)}></input><br></br>
             
              < input type = "pasword" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input><br></br>
              
             
              <button type="submit" >log in</button>
        
           </form>
      </div>
    );
  }
  
  export default LoginPage
  