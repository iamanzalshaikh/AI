import React from "react";
import { useState } from "react";
import { createContext } from "react";
import { useContext } from "react";
import { authDataContext } from "./AuthContext";
import { useEffect } from "react";
import axios from "axios";
export const adminDataContext = createContext()

function AdminContext({ children }) {

    let { serverUrl } = useContext(authDataContext)
    let [adminData, setAdminData] = useState()

    const getAdmin = async () => {

        try {

            let result = await axios.get(serverUrl + "/api/user/getAdmin",
                {
                    withCredentials: true
                }
            )

            setAdminData(result.data)
            console.log(result.data)
        } catch (error) {
            console.log(error)
            setAdminData(null)
        }

    }


    useEffect(() => {
        getAdmin()
    }, [])


    let value = {
        setAdminData,
        adminData,
        getAdmin

    }
    return (
        <adminDataContext.Provider value={value}>
            {children}
        </adminDataContext.Provider>
    );
}

export default AdminContext