import React, {createContext, useState} from 'react'
import axios from "axios";
export const CustomContext = createContext();
export const Context = (props) =>{
    const [shoes,setShoes] = useState([]);
    const [cart,setCart] = useState([]);
    const [favourites,setFavourites] = useState([]);
    const [orders,setOrders] = useState([]);
    const getAllShoes = (title = '') =>{
        axios(`https://basketshop12.herokuapp.com/api/sneakers?title_like=${title}`)
            .then(({data}) => setShoes(data))
            .catch((err) => console.log('Error'))
    };
    const getAllFavourites = () =>{
        axios.get('https://basketshop12.herokuapp.com/api/favourites').then(({data})=>setFavourites(data)).catch((err)=>console.log('Error'))
    };
    const postFavourites = (item) => {
        axios.post('https://basketshop12.herokuapp.com/api/favourites',{...item})
            .then(() => getAllFavourites());


    };
    const deleteFavourites = (id) =>{
      axios.delete(`https://basketshop12.herokuapp.com/api/favourites/${id}` )
          .then(()=>getAllFavourites())
    };
    const getAllOrders = () =>{
        axios.get('https://basketshop12.herokuapp.com/api/orders').then(({data})=>setOrders(data)).catch((err)=>console.log('Error'))
    };
    const postOrders = (item) => {
        axios.post('https://basketshop12.herokuapp.com/api/orders',{...item})
            .then(() => getAllOrders());



    };


    const deleteOrders = (id) =>{
        axios.delete(`https://basketshop12.herokuapp.com/api/orders/${id}` )
            .then(()=>getAllOrders())
    };

    const addShoesToCart = (id) => {
        let idx = shoes.findIndex((item)=>item.id === id);
        setCart([...cart,shoes[idx]])
    };
    const deleteShoesFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id))
    };
    const value = {
        shoes,
        setShoes,
        getAllShoes,
        cart,
        setCart,
        addShoesToCart,
        deleteShoesFromCart,
        postFavourites,
        favourites,
        setFavourites,
        deleteFavourites,
        getAllOrders,
        postOrders,
        deleteOrders,
        orders
    };

  return <CustomContext.Provider value={value}>
      {props.children}
  </CustomContext.Provider>
};