import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailerror, setEmailerror] = useState("");
    const [passworderror, setPassworderror] = useState("");
    const [success, setSuccess] = useState("");
    const Navigate = useNavigate()

    const handleClick = (e) => {
        e.preventDefault();

        // Clear previous errors
        setEmailerror("");
        setPassworderror("");

        let Allvalide = true;

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            setEmailerror("Email is required");
            Allvalide = false;
        } else if (!emailRegex.test(email)) {
            setEmailerror("Invalid email format");
            Allvalide = false;
        }

        // Password required check
        if (!password.trim()) {
            setPassworderror("Password is required");
            Allvalide = false;
        }

        if (Allvalide) {
            setSuccess("Login successful!");
            setTimeout(() => {
                setSuccess("");
                setEmail("");
                setPassword("");
                Navigate("/Home")
            }, 3000);
        }
    }

    return (
        <div className='Log-in'>
            <div className='login-container'>
                <h1 className='login-title'>Sign In</h1>

                <form>
                    <div className='Email'>
                        <label>Email</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {emailerror && <p className="error">{emailerror}</p>}

                    <div className='Password'>
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {passworderror && <p className="error">{passworderror}</p>}

                    {success && <p className="success">{success}</p>}

                <button onClick={handleClick} className='btn-log'>Sign In</button>
                </form>
            </div>
        </div>
    )
}
