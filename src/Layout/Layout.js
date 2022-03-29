import React, {useContext, useEffect, useState} from 'react';
import {CustomContext} from "../Context";
import Header from "./Header/Header";
import {Routes, Route} from 'react-router-dom'
import Home from "../pages/Home/Home";
import Purchases from "../pages/Purchases/Purchases";
import Favourites from "../pages/Favourites/Favourites";
import styles from './Layout.module.css'
import Cart from "./Cart/Cart";
import axios from "axios";
import Order from "../pages/Order/Order";

const Layout = () => {
    const [isCart,setIsCart] = useState(false);
    const {setFavourites,getAllFavourites} = useContext(CustomContext);
    useEffect(()=>{
        axios.get('http://localhost:8080/favourites').then(({data})=>setFavourites(data)).catch((err)=>console.log('Error'))
    },[]);
    return (
        <div className={styles.layout}>
            <Header isCart={isCart} setIsCart={setIsCart}/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/purchases' element={<Purchases/>}/>
                <Route path='/favourites' element={<Favourites/>}/>
                <Route path='/order' element={<Order/>}/>

            </Routes>
            <Cart isCart={isCart} setIsCart={setIsCart}/>
        </div>
    );
};

export default Layout;