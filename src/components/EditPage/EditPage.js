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
    const [data, setData] = useState([])


    const params = useParams()
    const navigate = useNavigate()



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



    const getYears = generateYears();
    const [isError, setIsError] = useState(null);
    const [values, setValues] = useState({
        category: '',
        title: data.title,
        description: '',
        date: '',
        location: '',
        floor_area: '',
        client: data.client,
        architects: '',
        profile_picture: '',
        multiplePhotos: [],
        threedPhotos: [],
        planPhotos: [],
        graphicPhotos: [],
        detailPhotos: [],
    });
    console.log(values);

    const handleSelect = () => {

    }
    const handleChange = () => {

    }

    const handlePhotoChange = () => {

    }

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
                <TextArea label='Description' category={'description'} handleChange={handleChange} error={isError} />
            </Container>

            <Container className='mt-4 border-bottom border-secondary-subtle'>
                <Dropdown data={getYears} handleSelect={handleSelect} category={'date'} label={'Data'} values={values} />
                <TextInput label='Location' category={'location'} handleChange={handleChange} error={isError} values={values} />
                <TextInput label='Floor area' category={'floor_area'} handleChange={handleChange} error={isError} />
                <TextInput label='Client' category={'client'} handleChange={handleChange} error={isError} />
                <TextInput label='Architects' category={'architects'} handleChange={handleChange} error={isError} />
            </Container>

            <Container className='mt-4 border-bottom border-secondary-subtle'>
                <Row>
                    <Photos label='Profile Photo' category={'profile_picture'} handlePhotoChange={handlePhotoChange} />
                    <Photos label='Multiple Photos' category={'multiplePhotos'} handlePhotoChange={handlePhotoChange} />
                    <Photos label='3D' category={'threedPhotos'} handlePhotoChange={handlePhotoChange} />
                    <Photos label='Plans' category={'planPhotos'} handlePhotoChange={handlePhotoChange} />
                    <Photos label='Graphics' category={'graphicPhotos'} handlePhotoChange={handlePhotoChange} />
                    <Photos label='Details' category={'detailPhotos'} handlePhotoChange={handlePhotoChange} />
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
