import React from "react";
import { Link } from "react-router-dom"
import { VEGA_PROJECT_ADMIN } from "../../helpers/constants"
import Header from "../../shared"
import classes from './home.module.css'
import Icon from "../../shared/Icon/Icon"
import addIcon from '../../assets/svg/add.svg'
import postsIcon from '../../assets/svg/fillesIcon.svg'


const HomePage = () => {
    return (
        <div style={{ width: '100%', height: '100vh', background: '#000' }}>
            <Header icon={false} title={VEGA_PROJECT_ADMIN} />
            <div className={classes.main}>
                <div className={classes.buttonsContainer}>
                    <Link to='/admin/add-post'>
                        <div className={classes.plusButton}>
                            <Icon src={addIcon} />
                        </div>
                    </Link>
                    <Link to='/admin/posts'>
                        <div className={classes.filesButton}>
                            <Icon src={postsIcon} />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HomePage