import { BASE_URL } from "../helpers/constants";

export const fetchPosts = async (category = 'all', signal) => {
    const apiUrl = `${BASE_URL}${category}`;
    try {
        const response = await fetch(apiUrl, { signal });
        if (!response.ok) {
            throw new Error(`Failed to fetch data, try again`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching posts:", error.message);
        throw error;
    }
};


export const deletePost = async (id) => {
    try {
        const del = await fetch(`${BASE_URL}posts/del/${id}`, {
            method: 'DELETE'
        });
        if (!del.ok) {
            throw new Error(`Failed to delete post, try again`);
        }
        return await del.json();
    } catch (error) {
        console.error("Error deleting post:", error);
        throw error
    }
}

export const fetchPostById = async (id, signal) => {
    try {
        const data = await fetch(`${BASE_URL}posts/${id}` , {signal});
        if (!data.ok) {
            throw new Error(`Failed to fetch data, try again`);
        }
        return await data.json();
    }
    catch (error) {
        console.error(error);
        throw error
    }
}


export const addPost = async (body) => {
    try {
        const response = await fetch(`${BASE_URL}create`, {
            method: 'POST',
            body,
        });
        if (!response.ok) {
            throw new Error(`Failed to add post, try again`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error adding post:", error.message);
        throw error;
    }
};


export const editPost = async (body, id) => {
    try {
        const data = await fetch(`https://vega-project-server-ea1eccf7467b.herokuapp.com/update/${id}`, {
            method: 'PATCH',
            body,
        })
        if (!data.ok) {
            throw new Error(`Failed to edit post, try again`);
        }
       return await data.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}