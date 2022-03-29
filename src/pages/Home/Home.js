import React, {useEffect, useContext, useState} from 'react';
import {CustomContext} from "../../Context";
import Slider from "./Slider/Slider";
import styles from './Home.module.css'
import {BsHeart,BsHeartFill} from "react-icons/bs";
import {LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

const Home = () => {
    const {getAllShoes,deleteFavourites,shoes,addShoesToCart,cart,deleteShoesFromCart,postFavourites,favourites} = useContext(CustomContext);
    const [search,setSearch]= useState('');
    useEffect(() =>{

        if (search !== '') {
            getAllShoes(search)
        } else{
            getAllShoes()
        }
    },[search]);
    return (
        <section>
            <Slider/>
            <div className={styles.action}>
                <h2 className={styles.title}>Все кроссовки</h2>
                <input onChange={(e)=>setSearch(e.target.value)} placeholder='Поиск...' type="search" className={styles.search}/>
            </div>

            <div className={styles.row}>
                {shoes.map((item)=>(
                    <div className={styles.card} key={item.id}>
                        {favourites.filter(el=>el.id === item.id).length ?
                            <button style={{background:'#8BB43C50',color:'#FF8585',border:'none'}} className={styles.cardLike} type='button'  onClick={()=>{
                                deleteFavourites(item.id);

                            }}><BsHeartFill/></button>:
                            <button className={styles.cardLike} type='button' onClick={()=>{
                                postFavourites(item);

                            }}><BsHeart/></button>

                        }

                        <LazyLoadImage className={styles.cardImg} src={item.imageUrl} alt={item.title} effect='blur'/>

                        <h3 className={styles.cardTitle}>{item.title}</h3>
                        <div className={styles.cardFooter}>
                            <div>
                                <h4 className={styles.cardPriceTitle}>
                                    Цена:
                                </h4>
                                <p className={styles.cardPriceNum}>{item.price.toString().length > 3? `${item.price.toString().slice(0,-3)},${item.price.toString().substr(-3,)}` : item.price} руб</p>
                            </div>


                            {
                                cart.filter(el=>el.id === item.id).length?
                                    <button style={{background: 'linear-gradient(180deg, #89F09C 0%, #3CC755 100%)',color:'white',border:'none'}} className={styles.cardBtn} onClick={()=>deleteShoesFromCart(item.id)} type='button'>✓</button>:
                                    <button className={styles.cardBtn} onClick={()=>addShoesToCart(item.id)} type='button'>+</button>
                            }
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Home;