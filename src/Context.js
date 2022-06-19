import React, {createContext, useState} from 'react'
import axios from "axios";
export const CustomContext = createContext();
export const Context = (props) =>{
    const [shoes,setShoes] = useState([]);
    const [cart,setCart] = useState([]);
    const [favourites,setFavourites] = useState([]);
    const [orders,setOrders] = useState([]);
    const getAllShoes = (title = '') =>{
        axios(`http://localhost:8080/sneakers?title_like=${title}`)
            .then(({data}) => setShoes(data))
            .catch((err) => console.log('Error'))
    };
    const getAllFavourites = () =>{
        axios.get('http://localhost:8080/favourites').then(({data})=>setFavourites(data)).catch((err)=>console.log('Error'))
    };
    const postFavourites = (item) => {
        axios.post('http://localhost:8080/favourites',{...item})
            .then(() => getAllFavourites());


    };
    const deleteFavourites = (id) =>{
      axios.delete(`http://localhost:8080/favourites/${id}` )
          .then(()=>getAllFavourites())
    };
    const getAllOrders = () =>{
        axios.get('http://localhost:8080/orders').then(({data})=>setOrders(data)).catch((err)=>console.log('Error'))
    };
    const postOrders = (item) => {
        axios.post('http://localhost:8080/orders',{...item})
            .then(() => getAllOrders());



    };


    const deleteOrders = (id) =>{
        axios.delete(`http://localhost:8080/orders/${id}` )
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