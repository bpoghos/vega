import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { CATEGORIES } from '../../../helpers/constants';
import Dropdown from './FormComponents/Dropdown';
import TextInput from './FormComponents/TextInput';
import { generateYears } from '../../../helpers/helperFunctions';
import TextArea from './FormComponents/TextArea';
import Photos from './FormComponents/Photos';
import Btn from './FormComponents/Btn';
import { useNavigate } from 'react-router-dom';
import FormError from '../FormError';

export default function Form() {
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
    profile_picture: '', // Corrected the field name
    multiplePhotos: [],
    threedPhotos: [],
    planPhotos: [],
    graphicPhotos: [],
    detailPhotos: [],
  });

  const navigate = useNavigate();

  const handleSelect = (eventKey, category) => {
    setValues({ ...values, [category]: eventKey });
  };

  const handleChange = (event, category) => {
    setValues({ ...values, [category]: event.target.value });
  };

  const handlePhotoChange = (event, category) => {
    if (category === 'multiplePhotos') {
      setValues({
        ...values,
        [category]: [...values[category], event.target.files[0]],
      });
    } else {
      setValues({ ...values, [category]: event.target.files[0] });
    }
  };

  const addPosts = async () => {
    const formData = new FormData();

    // Append values to FormData
    Object.entries(values).forEach(([key, value]) => {
      if (key === 'multiplePhotos') {
        // Append multiple photos as an array
        value.forEach((photo, index) => {
          formData.append(`${key}[${index}]`, photo);
        });
      } else {
        formData.append(key, value);
      }
    });

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
        <Dropdown data={CATEGORIES} handleSelect={handleSelect} label={'Category'} category={'category'} values={values} />
        <TextInput label='Title' category={'title'} handleChange={handleChange} error={isError} values={values} />
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
        <Btn label='ADD POST' type='success' addPosts={addPosts} />
        {isError ? <FormError /> : null}
        <Btn label='CANCEL' type='outline-secondary' />
      </Container>
    </>
  );
}
