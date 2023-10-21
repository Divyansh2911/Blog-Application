import axios from 'axios';
import React, { useContext, useReducer, useState } from 'react'
import { ThemeContext } from './ThemeContext';

const initialState = {
    loading: false,
    success: false,
    error: "",
    createdPost: null
}
const reducer = (state, action) => {
    switch (action.type) {
        case "CREATE_RESET":
            return initialState;
        case "CREATE_REQUEST":
            return { ...state, loading: true };
        case "CREATE_SUCCESS":
            return { ...state, loading: false, createdPost: action.payload, error: "", success: true }
        case "CREATE_FAILS":
            return { ...state, loading: false, success: false, error: action.payload }
        default:
            return state;
    }
}
export default function CreatePost() {
    const { user } = useContext(ThemeContext)
    // console.log(user.id)
    const [state, dispatch] = useReducer(reducer, initialState);
    const { loading, error, createdPost, success } = state;
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "CREATE_REQUEST", })
        try {
            const { data } = await axios.post("/api/posts", {
                title: title,
                body: body,
                userId: user.id,
                id: Math.floor(Math.random() * 100000),
            })
            dispatch({ type: "CREATE_SUCCESS", payload: data })
        }
        catch (err) {
            dispatch({ type: "CREATE_FAILS", error: err.message })
        }
    }
    const reset =()=>{
        dispatch({type:"CREATE_RESET"});
    }
    return (
        <div>
            {console.log(success)}
            <h1>Login User</h1>
            {success?(<div>
                <p>Post title : <strong>{createdPost.title}</strong> has been created</p>
                <button onClick={reset}>Create Post</button>
            </div>)
            :
            <div className='loginForm'>
                <form onSubmit={handleSubmit} className='form'>
                    <div className='form-items'>
                        <label htmlFor='title'>
                            Title:
                        </label>
                        <input type='text' onChange={(e) => { setTitle(e.target.value) }} name='email' id='email' required></input>
                    </div>
                    <div className='form-items'>
                        <label htmlFor='body'>
                            Content:
                        </label>
                        <textarea type="text" rows={10} onChange={(e) => { setBody(e.target.value) }}></textarea>
                    </div>
                    <div className='form-items'>
                        <label></label>
                        <button >Submit</button>
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
                </form>
            </div>
            }
            
        </div>
    )
}
