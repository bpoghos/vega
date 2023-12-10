import React, { useEffect, useState } from "react";
import classes from './list-item.module.css'
import { FaPencil, FaTrash } from 'react-icons/fa6'
import { useNavigate } from "react-router-dom";

const ListItem = ({ post, data, setData }) => {
    const [image, setImage] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(`https://vega-project-server-ea1eccf7467b.herokuapp.com/api/posts/${post._id}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
                }
                const postData = await response.json();

                const imageBlob = new Blob([new Uint8Array(postData.generalPhoto.data)]);
                const imageUrl = URL.createObjectURL(imageBlob);
                setImage(imageUrl);
            } catch (error) {
                console.error("Error fetching image:", error);
            }
        };

        fetchImage();
    }, [post._id]);

    const deletePost = async (id) => {
        try {
            const del = await fetch(`https://vega-project-server-ea1eccf7467b.herokuapp.com/api/posts/del/${id}`, {
                method: 'DELETE'
            });
            const res = await del.json();
            if (res) {
                const filteredData = data.filter(d => d._id !== id)
                console.log(filteredData);
                setData(filteredData)
            }

        } catch (error) {
            console.error("Error deleting post:", error);
        }
    }


    return (
        <>
            <div className={classes.hatik}>
                <div className={classes.hatt} onClick={() => navigate(`/admin/posts/${post._id}`)}>
                    <div className={classes.hatikImage} >
                        <img
                            style={{ height: '100%', borderRadius: '10px', }}
                            src={image}
                            alt={post.generalPhoto}>
                        </img>
                    </div>
                    <div className={classes.glxavorInfoBox}>
                        <p className={classes.title}><strong>Title:</strong> {post.title}</p>
                        <p className={classes.category}><strong>Category:</strong> {post.category}</p>
                        <p className={classes.date}><strong>Date:</strong> Date now00000</p>
                    </div>
                </div>
                <div className={classes.btnBox}>
                    <button className={classes.editBtn} onClick={() => navigate(`/admin/edit/${post._id}`)}><FaPencil /></button>
                    <button onClick={() => deletePost(post._id)} className={classes.deleteBtn}><FaTrash /></button>
                </div>
            </div>
        </>

    )
}

export default ListItem