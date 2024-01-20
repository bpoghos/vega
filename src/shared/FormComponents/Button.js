import React from 'react'
import { Button } from 'react-bootstrap'

export const CustomButton = ({ getValues, label, type, loading, /* fieldErrors */ }) => {

    // const isAnyFieldError = fieldErrors ? Object.values(fieldErrors).some(error => error) : false;
    const isDisabled = /* isAnyFieldError || */ loading;

    return (
        <Button 
        className='m-4' 
        disabled={isDisabled}
        variant={type} 
        onClick={getValues}>
            {type === 'success' && loading ? '...' : label}
        </Button>
    )
}