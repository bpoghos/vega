import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaHouse, FaPencil } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import styles from './header.module.css';
import { fetchPostById } from '../../services/posts';

export const Header = ({ icon, title, backIcon, editIcon, param }) => {
  const navigate = useNavigate();


  const HomeIcon = () => (
    <div className={styles.homeBtnBox}>
      <Link to='/admin'><button className={styles.homeBtn}>
        <FaHouse />
      </button>
      </Link>
    </div>
  );

  const BackIcon = () => (
    <div className={styles.arrowBtnBox}>
      <button className={styles.homeBtn} onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </button>
    </div>
  );

  const EditIcon = () => (
    <div className={styles.editBtnBox}>
      <button className={styles.homeBtn} onClick={() => navigate(`/admin/edit-post/{post._id}`)}>
        <FaPencil />
      </button>
    </div>
  );

  return (
    <header className={styles.header}>
      <div className={styles.icons}>
        {backIcon && <BackIcon />}
        {icon && <HomeIcon />}
        {editIcon && <EditIcon />}
      </div>
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
}
