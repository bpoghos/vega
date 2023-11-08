import React from 'react'
import { FaHouse } from 'react-icons/fa6';
import classes from './header.module.css'
import { Link } from 'react-router-dom';


const Header = ({ icon, title }) => {
  return (
    <header className={classes.header}>
      {icon ?
        <div className={classes.homeBtnBox}>
          <Link to='/admin'><button className={classes.homeBtn}><FaHouse /></button></Link>
        </div>
        : null}
      <h1 className={classes.title}>{title}</h1>
    </header>
  );
}

export default Header