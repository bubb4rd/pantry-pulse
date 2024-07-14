import UserContext from "../UserContext";
import SearchContext from "../SearchContext";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "../../pages/MainPage";
import LoginPage from "../../pages/LoginPage";
import SignupPage from "../../pages/SignupPage";
import SavedRecipes from "../../pages/SavedRecipes";
import UserSettings from "../../pages/UserSettings";
import {useEffect, useState} from "react";
import Navbar from "../Navbar";

export default function SignedIn() {
    const [search, setSearch] = useState(undefined);
    const [user, setUser] = useState({})
    useEffect(() => {
    }, [search]);
    return (
        <>
            <UserContext.Provider value={{user, setUser}}>
                <SearchContext.Provider value={{search, setSearch}}>
                    <BrowserRouter>
                        <Routes>
                            <Route path={'/'} element={<MainPage/>}/>
                            <Route path={"/login"} element={<LoginPage/>}/>
                            <Route path={"/signup"} element={<SignupPage/>}/>
                            <Route path={"/recipes"} element={<SavedRecipes/>}/>
                            <Route path={'/settings'} element={<UserSettings/>}/>
                        </Routes>
                    </BrowserRouter>
                </SearchContext.Provider>
            </UserContext.Provider>
            <div className={"text-center md:text-left gap-3 flex items-center flex-col md:flex-row px-8 lg:px-20 py-4 text-2xl justify-between"}>
                <h1>© Bo Hubbard 2024. All rights reserved</h1>
                <div className={"socials flex gap-5 text-2xl"}>
                    <a className={"cursor-pointer"} href={"https://github.com/bubb4rd"}><i className='bx bxl-github'></i></a>
                    <a className={"cursor-pointer"} href={"https://bohubbard.xyz"}><i className='bx bxs-folder-minus'></i></a>
                </div>
            </div>
        </>
    )
}