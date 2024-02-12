import { useEffect, useRef, useState } from "react";
import { List } from "./components/List/List";
import { POSTS } from "../../helpers/constants";
import { fetchPosts } from '../../services/posts';
import { Categories } from "./components/Categories/Categories";
import { Header } from "../../shared/Header/Header";
import { Loading } from "../../shared/Loading/Loading"

const PostsPage = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const abortController = useRef()
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        return category;
    };

    useEffect(() => {
        if (abortController.current) {
            abortController.current.abort();
        }

        abortController.current = new AbortController();
        const signal = abortController.current.signal;

        setIsLoading(true);

        const getPosts = async () => {
            setIsLoading(true);
            try {
                const posts = await fetchPosts(selectedCategory, signal);
                setData(posts);
                setError(null);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message);
                    setData([]);
                }
            } finally {
                if (!signal.aborted) {
                    setIsLoading(false);
                }
            }
        };

        getPosts();

        return () => {
            if (abortController.current) {
                abortController.current.abort();
            }
        }
    }, [selectedCategory]);


    return (
        <div style={{ width: '100%', height: '100vh', background: '#000' }}>
            <Header icon={true} title={POSTS} />
            <Categories onCategorySelect={handleCategorySelect} />

            {isLoading && <Loading />}

            {error && <p>Error: {error}</p>}

            {!isLoading && !error && <List data={data} setData={setData} />}
        </div>
    );
}

export default PostsPage;
