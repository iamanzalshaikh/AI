import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Loading from "../component/Loading";
import { userDataContext } from "../context/UserContext";
import { toast } from 'react-toastify';

export const ShopDataContext = createContext();

function ShopContext({ children }) {
    const [products, setProducts] = useState([]);
    const { serverUrl } = useContext(AuthContext);
    const { userdata } = useContext(userDataContext);
    let [search, setSearch] = useState('');
    let [showSearch, setShowSearch] = useState([false]);
    let currency = "₹";
    let delivery_fee = 50;

    // ✅ fixed initial state from [] to {}
    let [cartItem, setCartItem] = useState({});

    const [loading, setLoading] = useState(false);

    const getProducts = async () => {
        try {
            let result = await axios.get(serverUrl + "/api/product/list", {
                withCredentials: true,
            });
            console.log(result.data);
            setProducts(result.data);
        } catch (error) {
            console.log(error);
        }
    };


    const addtoCart = async (itemId, size) => {
        console.log("🛒 itemId:", itemId);
        console.log("📏 size:", size);
        console.log("🧺 cartItem (before):", cartItem);

        const cartCopy = { ...cartItem };

        // 🛡️ Safely initialize nested keys
        if (!cartCopy[itemId]) {
            cartCopy[itemId] = {}; // create object if itemId doesn't exist
        }

        if (!cartCopy[itemId][size]) {
            cartCopy[itemId][size] = 0; // initialize size count
        }

        cartCopy[itemId][size] += 1;

        // 🔄 Update frontend cart
        setCartItem(cartCopy);

        try {
            // 📨 Send update to backend
            const res = await axios.post(
                serverUrl + "/api/cart/add",
                { itemId, size },
                { withCredentials: true }
            );
            console.log("🟢", res.data);
        } catch (error) {
            console.log("🔴 Error adding to cart:", error);
        }

        console.log("✅ Updated cartItem:", cartCopy);
    };


    const getUserCart = async () => {
        try {
            const result = await axios.post(serverUrl + '/api/cart/get', {}, { withCredentials: true });
            console.log("🛒 getUserCart result:", result.data);
            setCartItem(result.data);
        } catch (error) {
            console.log("❌ getUserCart error:", error);
        }
    };

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItem);
        cartData[itemId][size] = quantity;
        setCartItem(cartData);

        if (userdata) {
            try {
                await axios.post(serverUrl + "/api/cart/update", { itemId, size, quantity }, { withCredentials: true });
            } catch (error) {
                console.log("❌ updateQuantity error:", error);
            }
        }
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItem) {
            for (const item in cartItem[items]) {
                try {
                    if (cartItem[items][item] > 0) {
                        totalCount += cartItem[items][item];
                    }
                } catch (error) {
                    console.log("getCartCount error:", error);
                }
            }
        }
        return totalCount;
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItem) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItem[items]) {
                try {
                    if (cartItem[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItem[items][item];
                    }
                } catch (error) {
                    console.log("getCartAmount error:", error);
                }
            }
        }
        return totalAmount;
    };

    useEffect(() => {
        getProducts();
        getUserCart();
    }, []);

    const value = {
        products,
        currency,
        delivery_fee,
        getProducts,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItem,
        addtoCart,
        getCartCount,
        setCartItem,
        updateQuantity,
        getCartAmount,
        Loading
    };

    return (
        <ShopDataContext.Provider value={value}>
            {children}
        </ShopDataContext.Provider>
    );
}

export default ShopContext;
