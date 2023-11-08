import React from 'react'
import { Col, FormControl, FormLabel, Row } from 'react-bootstrap'


export default function TextArea({ label, category, handleChange }) {
  return (
    <Row>
      <Col lg={4}></Col>
      <Col lg={4} className="d-flex justify-content-end mb-4">
        <FormLabel className="me-3 m-0">{label}:</FormLabel>
        <FormControl
          style={{ width: '270px', height: '100px', marginRight: '30px' }}
          as='textarea'
          name={label}
          onChange={(e) => handleChange(e, category)}
        />
      </Col>
      <Col lg={4}></Col>
    </Row>
  )
}
