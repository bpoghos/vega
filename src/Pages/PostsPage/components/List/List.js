import { createImageUrl } from "../../../../helpers/helperFunctions"
import { ListItem } from "./ListItem/ListItem"
import { Col, Container, Row } from "react-bootstrap"

export const List = ({ data, setData }) => {

    const listPosts = data.length ? data.map(post => {
        const image = createImageUrl(post.generalPhoto.data)
        return <Col
            lg={12}
            className="mb-2"
            key={post._id}>
            <ListItem post={post} data={data} setData={setData} image={image}/>
        </Col>

    }) : null

    return (
        <Container style={{ overflowY: "auto", maxHeight: "440px" }}>
            <Row>
                {listPosts}
            </Row>
        </Container>
    )
}