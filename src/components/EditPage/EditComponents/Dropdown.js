import React from 'react';
import { Col, Dropdown, FormLabel, Row } from 'react-bootstrap';
import classes from '../EditPage.module.css'

const DropdownComponent = ({ data, category, label, handleSelect, values }) => {

  const selectedValue = data.filter((d) => d.value === values[category])

  return (
    <Row>
      <Col lg={4}></Col>
      <Col lg={4} className="d-flex align-items-center justify-content-end mb-4">
        <FormLabel className="me-3 m-0" >{label}:</FormLabel>
        <Dropdown className={classes.btn} onSelect={(e) => handleSelect(e, category)}>
          <Dropdown.Toggle id="dropdown-basic">{selectedValue[0]?.label || '-Select-'}</Dropdown.Toggle>
          <Dropdown.Menu
            style={{
              maxHeight: '220px',
              overflowY: 'auto',
            }}
          >
            {data.map((d) => (
              <Dropdown.Item key={d.value} eventKey={d.value}>{d.label}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Col>
      <Col lg={4}></Col>
    </Row>
  );
};

export default DropdownComponent;







