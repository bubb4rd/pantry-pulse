import React, {useContext, useEffect, useState} from "react";
import userContext from "./UserContext";
import {Link, useNavigate} from "react-router-dom";
import {useTheme} from "@mui/material/styles";
import {useMediaQuery} from "@mui/material";
import {signOut} from "firebase/auth";
import {auth} from "../config/firebase";

export default function Navbar_Alt() {
    const [color, setColor] = useState('text-white');
    const [bg, setBG] = useState('bg-transparent');
    const {user, setUser} = useContext(userContext);
    const navigate = useNavigate();
    const theme = useTheme();
    const windowMatches = useMediaQuery(theme.breakpoints.down('md'));
    const logOut = async () => {
        try {
            await signOut(auth)
                .then(() => {
                        setUser(undefined);
                        navigate('/');
                    }
                )
        } catch (err) {
            console.error(err);
        }
    }
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
                <div className="max-w-screen-xl flex flex-row md:flex-row flex-wrap items-center justify-between mx-auto py-4">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span
                            className="self-center text-2xl font-black whitespace-nowrap dark:text-white">PantryPulse</span>
                            </Link>
                    {user?.loggedIn ?
                        <>
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
                                        <button
                                            className={"w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white text-left"}
                                            onClick={logOut}>Log
                                            out
                                        </button>
                                    </ul>
                                </div>
                            </div>

                        </>
                    : ""}
                </div>
            </nav>
        </header>
    );
}