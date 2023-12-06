import React, { useState } from "react";
import classes from './list-item.module.css'
import { FaPencil, FaTrash } from 'react-icons/fa6'
import { useNavigate } from "react-router-dom";

const ListItem = ({ post, data, setData }) => {


    const navigate = useNavigate()

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


    const handleEdit = () => {
        navigate("/admin/edit")
    }


    return (
        <div className={classes.item}>
            <div className={classes.itemImage}>
                <img
                    style={{ height: '100%', borderRadius: '10px', }}
                    src={post.profile}
                    alt={post.profile_picture}>
                </img>
            </div>
            <div className={classes.generalInfoBox}>
                <div className={classes.categoryBox}>
                    <p className={classes.category}><strong>Category:</strong>{post.category}</p>
                </div>
                <div className={classes.titleBox}>
                    <p className={classes.title}><strong>Title:</strong>{post.title}</p>
                </div>
                <div className={classes.descriptionBox}>
                    <p className={classes.description}><strong>Description:</strong>{post.description}</p>
                </div>
            </div>
            <div className={classes.currentInfoBox}>
                <div className={classes.dateBox}>
                    <p className={classes.date}><strong>Date:</strong>{post.date}</p>
                </div>
                <div className={classes.locationBox}>
                    <p className={classes.location}><strong>Location:</strong>{post.location}</p>
                </div>
                <div className={classes.floorAreaBox}>
                    <p className={classes.floorArea}><strong>Floor area:</strong>{post.floor_area}&#13217;</p>
                </div>
                <div className={classes.clientBox}>
                    <p className={classes.client}><strong>Client:</strong>{post.client}</p>
                </div>
                <div className={classes.architectsBox}>
                    <p className={classes.architects}><strong>Architects:</strong>{post.architects}</p>
                </div>
            </div>
            <div className={classes.btnBox}>
                <button className={classes.editBtn} onClick={handleEdit}><FaPencil /></button>
                <button onClick={() => deletePost(post._id)} className={classes.deleteBtn}><FaTrash /></button>
            </div>
        </div>

    )
}

export default ListItem