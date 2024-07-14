import {useContext, useEffect, useState} from "react";
import Login_Socials from "../components/Login_Socials";
import {Link, useNavigate} from "react-router-dom";
import UserContext from "../components/UserContext";
import {createUser, createWithEmail} from "../components/util/User";
import Navbar from "../components/Navbar";
export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);

    const signupClicked = async () => {
        if (confirmPassword !== password) setError('Password and confirm password are not the same')
        if (email.length > 0 && (confirmPassword === password)) {
            createWithEmail(email, password, setUser, setError).then(() => navigate('/'));
        }
    }
    useEffect(() => {
        if (user?.loggedIn) navigate('/');
    }, []);
    return (
            <>
                <Navbar/>
                <div className={"flex h-full flex-col md:flex-row px-5 md:px-20"}>
                    <div className={"md:w-1/2 text-center px-10 py-10 my-auto bg-white rounded-t-3xl md:rounded-l-3xl md:rounded-r-none"}>
                        <h1 className={"font-black text-3xl"}>Create your account</h1>
                        <p className={"text-gray-700"}>Already have an account? <Link to={'/login'} className={"cursor-pointer font-bold text-orange-900"}>Sign in</Link></p>
                        <div className={""}>
                            <div className={"px-2 py-2"}>
                                <div className={"flex flex-col text-left py-2 gap-1"}>
                                    <label htmlFor={"user-email"}>Email address</label>
                                    <input name={"user-email"} onChange={(e) => setEmail(e.target.value)}
                                           className={"rounded-xl border-0 bg-gray-300 shadow-inner  focus:ring-offset-1 focus:ring-2 focus:ring-black focus:ring-opacity-50"}
                                           placeholder={"Enter email address"}/>
                                </div>
                                <div className={"flex flex-col text-left py-2 gap-1"}>
                                    <label htmlFor={"user-password"}>Password</label>
                                    <input name={"user-password"} onChange={(e) => setPassword(e.target.value)} type={'password'}
                                           className={"rounded-xl border-0 bg-gray-300 shadow-inner focus:ring-offset-1 focus:ring-2 focus:ring-black focus:ring-opacity-50"}
                                           placeholder={"Enter password"}/>
                                </div>
                                <div className={"flex flex-col text-left py-2 gap-1"}>
                                    <label htmlFor={"user-password"}>Confirm Password</label>
                                    <input name={"user-password"} onChange={(e) => setConfirmPassword(e.target.value)} type={'password'}
                                           className={"rounded-xl border-0 bg-gray-300 shadow-inner focus:ring-offset-1 focus:ring-2 focus:ring-black focus:ring-opacity-50"}
                                           placeholder={"Enter password"}/>
                                    <span className={"text-red-900"}>{error}</span>
                                </div>
                                <button onClick={signupClicked}
                                        className={"text-white font-black text-2xl w-fit text-center px-5 py-3.5 bg-orange-900 rounded-3xl mt-4 cursor-pointer  border-gray-900 hover:border-2 hover:bg-gray-100 hover:text-orange-900 hover:border-gray-300 transition-all"}>Sign up
                                </button>
                            </div>
                        </div>
                        <h1 className={'mt-4'}>or, sign in with</h1>
                        <Login_Socials/>
                    </div>
                    <div className={"md:w-1/2 bg-signup bg-cover rounded-b-3xl md:rounded-l-none md:rounded-r-3xl text-white text-center text-3xl font-black p-2"}>
                        <span className={"my-auto"}>PantryPulse</span>
                    </div>
                </div>
            </>
    );
}