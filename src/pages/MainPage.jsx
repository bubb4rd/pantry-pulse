import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Search from "../components/Search";
import LoginCTA from "../components/LoginCTA";
import Contact from "../components/Contact";
import {Outlet} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import SearchPage from "../components/SearchPage";
import SearchFiltersContext from "../components/SearchFiltersContext";
import userContext from "../components/UserContext";
import QueryContext from "../components/QueryContext";
import Nutrition from "../components/Nutrition";

export default function MainPage() {
    const {user} = useContext(userContext);
    const [searchFilters, setSearchFilters] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    return (
        <>
            <Navbar/>
            <Hero/>
            <Features/>
            <QueryContext.Provider value={{searchQuery, setSearchQuery}}>
                <SearchFiltersContext.Provider value={{searchFilters, setSearchFilters}}>
                    <Search/>
                </SearchFiltersContext.Provider>
            </QueryContext.Provider>
            {
                (user?.loggedIn)
                ? ""
                    : <LoginCTA/>
            }
            <Contact/>
        </>
    );
}