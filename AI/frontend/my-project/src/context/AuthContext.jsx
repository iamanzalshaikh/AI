import React, { createContext } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    let serverUrl = "https://ai-backend-f9av.onrender.com";

    let value = {
        serverUrl
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
