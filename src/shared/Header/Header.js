import React from 'react';
import { FaArrowLeft, FaHouse, FaPencil } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import styles from './header.module.css';

export const Header = ({ icon, title, backIcon, edittIcon, param }) => {
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
      <button className={styles.homeBtn} onClick={() => navigate(`/admin/posts/${param}`)}>
        <FaPencil />
      </button>
    </div>
  );

  return (
    <header className={styles.header}>
      <div className={styles.icons}>
        {icon && <HomeIcon />}
        {backIcon && <BackIcon />}
        {edittIcon && <EditIcon />}
      </div>
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
}
