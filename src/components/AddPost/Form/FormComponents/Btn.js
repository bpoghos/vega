import React from 'react'
import { Button } from 'react-bootstrap'

const Btn = ({ addPosts, label, type }) => {
    return (
        <Button className='m-2' variant={type} onClick={addPosts}>{label}</Button>
    )
}

export default Btn
