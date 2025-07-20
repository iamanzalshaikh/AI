import { json } from "express"
import { uploadOnCloudinary } from "../config/cloudinary.js"
import Product from "../model/productModel.js"
// import Product from "../model/productModel.js";


export const addProduct = async (req, res) => {
    try {
        console.log("🟨 req.body:", req.body);
        console.log("🟨 req.files:", req.files);
        const { name, description, price, category, subCategory, sizes, bestSeller } = req.body

        if (
            !req.files?.image1 ||
            !req.files?.image2 ||
            !req.files?.image3 ||
            !req.files?.image4
        ) {
            return res.status(400).json({ message: "All 4 images are required." });
        }
        const image1 = await uploadOnCloudinary(req.files.image1[0].path)
        const image2 = await uploadOnCloudinary(req.files.image2[0].path)
        const image3 = await uploadOnCloudinary(req.files.image3[0].path)
        const image4 = await uploadOnCloudinary(req.files.image4[0].path)

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestSeller: bestSeller === "true" ? true : false,
            date: Date.now(),
            image1,
            image2,
            image3,
            image4

        }

        const product = await Product.create(productData)

        res.status(201).json(product)
    } catch (error) {
        return res.status(500).json({ message: `Add product error  ${error}` });

    }
}


// ✅ List Products
export const listProduct = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json(products); // ✅ Send the list, not an error message!
    } catch (error) {
        return res.status(500).json({ message: `List product error: ${error.message}` });
    }
};

// ✅ Remove Product
export const removeProduct = async (req, res) => {
    try {
        let { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({ message: "Product deleted", product });
    } catch (error) {
        console.log('Remove product error', error.message);
        return res.status(500).json({ message: `Remove product error: ${error.message}` });
    }
};
