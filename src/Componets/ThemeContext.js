import {useState , createContext} from 'react'
const ThemeContext = createContext();
function ThemeContextProvider(props){
    const lsTheme = localStorage.getItem('theme')?localStorage.getItem('theme'):"light";
    const lsUser = localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null;
    const [user,setUser] = useState(lsUser)
    const [theme, setTheme] = useState(lsTheme)
    const toggleTheme=()=>{
        setTheme(theme==='light'?'dark':'light');
        localStorage.setItem('theme',theme==='light'?'dark':'light')
    }

    return(<ThemeContext.Provider value={{theme,toggleTheme,user,setUser}}>
        {props.children}
    </ThemeContext.Provider>)
}
export {ThemeContext,ThemeContextProvider}