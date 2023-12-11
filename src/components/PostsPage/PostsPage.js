import React, { useEffect, useState } from "react";
import Categories from "./Categories"
import List from "./List"
import Header from "../../shared/Header/Header"
import { POSTS } from "../../helpers/constants"


const PostsPage = () => {

    const [data, setData] = useState([])



    const fetchData = async (category) => {
        const apiUrl = category ? `https://vega-project-server-ea1eccf7467b.herokuapp.com/api/${category}` : 'https://vega-project-server-ea1eccf7467b.herokuapp.com/api/all';
        try {
            const data = await fetch(apiUrl);
            if (!data.ok) {
                throw new Error(`Failed to fetch data: ${data.status} ${data.statusText}`);
            }
            const res = await data.json();
            setData(res);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchData()
    }, [])


    return (
        <div style={{ width: '100%', height: '100vh', background: '#000' }}>
            <Header icon={true} title={POSTS} />
            <Categories setData={setData} />
            <List data={data} setData={setData} />
        </div>
    )
}

export default PostsPage