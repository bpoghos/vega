import { Col, Dropdown, FormLabel, Row } from 'react-bootstrap';
import { FormError } from '../../Pages/AddUpdatePostPage/components/FormError/FormError';
import styles from './FormComponents.module.css'

export const DropdownComponent = ({ data, category, label, handleSelect, values, error }) => {

  return (
    <Row>
      <Col lg={4}></Col>
      <Col lg={4} className="d-flex align-items-center justify-content-end mb-4">
        <FormLabel className="me-3 m-0" >{label}:</FormLabel>
        <Dropdown className={styles.dropDownBtn} onSelect={(e) => handleSelect(e, category)}>
          <Dropdown.Toggle id="dropdown-basic">{values[category] || '-Select-'}</Dropdown.Toggle>
          <Dropdown.Menu
            style={{
              maxHeight: '220px',
              overflowY: 'auto',
            }}
          >
            {data.map((d) => (
              <Dropdown.Item key={d.value} eventKey={d.label}>{d.label}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        {error ? <FormError title={label} /> : null}
      </Col>
      <Col lg={4}></Col>
    </Row>
  );
};