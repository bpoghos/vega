import React from "react";
import Header from "../../shared/Header/Header"
import { ADD_POST } from "../../helpers/constants"
import Form from "./Form"


const AddPost = () => {


    return (
        <div>
            <Header icon={true} title={ADD_POST} />
            <Form />
        </div>
    )
}

export default AddPost