import React, { useState } from "react";
import { ADD_POST, EDIT_POST } from "../../helpers/constants"
import { Form } from "./components/Form/Form"
import { Header } from "../../shared/Header/Header";
import { addPost, editPost } from "../../services/posts";
import { useNavigate, useLocation, useParams } from 'react-router-dom';

const AddUpdatePostPage = () => {

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    const isEditPostPage = location.pathname.includes('edit-post');

    const addNewPost = async (data) => {
        setIsLoading(true);
        try {
            await addPost(data);
            setError(null);
            navigate('/admin/posts'); 
        } catch (err) {
            setError(err.message); 
        } finally {
            setIsLoading(false);
        }
    };
    

    const editExistedPost = async (data) => {
        console.log(data);
        // setIsLoading(true);
        // try {
        //     await editPost(data, params.id);
        //     setError(null);
        //     navigate('/admin/posts')
        // } catch (error) {
        //     setError(error.message);
        // } finally {
        //     setIsLoading(false);
        // }
    }

    return (
        <div>
            <Header icon={true} title={isEditPostPage ? EDIT_POST : ADD_POST} />
            <Form
                addNewPost={addNewPost}
                editPost={editExistedPost}
                isLoading={isLoading}
                error={error}
                isEditPostPage={isEditPostPage} 
                editExistedPost={editExistedPost} 
                setIsLoading={setIsLoading}
                setError={setError}
            />
        </div>
    )
}

export default AddUpdatePostPage