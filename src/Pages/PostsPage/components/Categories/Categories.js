import { Col, Container, Row } from "react-bootstrap"
import styles from './categories.module.css'
import { CATEGORIES } from "../../../../helpers/constants"

export const Categories = ({onCategorySelect}) => {

    const handleClick = (cat) => {
        onCategorySelect(cat)
        return cat
    }

    return (
        <Container className="mb-4">
            <Row>
                {CATEGORIES.map((cat) => {
                    return <Col className="mb-4" lg={2} key={cat.value}>
                        <div className={styles.category} onClick={() => {handleClick(cat.value)}}>
                            {cat.label}
                        </div>
                    </Col>
                })}
            </Row>
        </Container>
    )
}