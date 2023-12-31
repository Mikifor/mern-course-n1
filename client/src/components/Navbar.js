import React, {useContext} from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const Navbar = () => {
    const auth = useContext(AuthContext)
    // const history = useNavigate() //импортируется из роутердом
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        // history.push('/') //хз зачем оно надо было, так и не понял. Только ошибку выдает
    }

    return (
        <nav>
            <div class="nav-wrapper">
                <a href="/" className="brand-logo">Сокращение ссылок</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create">Create</NavLink></li>
                    <li><NavLink to="/links">Links</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Out</a></li>
                </ul>
            </div>
        </nav>)
}