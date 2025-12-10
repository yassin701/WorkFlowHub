import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailerror, setEmailerror] = useState("");
    const [passworderror, setPassworderror] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Loading screen
    if (loading) {
        return (
            <div className="loading-container">
                <div className="loader-mini"></div>
            </div>
        );
    }

    const handleClick = async (e) => {
        e.preventDefault();

        // Clear errors
        setEmailerror("");
        setPassworderror("");

        let valid = true;

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            setEmailerror("Email is required");
            valid = false;
        } else if (!emailRegex.test(email)) {
            setEmailerror("Invalid email format");
            valid = false;
        }

        // Password validation
        if (!password.trim()) {
            setPassworderror("Password is required");
            valid = false;
        }

        if (!valid) return;

        // Fetch user from JSON server
        const { data } = await axios.get("http://localhost:3000/user");

        if (email !== data.email) {
            setEmailerror("Email incorrect");
            return;
        }

        if (password !== data.password) {
            setPassworderror("Password incorrect");
            return;
        }

        // Login success
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate(`/Home` , {state : email});
            setEmail("");
            setPassword("");
        }, 1500);
    };

    return (
        <div className='Log-in'>
            <div className='login-container'>
                <h1 className='login-title'>Sign In</h1>

                <form>
                    <div className='Email'>
                        <label>Email</label>
                        <input
                            type="text"
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {emailerror && <p className="error">{emailerror}</p>}

                    <div className='Password'>
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {passworderror && <p className="error">{passworderror}</p>}

                    <button onClick={handleClick} className='btn-log'>Sign In</button>
                </form>
            </div>
        </div>
    );
}
