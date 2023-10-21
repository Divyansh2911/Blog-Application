import { React, useContext, useState } from 'react'
import { ThemeContext } from './ThemeContext'
import { NavLink, useNavigate } from 'react-router-dom'
export default function Navbar() {
  const { user } = useContext(ThemeContext)
  const { theme, toggleTheme } = useContext(ThemeContext)
  const [state, setState] = useState("")
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${state}`)
  }
  return (
    <div className='header'>
      <div className='header-items'>
        <NavLink exact activeClass='active' to='/'><strong>Awesome Blog</strong></NavLink>
      </div>
      <div className='header-items'>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='search posts' name='searchInpput' onChange={(e) => { setState(e.target.value) }}
          ></input>
          <button type='submit'>GO</button>
        </form>
      </div>
      <div className='header-items'>
        {user ? <>
          <NavLink exact to={"/user"} activeClass="active">{user.user_name}</NavLink>
          <NavLink exact to={"/user/create"} activeClass="active">create Post</NavLink>
        </>
          : <NavLink to='/login'>Login </NavLink>}
        <div>
          <button onClick={toggleTheme}>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</button>
        </div>
      </div>
    </div>
  )
}
