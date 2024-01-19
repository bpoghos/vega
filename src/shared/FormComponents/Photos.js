import { Col, FormControl, FormLabel } from 'react-bootstrap';
import styles from './FormComponents.module.css';
import { FormError } from '../../Pages/AddUpdatePostPage/components/FormError/FormError';
import { useRef } from 'react';

export const Photos = ({ handlePhotoChange, label, category, error, values, removeImage }) => {
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        handlePhotoChange(e, category);
    };


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
                {values.map((image, index) => {
                    const fileToUrl = image instanceof File ? URL.createObjectURL(image) : image.url;
                    return (
                        <div key={index} style={{
                            backgroundColor: '#fff',
                            margin: '10px',
                            borderRadius: '5px',
                        }}>
                            <div className={styles.removePhoto} onClick={() => removeImage(index, category, image.fileName)}>X</div>
                            <img
                                src={fileToUrl}
                                alt={`Selected ${index + 1}`}
                                style={{
                                    maxHeight: '100px',
                                    borderRadius: '5px',
                                }}
                            />
                        </div>
                    )
                })}
            </div>
        </Col>
    );
}
