import React from 'react'
import { Col, FormControl, FormLabel, Row } from 'react-bootstrap'
import { FormError } from '../../Pages/AddUpdatePostPage/components/FormError/FormError'

import styles from "./FormComponents.module.css"

export const TextInput = ({ label, category, handleChange, error, values }) => {
    return (
        <Row>
            <Col lg={4}></Col>
            <Col lg={4} className="d-flex align-items-center justify-content-end mb-4">
                <FormLabel className="me-3 m-0">{label}:</FormLabel>
                <FormControl
                    value={values[category]}
                    className={styles.textInput}
                    type="text"
                    name={label}
                    onChange={(e) => handleChange(e, category)}
                    isInvalid={!!error}
                />
                {error ? <FormError title={label} /> : null}
            </Col>
            <Col lg={4}></Col>
        </Row>

    )
}