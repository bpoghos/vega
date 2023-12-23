import { useState, useRef } from 'react';
import { Container, Row } from 'react-bootstrap';
import { TextInput, TextArea, Photos, CustomButton, DropdownComponent } from '../../../../shared/FormComponents';
import { generateYears, bufferToFile } from '../../../../helpers/helperFunctions';
import { CATEGORIES } from '../../../../helpers/constants';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { fetchPostById } from '../../../../services/posts';

export const Form = ({ addNewPost, editExistedPost, isLoading, error, isEditPostPage, setIsLoading, setError }) => {

  const params = useParams();
  const navigate = useNavigate();

  const abortController = useRef()


  const [fieldErrors, setFieldErrors] = useState({
    title: false,
    description: false,
    category: false,
    location: false,
    floor_area: false,
    client: false,
    architects: false,
    generalPhoto: false,
  });

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

  useEffect(() => {
    const fetchDefaultData = async () => {
      try {
        if (abortController.current) {
          abortController.current.abort();
      }
  
      abortController.current = new AbortController();
      const signal = abortController.current.signal;
        setIsLoading(true);
        const res = await fetchPostById(params.id, signal);

        setValues((v) => ({
          ...v,
          category: res.category,
          title: res.title,
          description: res.description,
          date: new Date(res.date).getFullYear(),
          location: res.location,
          floor_area: res.floor_area,
          client: res.client,
          architects: res.architects,
          generalPhoto: [res.generalPhoto.data] || [],
          multiplePhotos: res.multiplePhotos.map(r => r.data) || [],
          threedPhotos: res.threedPhotos.map(r => r.data) || [],
          planPhotos: res.planPhotos.map(r => r.data) || [],
          graphicPhotos: res.graphicPhotos.map(r => r.data) || [],
          detailPhotos: res.detailPhotos.map(r => r.data) || [],
        }));
      } catch (error) {
        setValues(null)
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    isEditPostPage && fetchDefaultData();
    return () => {
      if (abortController.current) {
        abortController.current.abort();
    }
  };
  }, [params.id, isEditPostPage, setIsLoading, setError]);

  const getYears = generateYears();

  const handleSelect = (eventKey, category) => {
    setValues({ ...values, [category]: eventKey });
    setFieldErrors({ ...fieldErrors, [category]: false });
  };

  const handleChange = (event, category) => {
    setValues({ ...values, [category]: event.target.value });
    setFieldErrors({ ...fieldErrors, [category]: false });
  };

  const removeImage = (index, category) => {
    if (category === 'generalPhoto') {
      setValues({ ...values, [category]: '' });
      return;
    }
    const newValues = { ...values };
    newValues[category].splice(index, 1);
    setValues(newValues);
  }

  const handlePhotosChange = (event, category) => {
    if (event) {
      const files = event.target.files;
      setValues({ ...values, [category]: [...values[category], ...files] });
    } else {
      setValues({ ...values, [category]: [] });
    }
  }

  const handlePhotoChange = (event, category) => {
    if (event) {
      const file = event.target.files[0];
      setValues({ ...values, [category]: file });
    } else {
      setValues({ ...values, [category]: '' });
    }
    setFieldErrors({ ...fieldErrors, [category]: false });
  };


  const getValues = async () => {
    const newFieldErrors = { ...fieldErrors };
    let isValid = true
    for (const field in newFieldErrors) {
      if (!values[field]) {
        newFieldErrors[field] = true;
        isValid = false;
      } else {
        newFieldErrors[field] = false;
      }
    }

    setFieldErrors(newFieldErrors);
    if (!isValid) {
      return;
    }
    const formData = new FormData();
    formData.append('title', values.title)
    formData.append('description', values.description)
    formData.append('architects', values.architects)
    formData.append('category', values.category)
    formData.append('client', values.client)
    formData.append('date', values.date)
    formData.append('floor_area', values.floor_area)
    formData.append('location', values.location)
    if (values.generalPhoto) {
      formData.append('generalPhoto', values.generalPhoto);
    }
    for (const img of values.graphicPhotos) {
      if(isEditPostPage && img?.length > 100){
      formData.append('graphicPhotos', bufferToFile(img, 'graphicPhotos'));
      }else{
        formData.append('graphicPhotos', img);
      }
    }
    for (const img of values.multiplePhotos) {
      if(isEditPostPage && img?.length > 100){
      formData.append('multiplePhotos', bufferToFile(img, 'multiplePhotos'));
    }else{
      formData.append('multiplePhotos', img);
    }
  }
    for (const img of values.planPhotos) {
      if(isEditPostPage && img?.length > 100){
      formData.append('planPhotos', bufferToFile(img, 'planPhotos'));
      }else{
        formData.append('planPhotos', img);
      }
    }
    for (const img of values.threedPhotos) {
      if(isEditPostPage && img?.length > 100){
      formData.append('threedPhotos', bufferToFile(img, 'threedPhotos'));
      }else{
        formData.append('threedPhotos', img);
      }
    }
    for (const img of values.detailPhotos) {
      if(isEditPostPage && img?.length > 100){
        formData.append('detailPhotos', bufferToFile(img, 'detailPhotos'));
        }else{
          formData.append('detailPhotos', img);
        }
    }
    isEditPostPage ? editExistedPost(formData) :
      addNewPost(formData)
    return formData
  };

  return (
    <>
      <Container className="mt-5 border-bottom border-secondary-subtle">
        <TextInput label='Title' name={"title"} category={'title'} handleChange={handleChange} error={fieldErrors.title} values={values} />
        <TextArea label='Description' name={"description"} category={'description'} handleChange={handleChange} error={fieldErrors.description} values={values} />
        <DropdownComponent data={getYears} handleSelect={handleSelect} category={'date'} label={'Date'} values={values} error={fieldErrors.date} />
      </Container>

      <Container className='mt-4 border-bottom border-secondary-subtle'>
        <DropdownComponent data={CATEGORIES} handleSelect={handleSelect} label={'Category'} category={'category'} values={values} error={fieldErrors.category} />
        <TextInput label='Location' name={'location'} category={'location'} handleChange={handleChange} error={fieldErrors.location} values={values}
        />
        <TextInput label='Floor area' name={'floor_area'} category={'floor_area'} handleChange={handleChange} error={fieldErrors.floor_area} values={values} />
        <TextInput label='Client' name={'client'} category={'client'} handleChange={handleChange} error={fieldErrors.client} values={values} />
        <TextInput label='Architects' name={'architects'} category={'architects'} handleChange={handleChange} error={fieldErrors.architects} values={values} />
      </Container>

      <Container className='mt-4 border-bottom border-secondary-subtle'>
        <Row>
          <Photos label='Profile Photo' 
            name={'generalPhoto'}
            values={values}
            removeImage={removeImage}
            category={'generalPhoto'} 
            handlePhotoChange={handlePhotoChange} 
            error={fieldErrors.generalPhoto} 
          />
          <Photos label='Multiple Photos' 
            values={values} 
            name={'multiplePhotos'} 
            category={'multiplePhotos'} 
            handlePhotoChange={handlePhotosChange}
            removeImage={removeImage}
          />
          <Photos
            removeImage={removeImage}
            label='3D' 
            values={values} 
            name={'threedPhotos'} 
            category={'threedPhotos'} 
            handlePhotoChange={handlePhotosChange} 
          />
          <Photos
            removeImage={removeImage}
            label='Plans' 
            values={values} 
            name={'planPhotos'} 
            category={'planPhotos'} 
            handlePhotoChange={handlePhotosChange} 
          />
          <Photos
            removeImage={removeImage}
            label='Graphics' 
            values={values} 
            name={'graphicPhotos'} 
            category={'graphicPhotos'} 
            handlePhotoChange={handlePhotosChange} 
          />
          <Photos
            removeImage={removeImage}
            label='Details' 
            values={values} 
            name={'detailPhotos'} 
            category={'detailPhotos'} 
            handlePhotoChange={handlePhotosChange} 
          />
        </Row>
      </Container>

      <Container className='mt-4 pb-4 d-flex justify-content-center'>
        <CustomButton label={isEditPostPage ? "EDIT POST" : "ADD POST"} type='success' getValues={getValues} loading={isLoading} fieldErrors={fieldErrors} />
        {error || null}
        <CustomButton label='CANCEL' type='outline-secondary' getValues={() => navigate(-1)}/>
      </Container>
    </>
  );
}
