

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../../shared/Header/Header';
import { fetchPostById } from '../../services/posts';
import ImageModal from '../../shared/Modal/Modal';
import styles from "./SinglePage.module.css";
import AWS from 'aws-sdk';

AWS.config.update({
    region: process.env.REACT_APP_BUCKET_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
  });

const SinglePage = () => {
    const params = useParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [photos, setPhotos] = useState({
        general: '',
        multiple: [],
        threed: [],
        plan: [],
        graphic: [],
        detail: []
    });
    const [modalState, setModalState] = useState({ isOpen: false, selectedImageUrl: '' });
    
    useEffect(() => {
        const abortController = new AbortController();
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const res = await fetchPostById(params.id, abortController.signal );
                setData(res);
                setPhotos((prevState) => {
                    return {
                        ...prevState,
                        general: res.generalPhoto ? res.generalPhoto : '',
                        multiple: res.multiplePhotos ? res.multiplePhotos : [],
                        threed: res.threedPhotos ? res.threedPhotos : [],
                        plan: res.planPhotos ? res.planPhotos : [],
                        graphic: res.graphicPhotos ? res.graphicPhotos : [],
                        detail: res.detailPhotos ? res.detailPhotos : []
                    };

                });
                
                const s3 = new AWS.S3();
                const genImageUrl = s3.getSignedUrl('getObject', {
                    Bucket: 'new-vega-server',
                    Key: res.generalPhoto,
                    Expires: 60 // URL expiry time in seconds
                });
    
                const multipleImageUrl = res.multiplePhotos.map((image) => {
                    return s3.getSignedUrl('getObject', {
                        Bucket: 'new-vega-server',
                        Key: image,
                        Expires: 60 // URL expiry time in seconds
                    });
                }
                );
                const threedImageUrl = res.threedPhotos.map((image) => {
                    return s3.getSignedUrl('getObject', {
                        Bucket: 'new-vega-server',
                        Key: image,
                        Expires: 60 // URL expiry time in seconds
                    });
                }
                );
                const planImageUrl = res.planPhotos.map((image) => {
                    return s3.getSignedUrl('getObject', {
                        Bucket: 'new-vega-server',
                        Key: image,
                        Expires: 60 // URL expiry time in seconds
                    });
                }
                );
                const graphicImageUrl = res.graphicPhotos.map((image) => {
                    return s3.getSignedUrl('getObject', {
                        Bucket: 'new-vega-server',
                        Key: image,
                        Expires: 60 // URL expiry time in seconds
                    });
                }
                );
                const detailImageUrl = res.detailPhotos.map((image) => {
                    return s3.getSignedUrl('getObject', {
                        Bucket: 'new-vega-server',
                        Key: image,
                        Expires: 60 // URL expiry time in seconds
                    });
                }
                );
                setPhotos((prevState) => {
                    return {
                        ...prevState,
                        general: genImageUrl,
                        multiple: multipleImageUrl,
                        threed: threedImageUrl,
                        plan: planImageUrl,
                        graphic: graphicImageUrl,
                        detail: detailImageUrl
                    };
                });
               
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData()
        return () => {
            abortController.abort();
        };
    }, []);

   
    const openModal = (imageUrl) => setModalState({ isOpen: true, selectedImageUrl: imageUrl });
    const closeModal = () => setModalState({ isOpen: false, selectedImageUrl: '' });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }


    return (
        <div>
            <Header param={data?._id} backIcon={true} editIcon={true} icon={false} title="Single Page" />
            <div className={styles.title}>
                <h1><strong>Title:</strong> {data.title}</h1>
                <h3><strong>Category:</strong> {data.category}</h3>
                <p><strong>Description:</strong> {data.description}</p>
            </div>
            <div className={styles.date}>
                <p><strong>Date:</strong> {new Date(data.date).getFullYear()}</p>
                <p><strong>Location:</strong> {data.location}</p>
                <p><strong>Floor area:</strong> {data.floor_area}</p>
                <p><strong>Client:</strong> {data.client}</p>
                <p><strong>Architects:</strong> {data.architects}</p>
            </div>
            <ImageModal isOpen={modalState.isOpen} onClose={closeModal} imageUrl={modalState.selectedImageUrl} />

            {data && photos.general && (
                <ImageSection label="generalPhoto" title='General Photos' images={photos?.general} openModal={openModal} />
            )}
            {data && photos.multiple.length > 0 && (
                <ImageSection label="multiplePhotos" title='Multiple Photos' images={photos?.multiple} openModal={openModal} />
            )}
            {data && photos.threed.length > 0 && (
                <ImageSection label="threedPhotos" title='3D Photos' images={photos?.threed} openModal={openModal} />
            )}
            {data && photos.plan.length > 0 && (
                <ImageSection label="planPhotos" title='Plan Photos' images={photos?.plan} openModal={openModal} />
            )}
            {data && photos.graphic.length > 0 && (
                <ImageSection label="graphicPhotos" title='Graphic Photos' images={photos?.graphic} openModal={openModal} />
            )}
            {data && photos.detail.length > 0 && (
                <ImageSection label="detailPhotos" title='Detail Photos' images={photos?.detail} openModal={openModal} />
            )}
        </div>
    );
};

const ImageSection = ({ title, images, openModal, label}) => {
return (
    <div className={styles[`${label}`]}>
        <div>
            {title}:
            <div className={styles[`${label}Scroll`]}>
                
                {!Array.isArray(images) ? 
                <img
                    alt=''
                    src={images}
                    onClick={() => openModal(images)}
                    style={{ cursor: 'zoom-in' }}
                    /> : images.length > 0 ?
                 images?.map((image, index) => (
                    <img
                        key={`${title}-${index}`}
                        alt=''
                        src={image}
                        onClick={() => openModal(image)}
                        style={{ cursor: 'zoom-in' }}
                    />
                )): null}
            </div>
        </div>
    </div>
);
                }

export default SinglePage;