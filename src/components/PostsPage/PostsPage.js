import React, { useEffect, useState } from "react";
import Categories from "./Categories"
import List from "./List"
import Header from "../../shared/Header/Header"
import { POSTS } from "../../helpers/constants"


const PostsPage = () => {

    const [data, setData] = useState([])

    const getPosts = async () => {
        const getData = await fetch('/api/posts')
        const res = await getData.json()
        setData(res)
    }

    useEffect(() => {
        getPosts()
    }, [])


    return (
        <div style={{ width: '100%', background: '#000' }}>
            <Header icon={true} title={POSTS} />
            <Categories />
            <List data={data} />
        </div>
    )
}

export default PostsPage