import React, { useState } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import upload from "../assets/upload.jpg"
import { useContext } from 'react'
import { authDataContext } from '../context/AuthContext'
import axios from "axios"

const Add = () => {
    let [image1, setImage1] = useState(false)
    let [image2, setImage2] = useState(false)
    let [image3, setImage3] = useState(false)
    let [image4, setImage4] = useState(false)

    let [name, setName] = useState("")
    let [description, setDescription] = useState("")
    let [category, setCategory] = useState("Men")
    let [price, setPrice] = useState("")
    let [subCategory, setSubCategory] = useState("TopWear")
    let [bestSeller, setBestSeller] = useState(false)
    let [sizes, setSizes] = useState([])
    const [loading, setLoading] = useState(false);
    const { serverUrl } = useContext(authDataContext)


    const handleAddProduct = async (e) => {
        e.preventDefault();

        if (loading) return; // prevent double clicks
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("price", price);
            formData.append("bestSeller", bestSeller);
            formData.append("sizes", JSON.stringify(sizes));
            formData.append("image1", image1);
            formData.append("image2", image2);
            formData.append("image3", image3);
            formData.append("image4", image4);

            const result = await axios.post(serverUrl + "/api/product/addproduct", formData, { withCredentials: true });

            console.log("✅ Product added:", result.data);

            // Reset form
            setName("");
            setDescription("");
            setImage1(null);
            setImage2(null);
            setImage3(null);
            setImage4(null);
            setPrice("");
            setBestSeller("false");
            setCategory("Men");
            setSubCategory("TopWear");
            setSizes([]);

            alert("✅ Product added successfully!");

        } catch (error) {
            console.error("❌ Error adding product:", error);
        } finally {
            setLoading(false);
        }
    };

    return (


        <div className='w-[100vw] min-h-[100vh] bg-gradient-to-br from-[#141414] to-[#0c2025] text-white overflow-x-hidden relative'>
            <Nav />
            <Sidebar />

            <div className='w-[82%] h-[100%] flex items-center justify-start overflow-x-hidden absolute right-0 bottom-[1%]'>
                <form onSubmit={handleAddProduct} className='w-full md:w-[90%] h-full mt-[70px] flex flex-col gap-[30px] py-[30px] md:px-[60px] pb-[5%]'>


                    {/* Heading */}
                    <div className='w-[400px] h-[50px] text-[25px] md:text-[40px]'>
                        Add Product page
                    </div>

                    {/* Upload Image Title */}
                    <div className='w-[80%] h-[130px] flex items-start justify-center flex-col gap-[10px]'>
                        <p className='text-[20px] md:text-[25px] font-semibold'>Upload Image</p>
                    </div>

                    {/* Upload Image Inputs */}
                    <div className='w-full flex gap-4 flex-wrap'>
                        {/* Image 1 */}
                        <label htmlFor='image1' className='cursor-pointer'>
                            <img
                                src={image1 ? URL.createObjectURL(image1) : upload}
                                alt='Upload'
                                className='w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-lg object-cover bg-white p-2'
                            />
                            <input
                                type='file'
                                id='image1'
                                hidden
                                onChange={(e) => setImage1(e.target.files[0])}
                            />
                        </label>

                        {/* Image 2 */}
                        <label htmlFor='image2' className='cursor-pointer'>
                            <img
                                src={image2 ? URL.createObjectURL(image2) : upload}
                                alt='Upload'
                                className='w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-lg object-cover bg-white p-2'
                            />
                            <input
                                type='file'
                                id='image2'
                                hidden
                                onChange={(e) => setImage2(e.target.files[0])}
                            />
                        </label>

                        {/* Image 3 */}
                        <label htmlFor='image3' className='cursor-pointer'>
                            <img
                                src={image3 ? URL.createObjectURL(image3) : upload}
                                alt='Upload'
                                className='w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-lg object-cover bg-white p-2'
                            />
                            <input
                                type='file'
                                id='image3'
                                hidden
                                onChange={(e) => setImage3(e.target.files[0])}
                            />
                        </label>

                        {/* Image 4 */}
                        <label htmlFor='image4' className='cursor-pointer'>
                            <img
                                src={image4 ? URL.createObjectURL(image4) : upload}
                                alt='Upload'
                                className='w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-lg object-cover bg-white p-2'
                            />
                            <input
                                type='file'
                                id='image4'
                                hidden
                                onChange={(e) => setImage4(e.target.files[0])}
                            />
                        </label>
                    </div>

                    {/* Product Name */}
                    <div className='w-[80%] flex items-start justify-center flex-col gap-[10px]'>
                        <p className='text-[20px] md:text-[25px] font-semibold'>
                            Product Name
                        </p>
                        <input
                            type='text'
                            placeholder='Type here'
                            className='w-[600px] max-w-[98%] h-[40px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px] text-[18px] placeholder:text-[#ffffffc2]'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>

                    {/* Product Description */}
                    <div className='w-[80%] flex items-start justify-center flex-col gap-[10px]'>
                        <p className='text-[20px] md:text-[25px] font-semibold'>
                            Product Description
                        </p>
                        <textarea
                            placeholder='Type here'
                            className='w-[600px] max-w-[98%] h-[100px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px] text-[18px] placeholder:text-[#ffffffc2] py-[10px]'
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                    </div>

                    {/* Category & SubCategory */}
                    <div className='w-[80%] flex items-center gap-[10px] flex-wrap mb-6'>
                        {/* Category */}
                        <div className='md:w-[30%] w-[100%] flex items-start sm:justify-center flex-col gap-[10px] mb-10'>
                            <p className='text-[20px] md:text-[25px] font-semibold w-[100%]'>
                                Product Category
                            </p>
                            <select
                                className='bg-slate-600 w-[60%] px-[10px] py-[7px] rounded-lg hover:border-[#46d1f7] border-[2px]'
                                onChange={(e) => setCategory(e.target.value)}
                                value={category}
                            >
                                <option value="Men">MEN</option>
                                <option value="Women">WOMEN</option>
                                <option value="Kids">KIDS</option>
                            </select>
                        </div>

                        {/* SubCategory */}
                        <div className='md:w-[30%] w-[100%] flex items-start sm:justify-center flex-col gap-[10px] mb-10'>
                            <p className='text-[20px] md:text-[25px] font-semibold w-[100%]'>
                                Sub-category
                            </p>
                            <select
                                className='bg-slate-600 w-[60%] px-[10px] py-[7px] rounded-lg hover:border-[#46d1f7] border-[2px]'
                                onChange={(e) => setSubCategory(e.target.value)}
                                value={subCategory}
                            >
                                <option value="TopWear">TopWear</option>
                                <option value="BottomWear">BottomWear</option>
                                <option value="WinterWear">WinterWear</option>
                            </select>
                        </div>
                    </div>

                    {/* Product Price */}
                    <div className='w-[80%] flex items-start justify-center flex-col gap-[10px]'>
                        <p className='text-[20px] md:text-[25px] font-semibold'>
                            Product Price
                        </p>
                        <input
                            type='number'
                            placeholder='$ 2000'
                            className='w-[600px] max-w-[98%] h-[40px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px] text-[18px] placeholder:text-[#ffffffc2]'
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                        />
                    </div>

                    <div className='w-[80%] flex gap-3 flex-wrap'>
                        {/* SIZE S */}
                        <div
                            className={`px-[20px] py-[7px] rounded-lg text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer ${sizes.includes("S") ? "bg-green-200 text-black border-[#46d1f7]" : "bg-slate-600"}`}
                            onClick={() =>
                                setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])
                            }
                        >
                            S
                        </div>

                        {/* SIZE M */}
                        <div
                            className={`px-[20px] py-[7px] rounded-lg text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer ${sizes.includes("M") ? "bg-green-200 text-black border-[#46d1f7]" : "bg-slate-600"}`}
                            onClick={() =>
                                setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])
                            }
                        >
                            M
                        </div>

                        {/* SIZE L */}
                        <div
                            className={`px-[20px] py-[7px] rounded-lg text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer ${sizes.includes("L") ? "bg-green-200 text-black border-[#46d1f7]" : "bg-slate-600"}`}
                            onClick={() =>
                                setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])
                            }
                        >
                            L
                        </div>

                        {/* SIZE XL */}
                        <div
                            className={`px-[20px] py-[7px] rounded-lg text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer ${sizes.includes("XL") ? "bg-green-200 text-black border-[#46d1f7]" : "bg-slate-600"}`}
                            onClick={() =>
                                setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])
                            }
                        >
                            XL
                        </div>

                        {/* SIZE XXL */}
                        <div
                            className={`px-[20px] py-[7px] rounded-lg text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer ${sizes.includes("XXL") ? "bg-green-200 text-black border-[#46d1f7]" : "bg-slate-600"}`}
                            onClick={() =>
                                setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])
                            }
                        >
                            XXL
                        </div>
                    </div>

                    {/* ✅ Best Seller Checkbox */}
                    <div className='w-[80%] flex items-center gap-[10px]'>
                        <input
                            type='checkbox'
                            id='bestSeller'
                            checked={bestSeller === true}
                            onChange={() => setBestSeller(!bestSeller)}
                            className='w-[20px] h-[20px] cursor-pointer'
                        />

                        <label htmlFor='bestSeller' className='text-[20px] md:text-[25px] font-semibold cursor-pointer'>
                            Mark as Best Seller
                        </label>
                    </div>

                    {/* ✅ Add Product Button */}
                    <button
                        type='submit'
                        disabled={loading}
                        className={`w-[140px] px-[20px] py-[20px] rounded-xl ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-[#65d8f7] cursor-pointer"
                            } flex items-center justify-center gap-[10px] text-black active:bg-state-700 active:text-white border-white`}>
                        {loading ? "Adding..." : "Add Product"}
                    </button>



                </form>
            </div>
        </div>
    )
}

export default Add
