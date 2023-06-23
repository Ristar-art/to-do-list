import logo from './logo.svg';
import './App.css';
import LoginPage from './loginPage';
import RegistrationPage from './registrationPage';

import { BrowserRouter as Router,Route,Switch} from 'react-router-dom'
  
  function App() {
  return (
    <Router>
      <div className="App">
 
        <div className='container'>
          <switch>
            <Route path = "/">
           
           <LoginPage/>  
           </Route>
          
          </switch>
       
          
        </div>
             
     
      </div>

    </Router>
    
  )
}

export default App;
