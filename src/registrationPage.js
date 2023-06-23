import { useState } from "react"


function RegistrationPage(){

  const [name,setName]= useState('')
  const [email,setEmail]= useState('')
  const [password,setPassword]= useState();
  const [details,setDetails] = useState([])

  const HandleSubmit = (e) =>{
    e.preventDefault();
    const setDetails = {
     name,
     email,
     password
    }
 
     

  }
    
    return(
   <div className="Ditails">
    <from onSubmit={HandleSubmit}>
         <input type="text" placeholder="" required value = {name} onChange={(e)=>setName(e.target.value)}/><br></br>
         <input type="text" placeholder=""required value = {email} onChange={(e)=>setEmail(e.target.value)}/><br></br>
         <input type="password" placeholder=""required value = {password} onChange={(e)=>setPassword(e.target.value)}/><br></br>
          <p>{details.name}</p>
          <button>Sigh up</button>
    </from>
     
   </div>

    )


}
 export default RegistrationPage