import React, { useEffect, useState } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import Dropdown from './EditComponents/Dropdown'
import TextInput from './EditComponents/TextInput'
import TextArea from './EditComponents/TextArea'
import { CATEGORIES } from '../../helpers/constants'
import Photos from './EditComponents/Photos'
import { generateYears } from '../../helpers/helperFunctions'
import FormError from '../AddPost/FormError'

import styles from './EditPage.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../../shared'


const EditPage = () => {
    const [data, setData] = useState()
    const getYears = generateYears();
    const [isError, setIsError] = useState(null);
    const [values, setValues] = useState({
        category: '',
        title: '',
        description: '',
        date: '',
        location: '',
        floor_area: '',
        client: '',
        architects: '',
        profile_picture: '',
        multiplePhotos: [],
        threedPhotos: [],
        planPhotos: [],
        graphicPhotos: [],
        detailPhotos: [],
    });


    const params = useParams()
    const navigate = useNavigate()



    const fetchData = async () => {
        try {
            const getPost = await fetch(`https://vega-project-server-ea1eccf7467b.herokuapp.com/api/posts/${params.id}`);
            if (!getPost.ok) {
                throw new Error(`Failed to fetch getPost: ${getPost.status} ${getPost.statusText}`);
            }
            const res = await getPost.json();
            setData(res);
            setValues({
                category: res.category,
                title: res.title,
                description: res.description,
                date: res.date,
                location: res.location,
                floor_area: res.floor_area,
                client: res.client,
                architects: res.architects,
                profile_picture: res.generalPhoto.data,
                multiplePhotos: res.multiplePhotos.map(m => m.data),
                threedPhotos: res.threedPhotos,
                planPhotos: res.planPhotos,
                graphicPhotos: res.graphicPhotos,
                detailPhotos: res.detailPhotos,
            });

        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    const one = values.multiplePhotos.map(m => m)
    console.log(one[0]
    );



    const handleSelect = (eventKey, category) => {
        setValues({ ...values, [category]: eventKey });
    };

    const handleChange = (event, category) => {
        setValues({ ...values, [category]: event.target.value });
    };

    const handlePhotosChange = (event, category) => {
        const file = event.target.files[0];
        setValues({ ...values, [category]: [...values[category], file] });
    };
    const handlePhotoChange = (event, category) => {
        const file = event.target.files[0];
        setValues({ ...values, [category]: file });
    };


    const editPost = async () => {

    }

    const cancelEdit = () => {
        navigate(-1)
    }



    return (
        <>
            <Header backIcon={true} title="Edit" icon={true} />
            <Container className="mt-5 border-bottom border-secondary-subtle">
                <Dropdown data={CATEGORIES} handleSelect={handleSelect} label={'Category'} category={'category'} values={values} />
                <TextInput label='Title' category={'title'} handleChange={handleChange} error={isError} values={values.title} />
                <TextArea label='Description' category={'description'} handleChange={handleChange} error={isError} values={values.description} />
            </Container>

            <Container className='mt-4 border-bottom border-secondary-subtle'>
                <Dropdown data={getYears} handleSelect={handleSelect} category={'date'} label={'Data'} values={values.date} />
                <TextInput label='Location' category={'location'} handleChange={handleChange} error={isError} values={values.location} />
                <TextInput label='Floor area' category={'floor_area'} handleChange={handleChange} error={isError} values={values.floor_area} />
                <TextInput label='Client' category={'client'} handleChange={handleChange} error={isError} values={values.client} />
                <TextInput label='Architects' category={'architects'} handleChange={handleChange} error={isError} values={values.architects} />
            </Container>

            <Container className='mt-4 border-bottom border-secondary-subtle'>
                <Row>
                    <Photos label='Profile Photo' category={'profile_picture'} handlePhotoChange={handlePhotoChange} />
                    <Photos label='Multiple Photos' category={'multiplePhotos'} handlePhotoChange={handlePhotosChange} />
                    <Photos label='3D' category={'threedPhotos'} handlePhotoChange={handlePhotosChange} />
                    <Photos label='Plans' category={'planPhotos'} handlePhotoChange={handlePhotosChange} />
                    <Photos label='Graphics' category={'graphicPhotos'} handlePhotoChange={handlePhotosChange} />
                    <Photos label='Details' category={'detailPhotos'} handlePhotoChange={handlePhotosChange} />
                </Row>
            </Container>

            <Container className='mt-4 pb-4 d-flex justify-content-center'>
                <Button className='m-4' variant='success' onClick={editPost}>Edit</Button>

                {isError ? <FormError /> : null}
                <Button className='m-4' variant='outline-secondary' onClick={cancelEdit}>Cancel</Button>

            </Container>
        </>
    )
}

export default EditPage
