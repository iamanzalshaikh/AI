import React, { useState, useEffect, useContext } from 'react';
import Nav from '../component/Nav';
import Sidebar from '../component/Sidebar';
import { authDataContext } from '../context/AuthContext';
import axios from "axios";
import { RxCross2 } from "react-icons/rx"; // Cross icon

const Lists = () => {
    const [list, setList] = useState([]);
    const { serverUrl } = useContext(authDataContext);

    const fetchList = async () => {
        try {
            let result = await axios.get(serverUrl + "/api/product/list", {
                withCredentials: true,
            });
            setList(result.data);
            console.log("Fetched products: ", result.data);
        } catch (error) {
            console.log("Fetch error: ", error);
        }
    };

    const removeList = async (id) => {
        try {
            await axios.post(`${serverUrl}/api/product/remove/${id}`, {}, {
                withCredentials: true
            });
            // Refresh list after deletion
            fetchList();
        } catch (error) {
            console.log("Delete error: ", error);
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className='w-[100vw] min-h-[100vh] bg-gradient-to-br from-[#141414] to-[#0c2025] text-white'>
            <Nav />
            <div className='w-full h-full flex items-start'>
                <Sidebar />

                <div className='w-full lg:ml-[320px] md:ml-[230px] mt-[70px] px-4 flex flex-col gap-[30px]'>
                    <div className='text-[28px] md:text-[40px] mb-[20px] text-white'>
                        All List Product
                    </div>

                    {
                        list?.length > 0 ? (
                            list.map((item, index) => (
                                <div
                                    key={item._id || index}
                                    className='w-full md:h-[120px] h-auto bg-slate-600 rounded-xl p-4 flex items-center justify-between gap-4'
                                >
                                    <div className='flex items-center gap-4'>
                                        <img
                                            src={item.image1}
                                            alt={item.name}
                                            className='w-[60px] md:w-[120px] h-[80px] md:h-[100px] rounded-lg object-cover'
                                        />
                                        <div className='flex flex-col'>
                                            <h3 className='text-xl font-bold'>{item.name}</h3>
                                            <p className='text-sm text-gray-300'>{item.description}</p>
                                            <p className='text-sm'>₹ {item.price}</p>
                                            <p className='text-sm'>Sizes: {item.sizes.join(", ")}</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => removeList(item._id)}
                                        className='text-white hover:text-red-500 text-2xl'
                                    >
                                        <RxCross2 />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className='text-white text-lg'>No product available.</div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Lists;
