import React from "react";
import classes from './list-item.module.css'
import { FaPencil, FaTrash } from 'react-icons/fa6'

const ListItem = ({ profile, category, title, description, date, location, floor_area, client, architects }) => {
    return (
        <div className={classes.item}>
            <div className={classes.itemImage}>
                <img
                    style={{ height: '100%', borderRadius: '10px', }}
                    src={profile}
                    alt='list'>
                </img>
            </div>
            <div className={classes.generalInfoBox}>
                <div className={classes.categoryBox}>
                    <p className={classes.category}><strong>Category:</strong>{category}</p>
                </div>
                <div className={classes.titleBox}>
                    <p className={classes.title}><strong>Title:</strong>{title}</p>
                </div>
                <div className={classes.descriptionBox}>
                    <p className={classes.description}><strong>Description:</strong>{description}</p>
                </div>
            </div>
            <div className={classes.currentInfoBox}>
                <div className={classes.dateBox}>
                    <p className={classes.date}><strong>Date:</strong>{date}</p>
                </div>
                <div className={classes.locationBox}>
                    <p className={classes.location}><strong>Location:</strong>{location}</p>
                </div>
                <div className={classes.floorAreaBox}>
                    <p className={classes.floorArea}><strong>Floor area:</strong>{floor_area}&#13217;</p>
                </div>
                <div className={classes.clientBox}>
                    <p className={classes.client}><strong>Client:</strong>{client}</p>
                </div>
                <div className={classes.architectsBox}>
                    <p className={classes.architects}><strong>Architects:</strong>{architects}</p>
                </div>
            </div>
            <div className={classes.btnBox}>
                <button className={classes.editBtn}><FaPencil /></button>
                <button className={classes.deleteBtn}><FaTrash /></button>
            </div>
        </div>
    )
}

export default ListItem