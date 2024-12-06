import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet"; // Import Helmet
import RegistrationContext from "../../context/registration/registrationContext";

const BlogDetails = () => {
    const { setAlert } = useContext(RegistrationContext);
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`/api/blog/${id}`);
                if (!response.ok) throw new Error("Failed to load blog post");
                const data = await response.json();
                setBlog(data);
            } catch (error) {
                setAlert(error.message, "danger");
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id, setAlert]);

    if (loading) return <p>Loading...</p>;
    if (!blog) return <p>Blog not found.</p>;

    // Format the content to add paragraph tags
    const formatContent = (content) =>
        content.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
        ));

    return (
        <div style={{ backgroundColor: "var(--background-color)", color: "white" }}>
            <Helmet>
                <title>{blog.Title}</title>
                <meta name="description" content={blog.Content.substring(0, 150)} />
                <meta property="og:title" content={blog.Title} />
                <meta property="og:description" content={blog.Content.substring(0, 150)} />
            </Helmet>
            <Container className="pt-3">
                <Row className="justify-content-center mb-4">
                    <h1>{blog.Title}</h1>
                </Row>
                <Row className="mb-4">
                    <div className="text-justify">
                        {formatContent(blog.Content)}
                    </div>
                </Row>
                <Row className="mb-4">
                    <Link to="/blog">
                        <Button variant="secondary">Back to Blog List</Button>
                    </Link>
                </Row>
            </Container>
        </div>
    );
};

export default BlogDetails;
