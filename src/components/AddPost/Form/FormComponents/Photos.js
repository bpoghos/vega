import React, { useState } from 'react';
import { Col, FormControl, FormLabel } from 'react-bootstrap';
import styles from './Photos.module.css';

const Photos = ({ handlePhotoChange, label, category }) => {
    const [selectedImages, setSelectedImages] = useState([]);

    const handleChange = (e) => {
        handlePhotoChange(e, category);

        const files = e.target.files;
        const imagesArray = Array.from(files).map(file => URL.createObjectURL(file));
        setSelectedImages((prevState) => [...prevState, ...imagesArray]);
    };

    return (
        <Col className='d-flex' lg={12}>
            <div className={styles.imageContainer}>
                <FormLabel className='m-auto me-0 ms-0'>{label}:</FormLabel>
                <FormControl
                    onChange={handleChange}
                    type='file'
                    style={{
                        margin: '10px',
                    }}
                    multiple
                />
                {selectedImages.map((image, index) => (
                    <div key={index} style={{
                        backgroundColor: '#fff',
                        margin: '10px',
                        borderRadius: '5px',
                    }}>
                        <img
                            src={image}
                            alt={`Selected ${index + 1}`}
                            style={{
                                maxHeight: '100px',
                                borderRadius: '5px',
                            }}
                        />
                    </div>
                ))}
            </div>
        </Col>
    );
}

export default Photos;
