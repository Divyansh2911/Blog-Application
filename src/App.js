
import './App.css';
import Navbar from './Componets/Navbar';
import { useContext} from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { ThemeContext } from './Componets/ThemeContext';
import Home from './Componets/Home';
import PostPage from './Componets/PostPage';
import Login from './Componets/Login';
import Profile from './Componets/Profile';
import PrivateRoute from './Componets/PrivateRoute';
import CreatePost from './Componets/CreatePost';
import Register from './Componets/Register';
function App() {
  const {theme} = useContext(ThemeContext)
  return (
    <div className={`container ${theme}`}>
        <BrowserRouter>
      <Navbar />
      <div className='main'>
        <Routes>
          <Route  path='/user' element={<PrivateRoute />}>
            <Route path='/user' element ={<Profile/>}/>
            <Route path='/user/create' element ={<CreatePost/>}/>
          </Route>
          
          {/* <PrivateRoute path='/profile' component={<Profile/>}/> */}
          <Route path='/' element={<Home/>}/>
          <Route path='/search/:query?' element ={<Home/>}/>
          <Route path='/users/:userId' element ={<Home/>}/>
          <Route path='/posts/:postId'element={<PostPage/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
        
      </div>
        </BrowserRouter>
      <div className='footer'>
        <p><small>@All rights are reserved to : Awesome Blog 2023</small></p>
      </div>
    </div>

  );
}

export default App;
