import React from 'react'
import styles from './Loading.module.css'

export const Loading = () => {
    return (
        <div className={styles.overlay}>
            <div className={styles.loader}></div>
        </div>
    )
}