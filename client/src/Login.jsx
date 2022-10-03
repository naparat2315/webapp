import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = (props) => {
    let navigate = useNavigate();
    const [username, setUser] = useState('');
    const [password, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username,password);
    }

    const Login = async () => {

        const api_url = "http://localhost:3001/checkUser";
        const res = await postapi(api_url, {
            username: username,
            password: password
        });
        console.log(res);
        if(res.founduser == 0){
            alert('No user found.')
        }
        if(res.founduser > 0){
            console.log("Founduser")
            alert("Login Success");
            navigate("/Upload");
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
            
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                
                <label htmlFor="username">Username</label>         
                <input value={username} onChange={(e) => setUser(e.target.value)}type="username" placeholder="username" id="username" name="username" />
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="password" id="password" name="password" />
                
                <button type="submit" onClick={Login}>Log In</button>
                <div style={{ textAlign: 'left' }}>
                Do not have an account? <Link to="/Register">Register</Link></div>

            </form>
        </div>
    )
}

export default Login;