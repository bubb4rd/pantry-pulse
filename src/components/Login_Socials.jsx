import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import userContext from "./UserContext";
import {signInWithGoogle} from "./util/User";

export default function Login_Socials() {
    const navigate = useNavigate();
    const {user, setUser} = useContext(userContext);


    return (
        <div className={"flex mt-8 w-full justify-center gap-4"}>
            <button><i
                className='bx bxl-google text-3xl bg-gray-300 border-2 border-gray-400 cursor-pointer  px-2.5 py-2 align-middle rounded-full transition-all hover:bg-orange-900  hover:text-white hover:border-deep-orange-800' onClick={() => {
                    signInWithGoogle(setUser).then(() => navigate('/'));
            }}></i>
            </button>
        </div>
    );
}