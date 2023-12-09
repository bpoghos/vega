import React from 'react'
import { Col, FormControl, FormLabel } from 'react-bootstrap'
import styles from './Photos.module.css'

const Photos = ({ handlePhotoChange, label, category }) => {
    return (
        <Col className='d-flex' lg={12}>
            <div className={styles.imageContainer}>
                <FormLabel className='m-auto me-0 ms-0'>{label}:</FormLabel>
                <FormControl
                    onChange={(e) => handlePhotoChange(e, category)}
                    type='file'
                    style={{
                        // width: '80px',
                        // height: '80px',
                        margin: '10px',
                    }}
                    multiple
                />
                <div style={{
                    // width: '80px',
                    // height: '80px',
                    backgroundColor: '#fff',
                    margin: '10px',
                    borderRadius: '5px'
                }}></div>
            </div>
        </Col>
    )
}

export default Photos
