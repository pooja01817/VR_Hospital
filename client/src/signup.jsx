import {useState} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function signup()
{
    const [name, setName] =useState()
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const [mobile,setMobile]=useState()
    const [error, setError] = useState("")
    const navigate=useNavigate()

    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('http://127.0.0.1:3001/register', { name, email, password, mobile })
        .then(response => {
            console.log(response);
            if (response.data === "success") {
                navigate(`/otp/${encodeURIComponent(email)}`);
                console.log(email)
            } else if (response.status === 409) {
                setError("User with this email already exists.");
            } else {
                setError("Registration failed. Please try again.");
            }
        })
        .catch(err => {
            console.log(err);
            setError("Registration failed. Please try again.");
        });

    }
    const isRegisterButtonEnabled = name && email && password && mobile;

    return(
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 round w-25">
                <h2>Register</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Name</strong>
                        </label>
                        <input
                        type="text"
                        placeholder="Enter Name"
                        autoComplete="off"
                        name="email"
                        className="form-control rounded-0"
                        onChange={(e)=>setName(e.target.value)}
                    />
                    </div>
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
                        name="password"
                        className="form-control rounded-0"
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="mobile">
                            <strong>Phone Number</strong>
                        </label>
                        <input
                        type='tel'
                        placeholder="Enter Mobile Number"
                        name="mobile"
                        className="form-control rounded-0"
                        onChange={(e)=>setMobile(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0" disabled={!isRegisterButtonEnabled}>
                        Register
                    </button>
                </form>
                <p>Already Have an Account</p>
                <Link to="/login" className="btn btn-default boarder w-100 bg-light rounde-0 text-decoration-none">
                    Login
                </Link>
            </div>
        </div>
    );
}
export default signup;