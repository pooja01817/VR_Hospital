import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function Otp() {
    const { email, password } = useParams();
    const navigate = useNavigate();

    const [generatedOtp, setGeneratedOtp] = useState("");
    const [enteredOtp, setEnteredOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [error, setError] = useState("");

    const sendOtp = () => {
        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOtp(generatedOtp);

        axios.post('http://127.0.0.1:3001/send-otp', { email, otp: generatedOtp })
            .then(response => {
                console.log(response);
                setIsOtpSent(true);
            })
            .catch(error => {
                console.error(error);
                setError("Failed to send OTP. Please try again.");
            });
    };

    const handleOtpVerification = () => {
        if (enteredOtp === generatedOtp) {
            axios.post('http://127.0.0.1:3001/login', { email, password })
                .then(result => {
                    console.log(result);
                    navigate('/login');
                })
                .catch(err => {
                    console.log(err);
                    setError("Login failed. Please try again.");
                });
        } else {
            setError("Invalid OTP. Please check your email and enter the correct OTP.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 round w-25">
                <h2>Verification</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                {!isOtpSent ? (
                    <button onClick={sendOtp} className="btn btn-success w-100 rounded-0">
                        Send OTP to Email
                    </button>
                ) : (
                    <div>
                        <p>Enter the OTP sent to your email:</p>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            autoComplete="off"
                            value={enteredOtp}
                            onChange={(e) => setEnteredOtp(e.target.value)}
                            className="form-control rounded-0"
                        /><br></br>
                        <button onClick={handleOtpVerification} className="btn btn-success w-100 rounded-0">
                            Verify OTP and Login
                        </button>
                    </div>
                )}
                <p>Already Have an Account</p>
                <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Otp;

