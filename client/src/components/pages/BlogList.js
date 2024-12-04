import React, { useEffect, useState, useContext } from 'react';
import RegistrationContext from '../../context/registration/registrationContext';
import { Link } from 'react-router-dom';

const BlogList = () => {
    const { setAlert } = useContext(RegistrationContext); // Access setAlert from context
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBlogs = async () => {
        try {
            const response = await fetch('/api/blog');
            if (!response.ok) throw new Error('Failed to load blog posts');
            const data = await response.json();
            console.log({ data })
            setBlogs(data.data); // Correctly access the nested blogs array
        } catch (error) {
            setAlert(error.message, 'danger');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    if (loading) return <p>Loading...</p>;
    console.log({ blogs })
    return (
        <div>
            <h1>Blog Posts</h1>
            {blogs && blogs.map((blog) => (
                <div key={blog.documentId}>
                    <h2>{blog.Title}</h2> {/* Correctly access Title */}
                    <p>{blog.Content.substring(0, 100)}...</p> {/* Correctly access Content */}
                    <Link to={`/blog/${blog.documentId}`}>Read More</Link>
                </div>
            ))}
        </div>
    );
};

export default BlogList;
