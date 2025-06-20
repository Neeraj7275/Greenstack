import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import {Toaster} from 'react-hot-toast'
import Footer from './components/Footer'
import { useAppContext } from './context/AppContext'
import Login from './components/Login'
import AllProduct from './pages/AllProduct'
import ProductCategory from './pages/ProductCategory'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import AddAddress from './pages/AddAddress'
import MyOrders from './pages/MyOrders'
import SellerLogin from './components/seller/SellerLogin'
import SellerLayout from './pages/seller/SellerLayout'
import AddProduct from './pages/seller/AddProduct'
import Orders from './pages/seller/Orders'
import ProductList from './pages/seller/ProductList'
import Loading from './components/Loading'

const App = () => {
  // .includes("seller"): This is a simple check on the text you got from .pathname. It asks, "Does this path string contain the word 'seller' anywhere within it?" It will give you a true or false answer.
  const isSellerPath = useLocation().pathname.includes("seller");
  const {showUserLogin, isSeller} = useAppContext();
  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>
      {isSellerPath ? null : <Navbar/>}
      {showUserLogin ? <Login/> : null}
      <Toaster/>
      <div className={`${isSellerPath}? "" : "px-6 md:px-16 lg:px-24 xl:px-32"`}>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/products' element={<AllProduct/>}/>
          <Route path='/products/:category' element={<ProductCategory/>}/>
          <Route path='/products/:category/:id' element={<ProductDetail/>}/>
           <Route path='/cart' element={<Cart/>}/>
           <Route path='/add-address' element={<AddAddress/>}/>
           <Route path='/my-orders' element={<MyOrders/>}/>
           <Route path='/loader' element={<Loading/>}/>
           <Route path='/seller' element={isSeller ? <SellerLayout/> : <SellerLogin/>}>
           <Route index element={isSeller ? <AddProduct/> : null}/>
           <Route path='product-list' element={<ProductList/>}/>
           <Route path='orders' element={<Orders/>}/>
           </Route>
        </Routes>
      </div>
      {!isSellerPath && <Footer/>}
    </div>
  )
}

export default App