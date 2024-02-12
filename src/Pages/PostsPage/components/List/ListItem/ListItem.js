import { useState } from "react";
import { FaPencil, FaTrash } from 'react-icons/fa6'
import { useNavigate } from "react-router-dom";
import { deletePost } from "../../../../../services/posts";
import styles from './list-item.module.css'
import AWS from 'aws-sdk';
import { Loading } from "../../../../../shared/Loading/Loading";

AWS.config.update({
    region: process.env.REACT_APP_BUCKET_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
});

export const ListItem = ({ post, data, setData, image }) => {

    const s3 = new AWS.S3();
    const imageUrl = s3.getSignedUrl('getObject', {
        Bucket: 'new-vega-server',
        Key: image,
        Expires: 60
    });

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const deletePostHandler = async (id) => {
        setLoading(true);
        setError(null);

        try {
            const res = await deletePost(id);
            if (res) {
                setData(data.filter(post => post._id !== id));
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (<>
        {loading && <Loading />}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className={styles.hatik}>
            <div className={styles.hatt} onClick={() => navigate(`/admin/posts/${post._id}`)}>
                <div className={styles.hatikImage} >
                    {imageUrl ? <img
                        style={{ height: '100%', borderRadius: '10px', }}
                        src={imageUrl}
                        alt={post.generalPhoto}>
                    </img> : <div style={{ height: '100%', borderRadius: '10px' }}>
                    </div>}
                </div>
                <div className={styles.glxavorInfoBox}>
                    <p className={styles.title}><strong>Title:</strong> {post.title || ""}</p>
                    <p className={styles.category}><strong>Category:</strong> {post.category || ''}</p>
                    <p className={styles.date}><strong>Date:</strong>{post?.date?.slice(0, 4) || ""}</p>
                </div>
            </div>
            <div className={styles.btnBox}>
                <button className={styles.editBtn} onClick={() => navigate(`/admin/edit-post/${post._id}`)}><FaPencil /></button>
                <button onClick={() => deletePostHandler(post._id)} className={styles.deleteBtn}><FaTrash /></button>
            </div>
        </div>
    </>
    )
}