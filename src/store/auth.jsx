// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const isTokenExpired = (token) => {
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000; // convert to seconds
            return decodedToken.exp < currentTime; // return true if expired
        } catch (error) {
            return false; // if token is invalid or decoding fails, assume not expired
        }
    };


    const storeTokenInLS = (serverToken) => {
        localStorage.setItem("token", serverToken);
        setIsAuthenticated(true);
    };
    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
    };
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && !isTokenExpired(token)) {
            setIsAuthenticated(true);
        } else {
            logout(); // Logout if the token is expired
        }
    }, []);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, storeTokenInLS,logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return authContextValue;
};
