import Login from "../components/Login";
import Navbar from "../components/Navbar";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";

export default function LoginPage() {
    return (
        <>
            <Navbar/>
            <Login/>
        </>
    );
}