import React from "react";
import { CiBoxList } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
import { TiTickOutline } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';

function Sidebar() {
    const navigate = useNavigate();
    return (
        <div className="w-[18%] min-h-[100vh] border-r-[1px] py-[60px] fixed left-0 top-0">
            <div className="flex flex-col gap-4 pt-[40px] pl-[20%] text-[15px]">
                <div className="flex items-center justify-center md:justify-start gap-3 border border-gray-200 border-r-0 px-3 py-2 cursor-pointer hover:bg-[#2c7b89]">
                    <IoIosAddCircleOutline className="w-[20px] h-[20px]" />
                    <p className="hidden md:block" onClick={() => navigate("/Add")}>Add items   </p>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-3 border border-gray-200 border-r-0 px-3 py-2 cursor-pointer hover:bg-[#2c7b89]">
                    <CiBoxList className="w-[20px] h-[20px]" />
                    <p className="hidden md:block" onClick={() => navigate("/lists")}> List Orders </p>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-3 border border-gray-200 border-r-0 px-3 py-2 cursor-pointer hover:bg-[#2c7b89]">
                    <TiTickOutline className="w-[20px] h-[20px]" />
                    <p className="hidden md:block" onClick={() => navigate("/Orders")}> View Orders   </p>
                </div>
            </div>



        </div>
    )
}

export default Sidebar