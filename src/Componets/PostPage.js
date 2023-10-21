import { React, useReducer, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
// import { Link } from 'react-router-dom';

const reducer = (state, action) => {
  switch (action.type) {
    case "Request_Post":
      return { ...state, loading: true };
    case "Request_Success":
      return { ...state, loading: false, post: action.payload, error: "" };
    case "Request_Fails":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }

}

export default function PostPage() {
  const { postId } = useParams()
  const [state, dispatch] = useReducer(reducer, { loading: false, post: { user: {} }, error: "" })
  const { loading, error, post } = state;
  const fetchData = async () => {
    dispatch({ type: "Request_Post" });
    try {
      const { data } = await axios.get(`/api/posts/${postId}`)
      // const { data: user } = await axios.get(`https://jsonplaceholder.typicode.com/users?id=${data.userId}`)
      // console.log();
      const { data: user } = await axios.get(`/api/user?id=${data.userId}`)
      console.log(postId);
      dispatch({ type: "Request_Success", payload: { ...data, user: user } })
    }
    catch (err) {
      dispatch({ type: "Request_Fails", payload: err.message })
    }
  }
  useEffect(() => {
    fetchData();
  }, [])

  return (

    <div className='blog'>
      {loading ? <h3>loading...</h3>
        : error ? <h5>{error}</h5>
          : post.length === 0 ? <h4>NO post found</h4> :
            (
              < div className='content'>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </div>
            )

      }
      <div className='sidebar'>
        <h3>Authors</h3>
        {post.user[0]?<div>
          <h4>{post.user[0].user_name}</h4>
        {console.log(post.user)}
        <p>{post.user[0].email}</p>
        <p>{post.user[0].phone}</p>
        </div>:<div>No  user with id : {postId} found.</div>}
        
      </div>
    </div >


  )
}
