import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({children})=>{
    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState({});


    // fetch all products
    const fetchProducts = async ()=>{
        // setProducts(dummyProducts);
        try {
            const {data} = await axios.get("/api/product/list");
            if(data.success){
                setProducts(data.products);
            }else{
                toast.error(data.message);
            }
        } catch (error) {
             toast.error(error.message);
        }
    }

    // fetch seller is login or logout
    const fetchSeller = async()=>{
     try {
           const {data} = await axios.get("/api/seller/is-authSeller");
           if(data.success){
               setIsSeller(true);
           }else{
               setIsSeller(false);
           }
     } catch (error) {
         setIsSeller(false);
     }
    }

     // fetch user is login or logout, user cart,user data
     const fetchUser = async()=>{
        try {
            const {data} = await axios.get("/api/user/is-auth");
            console.log(data.user);
            console.log(data.success);
            
            
            if(data.success){
                setUser(data.user);
                setCartItems(data.user.cartItems);
            }
        } catch (error) {
            setUser(null);
        }
     }

    // add product to cart
    const addToCart = (itemId)=>{
        let cartData = structuredClone(cartItems);
        // structuredClone(cartItems): This is a built-in JavaScript function that creates a deep copy of the cartItems variable. We're assuming cartItems is an object or an array that holds the current items in the cart. A deep copy ensures that any changes we make to cartData won't directly affect the original cartItems until we explicitly update it.

        if(cartData[itemId]){
            cartData[itemId] += 1;
        }else{
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Added to Cart");
    }

    // update cart item quantity 
    const updateCartItem = (itemId,quantity)=>{
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success("cart updated");
    }

    // remove product from cart
    const removeFromCart = (itemId)=>{
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            cartData[itemId] -=1;
            if(cartData[itemId] === 0){
                delete cartData[itemId];
            }
        }
        toast.success("removed from cart");
        setCartItems(cartData);
    }

    // get cart item count
    const getCartCount = ()=>{
        let totalCount = 0;
        for(const item in cartItems){
            totalCount+= cartItems[item];
        }
        return totalCount;
    }

    // get cart total amount
    const getCartAmount = ()=>{
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product)=>product._id === items);
            if(cartItems[items]>0){
                totalAmount += itemInfo.offerPrice * cartItems[items]
            }
        }
        return Math.floor(totalAmount * 100)/100;
    }

    // fetch product on every render

    useEffect(() => {
        fetchUser();
        fetchProducts();
        fetchSeller();
    }, [])

// update database cartItems
    useEffect(() => {
        const updateCart = async()=>{
            try {
                const {data} = await axios.post("/api/cart/update",{cartItems})

                if(!data.success){
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error(error.message)
            }

        }
        if(user){
            updateCart();
        }
    }, [cartItems])
    
    


    const value = {navigate, user, setUser, isSeller, setIsSeller,showUserLogin, setShowUserLogin, products, currency, cartItems, addToCart, updateCartItem, removeFromCart, searchQuery, setSearchQuery, getCartAmount, getCartCount, axios, fetchProducts, setCartItems };
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = ()=>{
    return useContext(AppContext)
}