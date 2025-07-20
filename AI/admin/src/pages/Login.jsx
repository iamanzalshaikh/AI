import React, { useState, useContext } from 'react';
import vcartLogo from '../assets/vcart logo.png';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios';
import { authDataContext } from '../context/AuthContext'; // ✅ correct import
import { adminDataContext } from '../context/AdminContext';

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { serverUrl } = useContext(authDataContext); // ✅ correct useContext
    let { adminData, setAdminData } = useContext(adminDataContext)
    const { getAdmin } = useContext(adminDataContext); // ✅ Now it's defined

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post(serverUrl + "/api/auth/adminlogin", {
                email,
                password
            }, {
                withCredentials: true
            });

            console.log("✅ Admin Login Successful:", result.data);
            navigate("/");
            getAdmin()
            // console.log(setAdminData.data)

        } catch (error) {
            console.error("❌ Admin Login Error:", error);
        }
    };

    return (
        <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2825] text-white flex flex-col items-center overflow-hidden'>
            <div
                className='w-full h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer group'
                onClick={() => navigate('/')}
            >
                <img
                    src={vcartLogo}
                    alt='VCart Logo'
                    className='w-[50px] h-[50px] object-contain group-hover:scale-110 transition-transform duration-300'
                />
                <h1 className='text-[22px] font-sans group-hover:text-green-400 transition-colors duration-300'>
                    OneCart Admin
                </h1>
            </div>

            <div className='flex flex-col justify-center items-center flex-grow w-full'>
                <div className='text-center'>
                    <h2 className='text-[26px] font-bold'>Admin Login</h2>
                    <p className='text-gray-300 text-[15px] mt-1'>Enter admin credentials to continue</p>
                </div>

                <div className='w-[90%] max-w-[500px] mt-6 bg-[#00000025] border border-[#96969635] backdrop-blur-xl rounded-lg shadow-md p-6 flex flex-col items-center'>
                    <form onSubmit={handleAdminLogin} className='w-full flex flex-col items-center'>
                        <div className='w-[90%] flex flex-col items-center justify-center gap-[15px]'>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Admin email"
                                className="w-full h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold text-white"
                            />
                            <div className='w-full relative'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Admin password"
                                    className="w-full h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold text-white pr-[45px]"
                                />
                                <div
                                    className="absolute top-[50%] right-[15px] transform -translate-y-1/2 cursor-pointer text-black" // ❌ This makes eye white
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className='mt-[20px] w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-[12px] rounded-md shadow-md transition duration-300'
                        >
                            Admin Login
                        </button>

                        <p className='mt-4 text-[14px] text-gray-300'>
                            Not an admin?
                            <span
                                onClick={() => navigate('/login')}
                                className='text-green-400 ml-1 cursor-pointer hover:underline'
                            >
                                Go to User Login
                            </span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
