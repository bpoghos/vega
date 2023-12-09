import React from 'react'
import { FaArrowLeft, FaHouse, FaPencil } from 'react-icons/fa6';
import classes from './header.module.css'
import { Link, useNavigate } from 'react-router-dom';


const Header = ({ icon, title, backIcon, edittIcon, param }) => {

  const navigate = useNavigate()

  return (
    <header className={classes.header}>
      <div className={classes.icons}>
        {
          icon ?
            <div className={classes.homeBtnBox}>
              <Link to='/admin'><button className={classes.homeBtn}><FaHouse /></button></Link>
            </div>
            : null
        }
        {
          backIcon ?
            <div className={classes.arrowBtnBox}>
              <button className={classes.homeBtn} onClick={() => navigate(-1)}><FaArrowLeft /></button>
            </div>
            : null
        }
        {
          edittIcon ?
            <div className={classes.editBtnBox}>
              <button className={classes.homeBtn} onClick={() => navigate(`/admin/posts/${param}`)}><FaPencil /></button>
            </div>
            : null
        }

      </div>

      <h1 className={classes.title}>{title}</h1>
    </header>
  );
}

export default Header