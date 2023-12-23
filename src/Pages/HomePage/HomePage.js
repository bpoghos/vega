import React from "react";
import { Link } from "react-router-dom"
import { VEGA_PROJECT_ADMIN } from "../../helpers/constants"
import Icon from "../../shared/Icon/Icon"
import addIcon from '../../assets/svg/add.svg'
import postsIcon from '../../assets/svg/fillesIcon.svg'
import { Header } from "../../shared/Header/Header";
import styles from './home.module.css'


const HomePage  = () => {
    return (
        <div className={styles.homeWrapper}>
            <Header icon={false} title={VEGA_PROJECT_ADMIN} />
            <div className={styles.main}>
                <div className={styles.buttonsContainer}>
                    <Link to='/admin/add-post'>
                        <div className={styles.plusButton}>
                            <Icon src={addIcon} />
                        </div>
                    </Link>
                    <Link to='/admin/posts'>
                        <div className={styles.filesButton}>
                            <Icon src={postsIcon} />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HomePage