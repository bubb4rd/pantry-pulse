import Login_Socials from "./Login_Socials";
import {Link, useNavigate} from "react-router-dom";
import {auth} from '../config/firebase'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {useEffect, useState} from "react";
import {useContext} from "react";
import UserContext from "./UserContext";
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {setUser} = useContext(UserContext);
    const navigate = useNavigate();
    const signIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    const newUser ={
                        ...auth.currentUser,
                        loggedIn: true
                    };
                    setUser(newUser);
                    navigate('/');
                })
                .catch((err) => {
                    if (err.code === 'auth/invalid-credential')  setError('Invalid Credentials')
                });
        } catch (err) {

        }
    }
    return (
        <section className={"py-0"}>

            <div className={"flex flex-col w-full rounded-full md:flex-row"}>
                <div className={"w-full md:w-1/2 px-8 py-8 text-center bg-white rounded-t-3xl md:rounded-l-3xl md:rounded-r-none"}>
                    <h1 className={"text-center font-black text-3xl"}>Sign in</h1>
                    <Login_Socials/>
                    <div className={"px-2 py-2 "}>
                        <div className={"flex flex-col text-left py-2 gap-1"}>
                            <span className={"text-red-900"}>{error}</span>
                            <label htmlFor={"user-email"}>Email address</label>
                            <input name={"user-email"} className={"rounded-xl border-0 bg-gray-300 shadow-inner  focus:ring-offset-1 focus:ring-2 focus:ring-black focus:ring-opacity-50"} placeholder={"Enter email address"} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className={"flex flex-col text-left py-2 gap-1"}>
                            <label htmlFor={"user-password"}>Password</label>
                            <input name={"user-password"} className={"rounded-xl border-0 bg-gray-300 shadow-inner focus:ring-offset-1 focus:ring-2 focus:ring-black focus:ring-opacity-50"} placeholder={"Enter password"} type={'password'} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>
                    <div className={"py-1.5 cursor-pointer w-full text-center"}>
                        <a className={"text-gray-700 opacity-90"}>Forgot password?</a>
                    </div>
                    <button href={""}
                       className={"text-white font-black text-2xl w-fit text-center px-5 py-3.5 bg-orange-900 rounded-3xl mt-4 cursor-pointer  border-gray-900 hover:border-2 hover:bg-gray-100 hover:text-orange-900 hover:border-gray-300 transition-all"} onClick={signIn}>Sign in</button>
                    <h3 className={"mt-5"}>© Bo Hubbard 2024. All rights reserved</h3>
                </div>
                <div
                    className={"w-full md:w-1/2 min-h-[75vh] px-12 py-3 bg-orange-900 flex flex-col justify-center items-center rounded-b-3xl md:rounded-l-none   md:rounded-r-3xl justify-around bg-food bg-cover"}>

                    <div className={"flex flex-col gap-5"}>
                        <i className='bx bx-bowl-hot text-white text-6xl text-center'></i>
                        <div className={""}>
                            <h1 className={"font-black text-3xl text-white text-center"}>Unlock your kitchen.</h1>
                            <h3 className={"text-xl text-white text-center"}>Simple meals start here.</h3>
                        </div>
                    </div>
                    <Link to={'/signup'}
                       className={"bg-white font-black text-2xl w-fit text-center px-5 py-3.5 rounded-3xl mt-4 cursor-pointer hover:border-2 hover:border-blue-900 hover:bg-blue-700 hover:text-white transition-all hover:border-opacity-50"}>Make
                        an account now</Link>
                </div>
            </div>
        </section>
    );
}