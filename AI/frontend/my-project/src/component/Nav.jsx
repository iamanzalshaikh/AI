import React, { useContext, useState } from 'react';
import logo from '../assets/vcart logo.png'; 

import { IoSearchCircleOutline, IoSearchCircleSharp } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { HiOutlineCollection } from "react-icons/hi";
import { MdContacts } from "react-icons/md";
import { userDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { ShopDataContext } from '../context/ShopContext';

function Nav() {
    const { getCurrentUser, userdata, setUserData } = useContext(userDataContext);
    const { serverUrl } = useContext(AuthContext);
    const { showSearch, setShowSearch, search, setSearch, getCartCount } = useContext(ShopDataContext);
    const [showProfile, setShowProfile] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
            setUserData(null);
            setShowProfile(false);
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='w-[100vw] h-[70px] bg-[#ecfafaec] z-10 fixed top-0 flex items-center justify-between px-[30px] shadow-md shadow-black'>
            <div className='w-[20%] lg:w-[30%] flex items-center gap-[10px]'>
                <img src={logo} alt="logo" className='w-[30px]' />
                <h1 className='text-[25px] text-black font-sans'>OneCart</h1>
            </div>

            <div className='w-[50%] lg:w-[40%] hidden md:flex'>
                <ul className='flex items-center justify-center gap-[19px] text-white'>
                    <li className='text-[15px] hover:bg-slate-500 bg-[#000000c9] py-[10px] px-[20px] rounded-2xl cursor-pointer' onClick={() => navigate("/")}>HOME</li>
                    <li className='text-[15px] hover:bg-slate-500 bg-[#000000c9] py-[10px] px-[20px] rounded-2xl cursor-pointer' onClick={() => navigate("/collections")}>COLLECTIONS</li>
                    <li className='text-[15px] hover:bg-slate-500 bg-[#000000c9] py-[10px] px-[20px] rounded-2xl cursor-pointer' onClick={() => navigate("/about")}>ABOUT</li>
                    <li className='text-[15px] hover:bg-slate-500 bg-[#000000c9] py-[10px] px-[20px] rounded-2xl cursor-pointer' onClick={() => navigate("/contact")}>CONTACT</li>
                </ul>
            </div>

            <div className='w-[30%] flex items-center justify-end gap-[20px]'>
                {!showSearch ? (
                    <IoSearchCircleOutline className='w-[38px] h-[38px] text-black cursor-pointer' onClick={() => { setShowSearch(true); navigate("/collection") }} />
                ) : (
                    <IoSearchCircleSharp className='w-[38px] h-[38px] text-black cursor-pointer' onClick={() => setShowSearch(false)} />
                )}

                {!userdata ? (
                    <FaCircleUser className='w-[29px] h-[29px] text-black cursor-pointer' onClick={() => setShowProfile(prev => !prev)} />
                ) : (
                    <div className='w-[30px] h-[30px] bg-black text-white rounded-full flex items-center justify-center cursor-pointer'
                        onClick={() => setShowProfile(prev => !prev)}>
                        {userdata?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                )}

                <MdOutlineShoppingCart className='w-[30px] h-[30px] text-black cursor-pointer hidden md:block' onClick={() => navigate("/cart")} />
                <p className='absolute w-[18px] h-[18px] items-center justify-center bg-black px-[5px] py-[2px] text-white rounded-full text-[9px] top-[10px] right-[23px] hidden md:block'>
                    {getCartCount()}
                </p>
            </div>

            {/* Search Input */}
            {showSearch && (
                <div className='w-full h-[80px] bg-[#d8f6f9dd] absolute top-[100%] left-0 flex items-center justify-center'>
                    <input
                        type="text"
                        className='lg:w-[50%] w-[80%] h-[60%] bg-[#233533] rounded-[30px] px-[50px] placeholder:text-white text-white text-[18px]'
                        placeholder='Search Here'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            )}

            {/* Profile Dropdown */}
            {showProfile && (
                <div className='absolute w-[220px] h-[150px] bg-[#000000d7] top-[110%] right-[4%] border border-[#aaa9a9] rounded-[10px] z-10'>
                    <ul className='w-full h-full flex flex-col justify-around py-2 text-white text-[17px]'>
                        {!userdata && (
                            <li className='hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={() => {
                                navigate("/login");
                                setShowProfile(false);
                            }}>
                                Login
                            </li>
                        )}
                        {userdata && (
                            <li className='hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={handleLogout}>
                                Logout
                            </li>
                        )}
                        <li className='hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={() => {
                            navigate("/order");
                            setShowProfile(false);
                        }}>
                            Orders
                        </li>
                        <li className='hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={() => {
                            navigate("/about");
                            setShowProfile(false);
                        }}>
                            About
                        </li>
                    </ul>
                </div>
            )}

            {/* Mobile Bottom Nav */}
            <div className='w-full h-[90px] flex items-center justify-between px-[20px] text-[12px] fixed bottom-0 left-0 bg-[#191818] md:hidden'>
                <button className='text-white flex flex-col items-center gap-[2px]' onClick={() => navigate("/")}>
                    <IoMdHome className='w-[28px] h-[28px]' /> Home
                </button>
                <button className='text-white flex flex-col items-center gap-[2px]' onClick={() => navigate("/collections")}>
                    <HiOutlineCollection className='w-[28px] h-[28px]' /> Collections
                </button>
                <button className='text-white flex flex-col items-center gap-[2px]' onClick={() => navigate("/contact")}>
                    <MdContacts className='w-[28px] h-[28px]' /> Contact
                </button>
                <button className='text-white flex flex-col items-center gap-[2px]' onClick={() => navigate("/cart")}>
                    <MdOutlineShoppingCart className='w-[28px] h-[28px]' /> Cart
                </button>
                <p className='absolute w-[18px] h-[18px] flex items-center justify-center bg-white text-black font-semibold rounded-full text-[9px] top-[8px] right-[18px]'>
                    {getCartCount()}
                </p>
            </div>
        </div>
    );
}

export default Nav;
