import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Register = (props) => {
    const [username, setUser] = useState('');
    const [password, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username,password);
    }

    const register = async () => {
        const api_url = "http://localhost:3001/";
        const res = await postapi(api_url, {
            username: username,
            password: password
        });
        if(res.status == "success"){
            alert("Register Success.");
            window.location.href="/";
        }
    }
        
    async function postapi(url, data) {
        console.log(JSON.stringify(data))
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });  
        var res = await response.json();
        return res
    }

    return (
        <div className="auth-form-container">
            

        <form className="register-form" onSubmit={handleSubmit}>
            <h2>Register</h2>
            <label htmlFor="username">Username</label>
            <input value={username} onChange={(e) => setUser(e.target.value)}type="username" placeholder="username" id="username" name="username" />
            <label htmlFor="password">Password</label>
            <input value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="password" id="password" name="password" />
            <button type="submit" onClick={register}>Register</button>
            <div style={{ textAlign: 'left' }}>
            Already have an account? <Link to = "/" >Log In</Link></div>
        </form>
    </div>
    )
}

export default Register;
