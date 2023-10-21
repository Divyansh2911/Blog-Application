import React, { useContext, useEffect, useReducer, useState } from 'react'
import { ThemeContext } from './ThemeContext'
import axios from 'axios';
const initialState = {
  loading: false,
  updatedUser: null,
  error: "",
  success: false
}
const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_REQUEST":
      return { ...state, loading: true };
    case "UPDATE_SUCCESS":
      return { ...state, loading: false, updatedUser: action.payload, success: true, error: "" }
    case "UPDATE_FAILS":
      return { ...state, loading: false, success: false, error: action.payload }
    default:
      return { ...state }
  }
}
export default function Profile() {
  const { user, setUser } = useContext(ThemeContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { loading, updatedUser, error, success } = state;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  // console.log(user)
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_REQUEST" })
    try {
      const { data } = await axios.put("/api/user/" + user.id, {
        ...user,
        user_name: name,
        email: email,
        phone: phone,
        website: website,
        password: password
      })
      const {data : Oneuser} = await axios.get("/api/user?id="+user.id)
      console.log(Oneuser)
      dispatch({ type: "UPDATE_SUCCESS", payload: Oneuser[0] })
    }
    catch (err) {
      dispatch({ type: "UPDATE_FAILS", payload: err.message })
    }
  }
  const logoutHandler=(e)=>{
    e.preventDefault();
    localStorage.removeItem('user')
    setUser(null)
  }
  useEffect(() => {
    if (updatedUser) {
      setUser(updatedUser);
    }
    else {
      setName(user.user_name);
      setEmail(user.email);
      setPhone(user.phone);
      setPassword(user.password)
      setWebsite(user.website)
    }
  }, [updatedUser,user])
  return (
    <div>
      <h2>{user.user_name}'s Profile</h2>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-items'>
          <label htmlFor='name'>Name:</label>
          <input type='text' value={name} name='name' onChange={(e) => setName(e.target.value)}></input>
        </div>
        <div className='form-items'>
          <label htmlFor='email'>Email:</label>
          <input type='email' value={email} name='email' onChange={(e) => setEmail(e.target.value)}></input>
        </div>
        <div className='form-items'>
          <label htmlFor='password'>Password:</label>
          <input type='password' value={password} name='password' onChange={(e) => setPassword(e.target.value)}></input>
        </div>
        <div className='form-items'>
          <label htmlFor='phone'>Phone:</label>
          <input type='number' value={phone} name='phone' onChange={(e) => setPhone(e.target.value)}></input>
        </div>
        <div className='form-items'>
          <label htmlFor='website'>Website:</label>
          <input type='text' value={website} name='website' onChange={(e) => setWebsite(e.target.value)}></input>
        </div>
        {loading && (
          <div className='form-items'>
            <label></label>
            <span>Processing...</span>
          </div>
        )}
        {error && (
          <div className='form-items'>
            <label></label>
            <span className='Error'>Error : {error}</span>
          </div>
        )}
        {success&& (<div>
          <label></label>
          <span className='success'>Profile updated successfully</span>
        </div>)}
        <div className='form-items'>
          <label ></label>
          <button>Update Profile</button>
        </div>
        <div className='form-items'>
          <label></label>
          <button onClick={logoutHandler}>Log-out</button>
        </div>
      </form>
    </div>
  )
}
