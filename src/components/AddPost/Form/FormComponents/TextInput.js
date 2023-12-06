import React from 'react'
import { Col, FormControl, FormLabel, Row } from 'react-bootstrap'

export default function TextInput({ label, category, handleChange, error, values }) {
    return (
        <Row>
            <Col lg={4}></Col>
            <Col lg={4} className="d-flex align-items-center justify-content-end mb-4">
                <FormLabel className="me-3 m-0">{label}:</FormLabel>
                <FormControl
                    style={{ width: '270px', marginRight: '30px' }}
                    type="text"
                    name={label}
                    onChange={(e) => handleChange(e, category)}
                    isInvalid={!!error}
                />
            </Col>
            <Col lg={4}></Col>
        </Row>

    )
}
