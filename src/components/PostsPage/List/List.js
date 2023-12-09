import React from "react";
import { Col, Container, Row } from "react-bootstrap"
import ListItem from "./ListItem/ListItem"

const List = ({ data, setData }) => {



    const listPosts = data.map(post => {
        return <Col
            lg={12}
            className="mb-2"
            key={post._id}>
            <ListItem post={post} data={data} setData={setData} />
        </Col>
    })

    return (
        <Container style={{ overflowY: "auto", maxHeight: "440px" }}>
            <Row>
                {listPosts}
            </Row>
        </Container>
    )
}

export default List