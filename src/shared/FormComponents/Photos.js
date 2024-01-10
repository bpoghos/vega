import React, { useState } from 'react';
import { Col, FormControl, FormLabel } from 'react-bootstrap';
import styles from './FormComponents.module.css';
import { FormError } from '../../Pages/AddUpdatePostPage/components/FormError/FormError';
import { useEffect, useRef } from 'react';

export const Photos = ({ handlePhotoChange, label, category, error, values, removeImage }) => {

    const [selectedImages, setSelectedImages] = useState([]);

    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        handlePhotoChange(e, category);
    };

    const removeHandle = (index, category) => {
        removeImage(index, category)
        if (category === 'generalPhoto') {
            setSelectedImages([]);
        } else {
            setSelectedImages((prevState) => prevState.filter((_, i) => i !== index));
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }

    // useEffect(() => {
    //     if (values[category] && values[category] instanceof File) {
    //         setSelectedImages([URL.createObjectURL(values[category])]);
    //     } else if (values[category] && values[category] instanceof Blob) {
    //         const imageBlob = new Blob([new Uint8Array(values[category])], { type: 'image/png' });
    //         const imageUrl = URL.createObjectURL(imageBlob);
    //         setSelectedImages([imageUrl]);
    //     } else if (values[category] && values[category].length) {
    //         const convertedImages = values[category].map((d) => {
    //             if (d?.length > 100) {
    //                 const imageBlob = new Blob([new Uint8Array(d)], { type: 'image/png' });
    //                 const imageUrl = URL.createObjectURL(imageBlob);
    //                 return imageUrl;
    //             } else {
    //                 return URL.createObjectURL(d);
    //             }
    //         });
    //         setSelectedImages(convertedImages);
    //     }
    // }, [values])

    return (
        <Col className='d-flex' lg={12}>
            <div className={styles.imageContainer}>
                <FormLabel className='m-auto me-0 ms-0'>{label}:</FormLabel>
                <FormControl
                    ref={fileInputRef}
                    onChange={handleChange}
                    type='file'
                    style={{
                        margin: '10px',
                    }}
                    multiple={category !== 'generalPhoto'}
                />
                {error ? <FormError title={label} /> : null}
                {values.map((image, index) => (
                    <div key={index} style={{
                        backgroundColor: '#fff',
                        margin: '10px',
                        borderRadius: '5px',
                    }}>
                        <div className={styles.removePhoto} onClick={() => removeHandle(index, category)}>X</div>
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
