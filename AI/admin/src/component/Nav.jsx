import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import logo from "../assets/vcart logo.png";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { adminDataContext } from "../context/AdminContext";

function Nav() {
    const navigate = useNavigate();
    const { serverUrl } = useContext(authDataContext);
    const { adminData, setAdminData } = useContext(adminDataContext); // ✅ Fix: use correct context variable

    const logOut = async () => {
        try {
            let result = await axios.get(`${serverUrl}/api/auth/logOut`, {
                withCredentials: true,
            });
            console.log("✅ Logout:", result.data);

            setAdminData(null); // ✅ Fix: don't call adminData as a function
            navigate("/login");
        } catch (error) {
            console.log("❌ Logout Error:", error);
        }
    };

    return (
        <div className="w-[100vw] h-[70px] bg-[#dcdbdbf8] z-10 fixed top-0 flex items-center justify-between px-[30px] overflow-x-hidden shadow-md shadow-black">
            <div
                className="w-[30%] flex items-center justify-start gap-[10px] cursor-pointer"
                onClick={() => navigate("/")}
            >
                <img src={logo} alt="Vcart Logo" className="h-10 w-auto" />
                <h1 className="text-[25px] text-black font-sans">OneCart</h1>
            </div>

            <button
                onClick={logOut}
                className="text-[15px] hover:border-[2px] border-[#89daea] cursor-pointer bg-[#000000ca] py-[10px] px-[20px] rounded-2xl text-white"
            >
                LogOut
            </button>
        </div>
    );
}

export default Nav;
