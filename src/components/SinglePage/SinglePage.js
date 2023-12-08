import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from "./SinglePage.module.css"

const SinglePage = () => {

    const params = useParams()
    const [data, setData] = useState([])
    const [post, setPost] = useState()

    const fetchData = async () => {
        try {
            const data = await fetch(`https://vega-project-server-ea1eccf7467b.herokuapp.com/api/posts/${params.id}`);
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
    useEffect(() => {
        fetchData()
    }, [])




    return (
        <div>
            <div className={styles.title}>
                <h1><strong>Title:</strong> {data.title}</h1>
                <h3><strong>Category:</strong> {data.category}</h3>
                <p><strong>Description:</strong> {data.description}</p>
            </div>
            <div className={styles.date}>
                <p><strong>Date:</strong> {data.date}</p>
                <p><strong>Location:</strong> {data.location}</p>
                <p><strong>Floor area:</strong> {data.floor_area}</p>
                <p><strong>Client:</strong> {data.client}</p>
                <p><strong>Architects:</strong> {data.architects}</p>
            </div>
            <div className={styles.generalPhoto}>
                <div >Profile Photo:
                    <div>
                        {
                            data.title && data.generalPhoto ?
                                <img alt='' src={`https://vega-project-server-ea1eccf7467b.herokuapp.com/uploads/images/${data.title}/${data.generalPhoto}`} /> : null
                        }
                    </div>
                </div>
            </div>

            <div className={styles.multiplePhotos}>
                <div>Photos:
                    <div className={styles.multiplePhotosScroll}>
                        {
                            data.title && data.multiplePhotos ?
                                data.multiplePhotos.map(d => (
                                    <img key={d} alt='' src={`https://vega-project-server-ea1eccf7467b.herokuapp.com/uploads/images/${data.title}/multi/${d}`} />
                                ))
                                : null
                        }
                    </div>
                </div>
            </div>

            <div className={styles.planPhotos}>
                <div>Plans:
                    <div className={styles.planPhotosScroll}>

                        {
                            data.title && data.planPhotos ?
                                data.planPhotos.map(d => (
                                    <img key={d} alt='' src={`https://vega-project-server-ea1eccf7467b.herokuapp.com/uploads/images/${data.title}/plan/${d}`} />
                                ))
                                : null
                        }
                    </div>
                </div>
            </div>

            <div className={styles.threedPhotos}>
                <div>3D:
                    <div className={styles.threedPhotosScroll}>
                        {
                            data.title && data.threedPhotos ?
                                data.threedPhotos.map(d => (
                                    <img key={d} alt='' src={`https://vega-project-server-ea1eccf7467b.herokuapp.com/uploads/images/${data.title}/threed/${d}`} />
                                ))
                                : null
                        }
                    </div>
                </div>
            </div>

            <div className={styles.graphicPhotos}>
                <div>Graphics:
                    <div className={styles.graphicPhotosScroll}>
                        {
                            data.title && data.graphicPhotos ?
                                data.graphicPhotos.map(d => (
                                    <img key={d} alt='' src={`https://vega-project-server-ea1eccf7467b.herokuapp.com/uploads/images/${data.title}/graphic/${d}`} />
                                ))
                                : null
                        }
                    </div>
                </div>
            </div>

            <div className={styles.detailPhotos}>
                <div>Details:
                    <div className={styles.detailPhotosScroll}>
                        {
                            data.title && data.detailPhotos ?
                                data.detailPhotos.map(d => (
                                    <img key={d} alt='' src={`https://vega-project-server-ea1eccf7467b.herokuapp.com/uploads/images/${data.title}/detail/${d}`} />
                                ))
                                : null
                        }
                    </div>
                </div>
            </div>




        </div>
    )
}

export default SinglePage
