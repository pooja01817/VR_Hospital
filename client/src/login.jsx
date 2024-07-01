import {useState} from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function login()
{
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const [error, setError] = useState(null);
    const [loginStatus, setLoginStatus] = useState(null);
    const navigate=useNavigate()

    axios.defaults.withCredentials=true;

    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:3001/login',{email,password})
        .then(result=>{console.log(result)
            if(result.data==="success")
            {
                console.log(result.data)
                navigate('/home')
            }
        })
        .catch((error) => {
    console.error(error);
    setError("No record is exist");
});

    }

    const isLoginButtonEnabled = email && password;

    return(
        <div className="d-flex justify-content-center align-items-center bg-secondsry vh-100">
            <div className="bg-white p-3 round w-25">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                        type="email"
                        placeholder="Enter Email"
                        autoComplete="off"
                        name="email"
                        className="form-control rounded-0"
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Password</strong>
                        </label>
                        <input
                        type="password"
                        placeholder="Enter Password"
                        name="Password"
                        className="form-control rounded-0"
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0" disabled={!isLoginButtonEnabled}>
                        Login
                    </button>
                </form>
                <p>If You Dont't Have an Account</p>
                <Link to="/register" className="btn btn-default boarder w-100 bg-light rounde-0 text-decoration-none">
                    signup
                </Link>
            </div>
        </div>
    );
}
export default login;