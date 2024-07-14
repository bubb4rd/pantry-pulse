import SearchContext from "../SearchContext";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import SignupPage from "../../pages/SignupPage";
import UserContext from "../UserContext";
import {useContext} from "react";
import MainPage from "../../pages/MainPage";

export default function SignedOut() {
    const {user, setUser} = useContext(UserContext);
    return (
        <UserContext.Provider value={{user, setUser}}>
                <BrowserRouter>
                    <Routes>
                        <Route index element={<MainPage/>}/>
                        <Route path={"login"} element={<LoginPage/>}/>
                        <Route path={"signup"} element={<SignupPage/>}/>
                    </Routes>
                </BrowserRouter>
        </UserContext.Provider>
    )
}