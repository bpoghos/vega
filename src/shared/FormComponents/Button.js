import React from 'react'
import { Button } from 'react-bootstrap'
import { Loading } from '../../shared/Loading/Loading'

export const CustomButton = ({ getValues, label, type, loading, /* fieldErrors */ }) => {

    // const isAnyFieldError = fieldErrors ? Object.values(fieldErrors).some(error => error) : false;
    const isDisabled = /* isAnyFieldError || */ loading;

    return (
        <>
            {loading ? <Loading /> : null}
            <Button
                className='m-4'
                disabled={isDisabled}
                variant={type}
                onClick={getValues}>
                {label}
            </Button>
        </>
    )
}