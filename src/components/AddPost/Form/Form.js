import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { CATEGORIES } from '../../../helpers/constants';
import Dropdown from './FormComponents/Dropdown';
import TextInput from './FormComponents/TextInput';
import { generateYears } from '../../../helpers/helperFunctions';
import TextArea from './FormComponents/TextArea';

import Photos from './FormComponents/Photos';
import Btn from './FormComponents/Btn';

export default function Form() {
  const getYears = generateYears();

  const [values, setValues] = useState({
    category: '',
    title: '',
    description: '',
    date: '',
    location: '',
    floor_area: '',
    client: '',
    architects: '',
    profile_pucture: '',
    photos: '',
    three_d: '',
    plans: '',
    graphics: '',
    details: ''
  })

  console.log(values);

  const handleSelect = (eventKey, category) => {
    setValues({ ...values, [category]: eventKey });
  };

  const handleChange = (event, category) => {
    setValues({ ...values, [category]: event.target.value });
  };

  const handlePhotoChange = (event, category) => {
    setValues({ ...values, [category]: event.target.files[0] });
  };

  const addPosts = async () => {
    const body = JSON.stringify(values);

    try {
      const response = await fetch('/create-post', {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json()
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <Container className="mt-5 border-bottom border-secondary-subtle">

        <Dropdown data={CATEGORIES} handleSelect={handleSelect} label={'Category'} category={'category'} values={values} />
        <TextInput label='Title' category={'title'} handleChange={handleChange} />
        <TextArea label='Description' category={'description'} handleChange={handleChange} />

      </Container>
      <Container className='mt-4 border-bottom border-secondary-subtle'>

        <Dropdown data={getYears} handleSelect={handleSelect} category={'date'} label={'Data'} values={values} />
        <TextInput label='Location' category={'location'} handleChange={handleChange} />
        <TextInput label='Floor area' category={'floor_area'} handleChange={handleChange} />
        <TextInput label='Client' category={'client'} handleChange={handleChange} />
        <TextInput label='Architects' category={'architects'} handleChange={handleChange} />

      </Container>
      <Container className='mt-4 border-bottom border-secondary-subtle'>
        <Row>
          <Photos label='Profile Photo' category={'profile_picture'} handlePhotoChange={handlePhotoChange} />
          <Photos label='Photos' category={'photos'} handlePhotoChange={handlePhotoChange} />
          <Photos label='3D' category={'three_d'} handlePhotoChange={handlePhotoChange} />
          <Photos label='Plans' category={'plans'} handlePhotoChange={handlePhotoChange} />
          <Photos label='Graphics' category={'graphics'} handlePhotoChange={handlePhotoChange} />
          <Photos label='Details' category={'details'} handlePhotoChange={handlePhotoChange} />
        </Row>
      </Container>
      <Container className='mt-4 pb-4 d-flex justify-content-center'>
        <Btn label='CENCEL' type='outline-secondary' />
        <Btn label='ADD POST' type='success' addPosts={addPosts} />
      </Container>
    </>
  );
}





