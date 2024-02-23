import React from 'react'

//Import Context
import { useAuthValue } from '../context/AuthContext';

//Import hooks
import { useAuthentication } from '../hooks/useAuthentication';

//import do React Router
import { NavLink } from 'react-router-dom';

//Import do Css
import styles from "./Navbar.module.css";

const Navbar = () => {

    //Recuperando o usuário que está sendo compartilhado no APP.js com o AuthProvider
    const {user} = useAuthValue()

    //Importando a função logout do hooks useAuthentication
    const {logout} = useAuthentication();
    
  return (
    <nav className={styles.navbar}>
        <NavLink to="/" className={styles.brand}> 
            Mini <span>Blog</span>
        </NavLink>
        <ul className={styles.links_list}>
            <li>
                <NavLink to="/" className={({isActive}) => (isActive ? styles.active : "")}>Home</NavLink>                
            </li>
            {!user && (
                <>
                    <li>
                        <NavLink to="/login" className={({isActive}) => (isActive ? styles.active : "")}>Entrar</NavLink>                
                    </li>
                    <li>
                        <NavLink to="/register" className={({isActive}) => (isActive ? styles.active : "")}>Cadastrar</NavLink>                
                    </li>                
                </>
            )}
            {user && (
                <>
                <li>
                    <NavLink to="/posts/create" className={({isActive}) => (isActive ? styles.active : "")}>Novo post</NavLink>                
                </li>
                <li>
                    <NavLink to="/dashboard" className={({isActive}) => (isActive ? styles.active : "")}>Dashboard</NavLink>                
                </li>                
            </>
            )}
            <li>
                <NavLink to="/about" className={({isActive}) => (isActive ? styles.active : "")}>Sobre</NavLink>
            </li>
            {user && (
                <>
                    <li>
                        <button className='' onClick={logout}>Sair</button>
                    </li>                                   
                </>
            )}
        </ul>
    </nav>
  )
}

export default Navbar