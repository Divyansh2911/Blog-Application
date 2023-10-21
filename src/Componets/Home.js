import { React, useReducer, useEffect } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const reducer = (state, action) => {
    switch (action.type) {
        case "Request_Post":
            return { ...state, loading: true };
        case "Request_Success":
            return { ...state, loading: false, posts: action.payload, error: "" };
        case "Request_Fails":
            return { ...state, loading: false, error: action.payload };
        case "USER_Request_Post":
            return { ...state, loadingUsers: true };
        case "USER_Request_Success":
            return { ...state, loadingUsers: false, users: action.payload, errorUsers: "" };
            case "SINGLE_USER_SUCCESS":
            return { ...state, loadingUsers: false, user: action.payload, errorUsers: "" };
        case "USER_Request_Fails":
            return { ...state, loadingUsers: false, errorUsers: action.payload };
        default:
            return state;
    }

}
export default function Home(props) {
    const {query,userId} = useParams();
    // console.log(query);
    // console.log(userId);
    const [state, dispatch] = useReducer(reducer, { loading: false, error: "", posts: [], users: [],user:{}, errorUsers: "", loadingUsers: false })
    const { loading, error, posts, users, errorUsers, loadingUsers ,user} = state;
    const getData = async () => {
        dispatch({ type: "Request_Post" })
        try {
            const { data } = await axios.get(
                // userId?'https://jsonplaceholder.typicode.com/posts?userId='+userId : 'https://jsonplaceholder.typicode.com/posts')
                userId?'/api/posts?userId='+userId : '/api/posts')
            const filteredPost = query?data.filter(x=>x.title.indexOf(query)>=0 || x.body.indexOf(query)>=0)
            :data;
            dispatch({ type: "Request_Success", payload: filteredPost })
        }
        catch (error) {
            dispatch({ type: "Request_Fails", payload: error.message })
        }
    }
    const getUsers = async () => {
        dispatch({ type: "USER_Request_Post" })
        try {
            const { data } = await axios.get(
                userId?'/api/user?id='+userId:"/api/user")
                // '/api/user')
                // console.log(data)
            dispatch({ type: userId?"SINGLE_USER_SUCCESS": "USER_Request_Success", payload: data })
        }
        catch (error) {
            dispatch({ type: "USER_Request_Fails", payload: error.message })
        }
    }
    useEffect(() => {
        // console.log("run")
        getData();
        getUsers();
    }, [query,userId])

    return (
        <div className='blog'>
            <div className='content'>
            <h1>All Posts</h1>
                {loading ? <p>loading...</p>
                    : error ? <div> Error : {error}</div>
                        : posts.length === 0 ? <div>No posts found</div>
                            : <ul>
                                {posts.map((value) => (<li key={value.id}>
                                    <Link to={`/posts/${value.id}`} >
                                    <h3>
                                        Title : {value.title}
                                    </h3>
                                    </Link>
                                    <p>{value.body}</p>
                                </li>))}
                            </ul>
                }
            </div>
            <div className='sidebar'>
                <h3>Authors</h3>
                {loadingUsers?<p>Loading users...</p>
                :errorUsers?<div>Error :{errorUsers}</div>
                :userId?
                (user[0]?<h3>{user[0].user_name}'s Profile</h3> :"")
                    :(users?
                        <ul>
                        {users.map((value) => (<li>
                            <Link to={`/users/${value.id}`}>
                                {/* {console.log(value)} */}
                            <p>{value.user_name}</p>
                            </Link>
                        </li>))}
                    </ul>:"No users found")
                }












              
            </div>
        </div>
    )
} 
