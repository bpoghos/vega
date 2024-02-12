import { Col, FormControl, FormLabel } from 'react-bootstrap';
import styles from './FormComponents.module.css';
import { FormError } from '../../Pages/AddUpdatePostPage/components/FormError/FormError';
import { useRef } from 'react';


export const Photos = ({ handlePhotoChange, label, category, error, values, removeImage }) => {
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        handlePhotoChange(e, category);
    };

    const handlePlusClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <Col className='d-flex' lg={12}>
            <div className={styles.imageContainer}>
                <FormLabel className={styles.photosLabel}>{label}:</FormLabel>
                <FormControl
                    ref={fileInputRef}
                    onChange={handleChange}
                    type='file'
                    className={styles.formControl}
                    multiple={category !== 'generalPhoto'}
                />
                <div onClick={handlePlusClick} className={styles.plusButton}>+</div>
                {error ? <FormError title={label} /> : null}
                {values.map((image, index) => {
                    const fileToUrl = image instanceof File ? URL.createObjectURL(image) : image.url;
                    return (
                        <div key={index}
                            className={styles.photoFrame}
                        >
                            <div className={styles.removePhoto} onClick={() => removeImage(index, category, image.fileName)}>X</div>
                            <img
                                src={fileToUrl}
                                alt={`Selected ${index + 1}`}
                                className={styles.selectedImage}
                            />
                        </div>
                    )
                })}
            </div>
        </Col>
    );
}
