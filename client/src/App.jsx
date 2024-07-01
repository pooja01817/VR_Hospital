
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './signup'
import Login from './login'
import Home from './home'
import Otp from './otp'
import {Link} from 'react-router-dom';
import './Welcome.css'; // Import your CSS file

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<WelcomePage/>} />
      <Route path='/home' element={<Home/>} />
      <Route path='/register' element={<Signup/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/otp/:email' element={<Otp/>} />
    </Routes>
    </BrowserRouter>
  );
}
const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <div className="center-content">
        <h1>Welcome to Your App</h1>
        <p>Please login or register to continue.</p>
        <div className="button-container">
          <Link to="/login" className="button">Login</Link>
          <Link to="/register" className="button">Register</Link>
        </div>
      </div>
    </div>
  );
};
export default App;