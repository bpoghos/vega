import React from "react";
import { Col, Container, Row } from "react-bootstrap"
import ListItem from "./ListItem/ListItem"

const List = ({ data }) => {

    const listPosts = data.map(({
        _id,
        category,
        title,
        description,
        date,
        location,
        floor_area,
        client,
        architects
    }) => {
        return <Col
            lg={12}
            className="mb-2"
            key={_id}>
            <ListItem
                category={category}
                title={title}
                description={description}
                date={date}
                location={location}
                floor_area={floor_area}
                client={client}
                architects={architects}
            />
        </Col>
    })

    return (
        <Container>
            <Row>
                {listPosts}
            </Row>
        </Container>
    )
}

export default List