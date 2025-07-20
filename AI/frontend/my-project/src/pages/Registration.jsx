import React, { useState, useContext } from 'react';
import vcartLogo from '../assets/vcart logo.png';
import { useNavigate } from 'react-router-dom';
import googleLogo from "../assets/google-logo-transparent-background-free-png.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios';
import { AuthContext } from "../context/AuthContext";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/Firebase';
import { userDataContext } from '../context/UserContext';

const Registration = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { serverUrl } = useContext(AuthContext);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // ✅ Destructure properly from context
    const { getCurrentUser } = useContext(userDataContext);

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post(serverUrl + "/api/auth/registration", {
                name, email, password
            }, {
                withCredentials: true
            });

            await getCurrentUser();  // ✅ call context function properly
            navigate("/");           // ✅ now navigate
            console.log(result.data);

        } catch (error) {
            console.error(error);
            alert("Registration failed, please try again.");
        }
    };

    const googleSignup = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            if (!result || !result.user) return;

            const name = result.user.displayName;
            const email = result.user.email;

            await axios.post(serverUrl + "/api/auth/googlelogin", {
                name,
                email,
            }, {
                withCredentials: true,
            });

            await getCurrentUser();
            navigate("/");

        } catch (error) {
            console.error("Google sign-in error:", error);
        }
    };

    return (
        <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2825] text-white flex flex-col items-center overflow-hidden'>
            {/* Top Nav */}
            <div
                className='w-full h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer group'
                onClick={() => navigate('/')}
            >
                <img src={vcartLogo} alt='VCart Logo' className='w-[50px] h-[50px] object-contain group-hover:scale-110 transition-transform duration-300' />
                <h1 className='text-[22px] font-sans group-hover:text-green-400 transition-colors duration-300'>
                    OneCart
                </h1>
            </div>

            {/* Registration Box */}
            <div className='flex flex-col justify-center items-center flex-grow w-full'>
                <div className='text-center'>
                    <h2 className='text-[26px] font-bold'>Registration Page</h2>
                    <p className='text-gray-300 text-[15px] mt-1'>Welcome to OneCart, Place your order</p>
                </div>

                <div className='w-[90%] max-w-[500px] mt-6 bg-[#00000025] border border-[#96969635] backdrop-blur-xl rounded-lg shadow-md p-6 flex flex-col items-center'>
                    <form onSubmit={handleSignUp} className='w-full flex flex-col items-center'>

                        {/* Google Register */}
                        <div className='w-[90%] bg-[#4265cae] rounded-lg flex items-center justify-center gap-[10px] py-[14px] cursor-pointer' onClick={googleSignup}>
                            <img src={googleLogo} alt="Google Logo" className='w-[25px] h-[25px]' />
                            <span className='text-[15px] font-medium'>Registration with Google</span>
                        </div>

                        {/* Divider */}
                        <div className='w-full my-4 flex items-center'>
                            <div className='flex-grow h-[1px] bg-[#96969635]'></div>
                            <span className='mx-3 text-gray-400'>OR</span>
                            <div className='flex-grow h-[1px] bg-[#96969635]'></div>
                        </div>

                        {/* Inputs */}
                        <div className='w-[90%] flex flex-col items-center justify-center gap-[15px]'>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                className="w-full h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold text-white"
                                required
                            />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold text-white"
                                required
                            />
                            <div className='w-full relative'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold text-white pr-[45px]"
                                    required
                                />
                                <div
                                    className="absolute top-[50%] right-[15px] transform -translate-y-1/2 cursor-pointer text-white"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className='mt-[20px] w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-[12px] rounded-md shadow-md transition duration-300'
                        >
                            Create Account
                        </button>

                        {/* Login Link */}
                        <p className='mt-4 text-[14px] text-gray-300'>
                            Already have an account?
                            <span
                                onClick={() => navigate('/login')}
                                className='text-green-400 ml-1 cursor-pointer hover:underline'
                            >
                                Login
                            </span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Registration;
