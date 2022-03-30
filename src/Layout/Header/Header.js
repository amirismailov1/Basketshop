import React,{useContext} from 'react';
import  {CustomContext} from "../../Context";
import styles from './Header.module.css'
import {MdOutlineLocalGroceryStore} from 'react-icons/md'
import {AiOutlineHeart} from 'react-icons/ai'
import {BiUserCircle} from 'react-icons/bi'
import Logo from '../../assets/logo.png'
import {Link} from 'react-router-dom'

const Header = ({isCart,setIsCart}) => {
    const {header,headerNav,headerSup,headerLeft,headerRight,headerCart,headerTitle,headerSubtitle,headerPrice} = styles;
    const {cart,favourites} = useContext(CustomContext);
    return (
        <header className={header}>
            <nav className={headerNav}>
                <Link to='/'><div className={headerLeft}>
                    <img src={Logo} alt=""/>

                    <div>
                        <h1 className={headerTitle}>REACT SNEAKERS</h1>
                        <p className={headerSubtitle}>Магазин лучших кроссовок</p>
                    </div>
                </div ></Link>

                <ul className={headerRight}>
                    <li className={headerCart}>
                        <span style={{cursor:'pointer'}} onClick={()=>setIsCart(true)}><MdOutlineLocalGroceryStore/></span>
                        <span className={headerPrice}>
                            {cart.reduce((acc,rec)=> acc + rec.price , 0)} руб.
                        </span>
                    </li>
                   <li><Link to='/favourites' style={{color:'9B9B9B'}}>
                       <AiOutlineHeart/>
                       <sup className={headerSup}>{favourites.length > 9? '9+' : favourites.length? favourites.length: ''}</sup>
                   </Link></li>
                  <li> <Link to='/purchases' style={{color:'black'}}><BiUserCircle/></Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;