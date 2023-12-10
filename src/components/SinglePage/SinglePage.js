import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from "./SinglePage.module.css"
import Header from "../../shared/Header/Header"
import ImageModal from '../Modal/Modal'
const SinglePage = () => {

    const params = useParams()
    const [data, setData] = useState([])
    const [image, setImage] = useState()
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImageUrl, setSelectedImageUrl] = useState('');
    const [multiplePhotos, setMultiplePhotos] = useState([])
    const [threedPhotos, setThreedPhotos] = useState([])
    const [planPhotos, setPlanPhotos] = useState([])
    const [graphicPhotos, setGraphicPhotos] = useState([])
    const [setDetailPhotos] = useState([])


    const fetchData = async () => {
        try {
            const data = await fetch(`https://vega-project-server-ea1eccf7467b.herokuapp.com/api/posts/${params.id}`);
            if (!data.ok) {
                throw new Error(`Failed to fetch data: ${data.status} ${data.statusText}`);
            }
            const res = await data.json();
            setData(res);
            const imageBlob = new Blob([new Uint8Array(res.generalPhoto.data)], { type: 'image/png' });
            const imageUrl = URL.createObjectURL(imageBlob);
            setImage(imageUrl);
            res.multiplePhotos.map((d) => {
                const imageBlob = new Blob([new Uint8Array(d.data)], { type: 'image/png' });
                const imageUrl = URL.createObjectURL(imageBlob);
                setMultiplePhotos(multiplePhotos => [...multiplePhotos, imageUrl])
                return imageUrl
            })

            res.threedPhotos.map((d) => {
                const imageBlob = new Blob([new Uint8Array(d.data)], { type: 'image/png' });
                const imageUrl = URL.createObjectURL(imageBlob);
                setThreedPhotos(threedPhotos => [...threedPhotos, imageUrl])
                return imageUrl
            })

            res.planPhotos.map((d) => {
                const imageBlob = new Blob([new Uint8Array(d.data)], { type: 'image/png' });
                const imageUrl = URL.createObjectURL(imageBlob);
                setPlanPhotos(planPhotos => [...planPhotos, imageUrl])
                return imageUrl
            })

            res.graphicPhotos.map((d) => {
                const imageBlob = new Blob([new Uint8Array(d.data)], { type: 'image/png' });
                const imageUrl = URL.createObjectURL(imageBlob);
                setGraphicPhotos(graphicPhotos => [...graphicPhotos, imageUrl])
                return imageUrl
            })

            res.detailPhotos.map((d) => {
                const imageBlob = new Blob([new Uint8Array(d.data)], { type: 'image/png' });
                const imageUrl = URL.createObjectURL(imageBlob);
                setDetailPhotos(detailPhotos => [...detailPhotos, imageUrl])
                return imageUrl
            })

        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchData()
    }, [])


    const openModal = (imageUrl) => {
        setModalIsOpen(true);
        setSelectedImageUrl(imageUrl);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedImageUrl('');
    };

    return (
        <div>
            <Header param={data._id} backIcon={true} edittIcon={true} icon={false} title="Single Page" />
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
                <div>
                    Profile Photo:
                    <div>
                        {data.title && data.generalPhoto ? (
                            <img
                                alt=''
                                src={image}
                                onClick={() => openModal(image)}
                                style={{ cursor: 'zoom-in' }}
                            />
                        ) : null}
                    </div>
                </div>
            </div>

            <div className={styles.multiplePhotos}>
                <div>
                    Photos:
                    <div className={styles.multiplePhotosScroll}>
                        {data.title && data.multiplePhotos
                            ? multiplePhotos.map((d) => (
                                <img
                                    key={d}
                                    alt=''
                                    src={d}
                                    onClick={() => openModal(d)}
                                    style={{ cursor: 'zoom-in' }}
                                />
                            ))
                            : null}
                    </div>
                </div>
            </div>

            <div className={styles.planPhotos}>
                <div>
                    Plans:
                    <div className={styles.planPhotosScroll}>
                        {data.title && data.planPhotos
                            ? planPhotos.map((d) => (
                                <img
                                    key={d}
                                    alt=''
                                    src={d}
                                    onClick={() => openModal(d)}
                                    style={{ cursor: 'zoom-in' }}
                                />
                            ))
                            : null}
                    </div>
                </div>
            </div>

            <div className={styles.threedPhotos}>
                <div>
                    3D:
                    <div className={styles.threedPhotosScroll}>
                        {data.title && data.threedPhotos
                            ? threedPhotos.map((d) => (
                                <img
                                    key={d}
                                    alt=''
                                    src={d}
                                    onClick={() => openModal(d)}
                                    style={{ cursor: 'zoom-in' }}
                                />
                            ))
                            : null}
                    </div>
                </div>
            </div>

            <div className={styles.graphicPhotos}>
                <div>
                    Graphics:
                    <div className={styles.graphicPhotosScroll}>
                        {data.title && data.graphicPhotos
                            ? graphicPhotos.map((d) => (
                                <img
                                    key={d}
                                    alt=''
                                    src={d}
                                    onClick={() => openModal(d)}
                                    style={{ cursor: 'zoom-in' }}
                                />
                            ))
                            : null}
                    </div>
                </div>
            </div>

            <div className={styles.detailPhotos}>
                <div>
                    Details:
                    <div className={styles.detailPhotosScroll}>
                        {data.title && data.detailPhotos
                            ? data.detailPhotos.map((d) => (
                                <img
                                    key={d}
                                    alt=''
                                    src={d}
                                    onClick={() => openModal(d)}
                                    style={{ cursor: 'zoom-in' }}
                                />
                            ))
                            : null}
                    </div>
                </div>
            </div>

            <ImageModal isOpen={modalIsOpen} onClose={closeModal} imageUrl={selectedImageUrl} />

        </div>
    )
}

export default SinglePage