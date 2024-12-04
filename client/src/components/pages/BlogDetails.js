import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import RegistrationContext from '../../context/registration/registrationContext';
import CommentForm from './CommentForm';

const BlogDetails = () => {
    const { setAlert } = useContext(RegistrationContext); // Access setAlert from context
    const { id: documentId } = useParams(); // Get the blog ID from the URL
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchBlogDetails = async () => {
        try {
            const response = await fetch(`/api/blog/${documentId}/comments`);
            if (!response.ok) throw new Error('Failed to load blog post and comments');
            const data = await response.json();
            setBlog(data.data); // Set the blog data including comments
        } catch (error) {
            setAlert(error.message, 'danger');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogDetails();
    }, [documentId]);

    if (loading) return <p>Loading...</p>;
    if (!blog) return <p>Blog post not found.</p>;

    const { Title, Content, comments = [] } = blog;
    console.log({ blog })
    return (
        <div>
            <h1>{Title}</h1>
            <p>{Content}</p>
            <h3>Comments</h3>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>{comment.Content}</li>
                ))}
            </ul>
            <CommentForm blogId={documentId} />
        </div>
    );
};

export default BlogDetails;
