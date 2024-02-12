import { Col, Container, Row } from "react-bootstrap"
import styles from './categories.module.css'
import { CATEGORIES } from "../../../../helpers/constants"
import { useState } from "react";

export const Categories = ({ onCategorySelect }) => {
    const [activeCategory, setActiveCategory] = useState(null);

    const handleClick = (cat) => {
        onCategorySelect(cat);
        setActiveCategory(cat);
    }

    return (
        <Container className="mb-4">
            <Row>
                {CATEGORIES.map((cat) => {
                    const isActive = cat.label === activeCategory;
                    return (
                        <Col className={`mb-4`} lg={2} key={cat.label}>
                            <div className={isActive ? styles.activeCategory : styles.category} onClick={() => { handleClick(cat.label) }}>
                                {cat.label}
                            </div>
                        </Col>
                    );
                })}
            </Row>
        </Container>
    )
}