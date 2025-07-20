import React, { createContext } from "react";

export const authDataContext = createContext();

const serverUrl =  "https://ai-backend-f9av.onrender.com"

export function AuthContext({ children }) {
    const value = {
        serverUrl
    };

    return (
        <authDataContext.Provider value={value}>
            {children}
        </authDataContext.Provider>
    );
}
