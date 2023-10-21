import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ThemeContext } from './ThemeContext';

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_REQUEST":
            return { ...state, loading: true };
        case "LOGIN_SUCCESS":
            return { ...state, loading: false, logInUSer: action.payload, error: "" };
        case "LOGIN_FAIL":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}
export default function Login() {
    const navigate = useNavigate();
    const {user,setUser} = useContext(ThemeContext)
    if(user){
        navigate("/profile")
    }
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        error: "",
        logInUSer: null

    })
    const { loading, logInUSer, error } = state;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleChangeEmail = (event) => {
        setEmail(event.target.value)
    }
    const handleChangePassword = (event) => {
        setPassword(event.target.value)
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch({ type: "LOGIN_REQUEST" });
        try {
            console.log("run")

            const { data } = await axios.get(`/api/user?email=${email}&password=${password}`)
            // console.log(data[0])
            if (data.length > 0) {
                localStorage.setItem('user',JSON.stringify(data[0]))
                dispatch({ type: "LOGIN_SUCCESS", payload: data[0] })
            }
            else {
                dispatch({ type: "LOGIN_FAIL", payload: "Invalid Email or Password" })
            }
        }
        catch (err) {
            dispatch({ type: "LOGIN_FAIL", payload: err.message })
        }
    }
    useEffect(() => {
        if (logInUSer) {
            setUser(logInUSer)
            return navigate('/user');
        }
    }, [logInUSer])

    return (
        <div>
        
            <h1>Login User</h1>
            <div className='loginForm'>
                <form onSubmit={handleSubmit} className='form'>
                    <div className='form-items'>
                        <label htmlFor='email'>
                            Email:
                        </label>
                        <input type='email' onChange={handleChangeEmail} name='email' id='email' required></input>
                    </div>
                    <div className='form-items'>
                        <label htmlFor='password'>
                            Password:
                        </label>
                        <input type='password' onChange={handleChangePassword} name='password' id='password' required></input>
                    </div>
                    <div className='form-items'>
                        <label></label>
                        <button >Submit</button>
                    </div>
                    {loading && <div className='form-items'>
                        <label></label>
                        <span>Processing...</span>
                    </div>}
                    {error && <div className='form-items'>
                        <label></label>
                        <span className='error'>{error}</span>
                    </div>}
                    <div className='form-items'>
                        <label></label>
                        <span>New user? <Link to={"/register"}>Register</Link></span>
                    </div>
                    <div className='form-items'>
                        <label></label>
                        <span>Or use Email : Sg.2@gmail.com , password : 123456</span>
                    </div>
                </form>
            </div>
        </div>
    )
}
