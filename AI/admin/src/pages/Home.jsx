

import React from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'


const Home = () => {
    return (
        <div className='w-[100vw] h-[100vh] bg-gradient-to-r from-[#141414] to-[#0c2025] text-white relative'>
            <Nav />
            <Sidebar />
        </div>

    )
}

export default Home
