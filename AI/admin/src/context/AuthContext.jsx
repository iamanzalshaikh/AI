import React, { createContext } from "react";

export const authDataContext = createContext();

const serverUrl = "http://localhost:8000";

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
