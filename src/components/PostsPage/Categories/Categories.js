import React from "react";
import { Col, Container, Row } from "react-bootstrap"
import classes from './categories.module.css'
import { CATEGORIES } from "../../../helpers/constants"

const Categories = () => {


    const onResidentalStructureBtn = (event) => {
        console.log(event.target.innerText);

    }

    return (
        <Container className="mb-4">
            <Row>
                {CATEGORIES.map((c) => {
                    return <Col className="mb-4" lg={2} key={c.value}>
                        <div className={classes.category} onClick={onResidentalStructureBtn}>
                            {c.label}
                        </div>
                    </Col>
                })}
            </Row>
        </Container>
    )
}

export default Categories