import { useState } from "react";
import React from "react";

function LoginPage() {

     const [credentials,setCredentials]= useState('')
     const [password,setpassword] = useState('')
     const [message,setmessage]= useState("")
    
    
    function handleName(e){
        setCredentials(e.target.value)
    }
    function handlechange(e){
       
        setpassword(e.target.value)
    }

    
 

   const Validation = (e) =>{
       e.preventDefault();
        console.log(<p>is this jhappening</p>);
        const valMes= /^(?=.*\d)(?=.*[a-z])[a-zA-Z0-9]{8,}$/
        if(password===""){
            setmessage ("pleas enter password")
        }
        else if (valMes.test(password)){
            setmessage("password is valid")
        }
        else if (!valMes.test(password)){
            setmessage("password is not valid")
        } else {
            setmessage("")
        }
           
    }

    
    return (
       <div className="Login-page">
        <p>the irdfk</p>
        
           <form onSubmit={Validation}>
              <p>wha is going on</p>
              <p>{credentials}</p><br></br>
              <p>{password}</p>
              <p>{message}</p><br></br>
              <input type = "text" placeholder="Name" onChange={handleName} value={credentials}></input><br></br>
              <input type = "Password" placeholder="Password" onChange={handlechange} value={password}/><br></br>
             
              <button >click here</button>
           </form>
      </div>
    );
  }
  
  export default LoginPage
  