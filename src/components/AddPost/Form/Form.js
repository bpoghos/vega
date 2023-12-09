import { CATEGORIES } from '../../../helpers/constants';
import Dropdown from './FormComponents/Dropdown';
import { generateYears } from '../../../helpers/helperFunctions';
import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import TextInput from './FormComponents/TextInput';
import TextArea from './FormComponents/TextArea';
import Photos from './FormComponents/Photos';
import Btn from './FormComponents/Btn';
import { useNavigate } from 'react-router-dom';
import FormError from '../FormError';

export default function Form() {
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
    generalPhoto: '',
    multiplePhotos: [],
    threedPhotos: [],
    planPhotos: [],
    graphicPhotos: [],
    detailPhotos: [],
  });
  const getYears = generateYears();

  const navigate = useNavigate();


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


  const addPosts = async () => {
    const formData = new FormData();
    formData.append('title', values.title)
    formData.append('description', values.description)
    formData.append('architects', values.architects)
    formData.append('category', values.category)
    formData.append('client', values.client)
    formData.append('date', values.date)
    formData.append('floor_area', values.floor_area)
    formData.append('location', values.location)
    formData.append('generalPhoto', values.generalPhoto)
    for (const img of values.graphicPhotos) {
      formData.append('graphicPhotos', img);
    }
    for (const img of values.multiplePhotos) {
      formData.append('multiplePhotos', img);
    }
    for (const img of values.planPhotos) {
      formData.append('planPhotos', img);
    }
    for (const img of values.threedPhotos) {
      formData.append('threedPhotos', img);
    }
    for (const img of values.detailPhotos) {
      formData.append('detailPhotos', img);
    }


    try {
      const response = await fetch(`https://vega-project-server-ea1eccf7467b.herokuapp.com/api/create`, {
        method: 'POST',
        body: formData,

      });
      const data = await response.json();

      navigate('/admin');
      console.log(data);
    } catch (error) {
      setIsError(error);
    }
  };

  return (
    <>
      <Container className="mt-5 border-bottom border-secondary-subtle">
        <TextInput label='Title' name={"title"} category={'title'} handleChange={handleChange} error={isError} values={values} />
        <TextArea label='Description' name={"description"} category={'description'} handleChange={handleChange} error={isError} />
        <Dropdown data={getYears} handleSelect={handleSelect} category={'date'} label={'Data'} values={values} />
      </Container>

      <Container className='mt-4 border-bottom border-secondary-subtle'>
        <Dropdown data={CATEGORIES} handleSelect={handleSelect} label={'Category'} category={'category'} values={values} />
        <TextInput label='Location' name={'location'} category={'location'} handleChange={handleChange} error={isError} values={values} />
        <TextInput label='Floor area' name={'floor_area'} category={'floor_area'} handleChange={handleChange} error={isError} />
        <TextInput label='Client' name={'client'} category={'client'} handleChange={handleChange} error={isError} />
        <TextInput label='Architects' name={'architects'} category={'architects'} handleChange={handleChange} error={isError} />
      </Container>

      <Container className='mt-4 border-bottom border-secondary-subtle'>
        <Row>
          <Photos label='Profile Photo' name={'generalPhoto'} category={'generalPhoto'} handlePhotoChange={handlePhotoChange} />
          <Photos label='Multiple Photos' name={'multiplePhotos'} category={'multiplePhotos'} handlePhotoChange={handlePhotosChange} />
          <Photos label='3D' name={'threedPhotos'} category={'threedPhotos'} handlePhotoChange={handlePhotosChange} />
          <Photos label='Plans' name={'planPhotos'} category={'planPhotos'} handlePhotoChange={handlePhotosChange} />
          <Photos label='Graphics' name={'graphicPhotos'} category={'graphicPhotos'} handlePhotoChange={handlePhotosChange} />
          <Photos label='Details' name={'detailPhotos'} category={'detailPhotos'} handlePhotoChange={handlePhotosChange} />
        </Row>
      </Container>

      <Container className='mt-4 pb-4 d-flex justify-content-center'>
        <Btn label='ADD POST' type='success' addPosts={addPosts} />
        {isError ? <FormError /> : null}
        <Btn label='CANCEL' type='outline-secondary' />
      </Container>
    </>
  );
}