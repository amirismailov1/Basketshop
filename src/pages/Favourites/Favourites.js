import React, {useContext} from 'react';
import {CustomContext} from "../../Context";
import styles from "./Favourites.module.css";
import {BsHeartFill} from "react-icons/bs";
import {MdKeyboardArrowLeft} from "react-icons/md"
import {Link, useNavigate} from 'react-router-dom'
import cryEmoji from "../../assets/cryEmoji.png";


const Favourites = () => {
    const {favourites,cart,deleteShoesFromCart,addShoesToCart,deleteFavourites} = useContext(CustomContext);

    const navigate = useNavigate();
    return (
        <section>
            {favourites.length ? <><div className={styles.back}>
                <Link to='/' style={{color:'#C8C8C8'}}>
                    <div className={styles.arrow}><MdKeyboardArrowLeft/></div>
                </Link>
                <h2 className={styles.title}>Мои избранные</h2>
            </div>
                <div  className={styles.row}>
                    {
                        favourites.map(item => (

                            <div className={styles.card} key={item.id}>
                                <button className={styles.cardLike} style={{background:'#8BB43C50',color:'#FF8585',border:'none'}} type='button' onClick={()=>{
                                    deleteFavourites(item.id);

                                }}><BsHeartFill/></button>
                                <img className={styles.cardImg} src={item.imageUrl} alt={item.title}/>
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
                                            <button style={{background: 'linear-gradient(180deg, #89F09C 0%, #3CC755 100%)',color:'white'}} className={styles.cardBtn} onClick={()=>deleteShoesFromCart(item.id)} type='button'>✓</button>:
                                            <button className={styles.cardBtn} onClick={()=>addShoesToCart(item.id)} type='button'>+</button>
                                    }
                                </div>
                            </div>



                        ))
                    }
                </div></>

            :
                <div className={styles.empty}>

                    <div className={styles.emptyRow}> <img src={cryEmoji} className={styles.emptySmiley} alt="cry-emoji"/>
                        <h3 className={styles.emptyTitle}>Закладок нет :(</h3>
                        <p className={styles.emptySubtitle}>Вы ничего не добавляли в закладки</p>
                        <button className={styles.emptyBtn} type='button' onClick={()=>navigate('/')}>← Вернуться назад</button></div>

                </div>
            }

        </section>
    );
};

export default Favourites;