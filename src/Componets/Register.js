import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';


const reducer = (state, action) => {
    switch (action.type) {
        case "REGISTER_REQUEST":
            return { ...state, loading: true };
        case "REGISTER_SUCCESS":
            return { ...state, loading: false, registeredUser: action.payload, error: "" };
        case "REGISTER_FAIL":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}
export default function Register() {
    const navigate = useNavigate();
    const {user,setUser} = useContext(ThemeContext)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [website, setWebsite] = useState("")
    const [password, setPassword] = useState("")
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        error: "",
        registeredUser: null

    })
    const { loading, registeredUser, error } = state;
    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch({ type: "REGISTER_REQUEST" });
        try {
            console.log("run")

            const { data } = await axios.post(`/api/user`, {
                id: Math.floor(Math.random() * 1000000),
                user_name: name,
                email: email,
                password: password,
                phone: phone,
               
            })
            // console.log(data[0]) if (data.length > 0) {
            localStorage.setItem('user', JSON.stringify(data))
            dispatch({ type: "REGISTER_SUCCESS", payload: data })
        }
        catch (err) {
            dispatch({ type: "REGISTER_FAIL", payload: err.message })
        }
    }
    useEffect(()=>{
        if(registeredUser){
            setUser(registeredUser)
            navigate('/user')
        }
    },[registeredUser])
    return (
        <div>

            <h1>Login User</h1>
            <div className='loginForm'>
                <form onSubmit={handleSubmit} className='form'>
                    <div className='form-items'>
                        <label htmlFor='name'>
                            Name:
                        </label>
                        <input type='text' onChange={(e) => { setName(e.target.value) }} name='name'  required></input>
                    </div>
                    <div className='form-items'>
                        <label htmlFor='email'>
                            Email:
                        </label>
                        <input type='email' onChange={(e) => { setEmail(e.target.value) }} name='email' id='email'required></input>
                    </div>
                    <div className='form-items'>
                        <label htmlFor='phone'>
                            Phone:
                        </label>
                        <input type='number' onChange={(e) => { setPhone(e.target.value) }} name='phone'  required></input>
                    </div>
                    <div className='form-items'>
                        <label htmlFor='password'>
                            Password:
                        </label>
                        <input type='password' onChange={(e) => { setPassword(e.target.value) }} name='password'  required></input>
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
                        <span>Already have a account? <Link to={"/login"}>Log-in</Link></span>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}
