import React, {useState, useEffect, useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import {auth} from '../config/firebase'
import {signOut} from "firebase/auth";
import userContext from "./UserContext";
import {useTheme} from "@mui/material/styles";
import {useMediaQuery} from "@mui/material";
import {logOut} from "./util/User";
const closeOtherWindows = () => {

}

export default function Navbar() {
    const [color, setColor] = useState('text-white');
    const [bg, setBG] = useState('bg-transparent');
    const [signedIn, setSignedIn] = useState(false);
    const {user, setUser} = useContext(userContext);
    const navigate = useNavigate();
    const theme = useTheme();
    const windowMatches = useMediaQuery(theme.breakpoints.down('md'));

    const listenScrollEvent = (event) => {
        if (window.scrollY > 50) {
            setColor('text-gray-900')
            setBG('bg-gray-200');
        } else if (window.scrollY < 50) {
            setColor('text-black');
            setBG('bg-transparent');
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', listenScrollEvent);
        return () =>
            window.removeEventListener('scroll', listenScrollEvent);

    }, []);
    return (
        <header className={`sticky md:visible justify-between px-8 py-1 bg-gray-200 w-full z-50 transition-all text-gray-900`}>
            <nav className="border-gray-200 transition-all">
                <div className="max-w-screen-xl flex flex-row-reverse md:flex-row flex-wrap items-center justify-between mx-auto py-4">
                    {
                        windowMatches ? ""
                            : <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span
                            className="self-center text-2xl font-black whitespace-nowrap dark:text-white">PantryPulse</span>
                            </Link>
                    }
                    {
                        (user?.loggedIn) ?
                            <div
                                className="flex flex-row-reverse items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                            <button type="button"
                                        className="flex text-sm rounded-full px-0.5 md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                        id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown"
                                        data-dropdown-placement="bottom" onClick={() => {
                                    const menu = document.getElementById('user-dropdown');
                                    menu.classList.toggle('hidden');
                                }}>
                                    <span className="sr-only">Open user menu</span>
                                {
                                    (user?.providerData[0].photoURL) ?
                                        <img src={user?.providerData[0].photoURL} className={'h-[30px] w-[30px] rounded-full'}/>
                                        : <i className='text-3xl bx bx-user-circle hover:text-orange-900'></i>
                                }
                            </button>
                                <div
                                    className="z-50 hidden my-4 text-base list-none divide-y divide-gray-100 rounded-lg shadow bg-gray-200 dark:divide-gray-600 top-2/4 absolute"
                                    id="user-dropdown">
                                    <div className="px-4 py-3">
                                        {user?.displayName}
                                        <span
                                            className="block text-sm  text-gray-500 truncate dark:text-gray-400">{user?.email}</span>
                                    </div>
                                    <ul className="py-2" aria-labelledby="user-menu-button">
                                        <li>
                                            <Link to="/recipes"
                                               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Saved
                                                Recipes</Link>
                                        </li>
                                        <li>
                                            <Link to={'/settings'}
                                               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white ">Settings</Link>
                                        </li>
                                        <button className={"w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white text-left"} onClick={() => {
                                            logOut(setUser).then(() => navigate('/'));
                                        }}>Log
                                            out
                                        </button>
                                    </ul>
                                </div>
                            </div>
                            : <Link to={"/login"}
                                    className={"flex flex-row-reverse items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse bg-orange-900 cursor-pointer px-3.5 text-xl font-bold text-white py-2 rounded-full border-orange-900 border-2 hover:bg-gray-100 hover:text-orange-900 hover:border-gray-300 border-opacity-50 transition-all"}>Log
                                in</Link>
                    }

                    <button data-collapse-toggle="navbar-user" type="button"
                            className={`inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-900 rounded-lg md:hidden  focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600 mr-4 transition-all`}
                            aria-controls="navbar-user" aria-expanded="false" onClick={() => {
                        const navbar = document.getElementById("navbar-user");
                        navbar.classList.toggle('hidden');
                    }}>
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-10 h-10" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                             fill="none"
                             viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                         id="navbar-user">
                        <ul className={`flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 `}>
                            <li>
                                <a href="/#features"
                                   className={`text-xl block py-2 px-3  rounded md:bg-transparent  md:p-0 md:dark:text-blue-500 hover:text-orange-900 text-gray-900 transition-all`}
                                   aria-current="page">Features</a>
                            </li>
                            <li>
                                <a href="/#search"
                                   className={`text-xl block py-2 px-3  rounded md:bg-transparent  md:p-0 hover:text-orange-900 text-gray-900 transition-all`}
                                   aria-current="page">Search</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}