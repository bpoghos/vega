import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap"
import classes from './categories.module.css'
import { CATEGORIES } from "../../../helpers/constants"

const Categories = ({ setData }) => {



    const fetchData = async (category) => {
        console.log(category);
        const apiUrl = category ? `https://vega-project-server-ea1eccf7467b.herokuapp.com/api/${category}` : 'https://vega-project-server-ea1eccf7467b.herokuapp.com/api/all';
        try {
            const data = await fetch(apiUrl);
            if (!data.ok) {
                throw new Error(`Failed to fetch data: ${data.status} ${data.statusText}`);
            }
            const res = await data.json();
            setData(res);
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    }


    const onResidentalStructureBtn = (category) => {
        fetchData(category)
    }

    return (
        <Container className="mb-4">
            <Row>
                {CATEGORIES.map((c) => {
                    return <Col className="mb-4" lg={2} key={c.value}>
                        <div className={classes.category} onClick={() => onResidentalStructureBtn(c.value)}>
                            {c.label}
                        </div>
                    </Col>
                })}
            </Row>
        </Container>
    )
}

export default Categories