import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Card, Button, Form } from "react-bootstrap";
import { Link, useParams, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet"; // Import Helmet
import RegistrationContext from "../../context/registration/registrationContext";
import NavigationLinks from "../NavigationLinks";
import SocialMediaLinks from "./SocialMediaLinks";
import { getBackgroundStyles } from "../helpers/backgroundStyles";

const BlogDetails = () => {
    // Context and State
    const { setAlert, user } = useContext(RegistrationContext);
    const { id } = useParams(); // Get the blog post ID from the URL
    const location = useLocation();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState("");
    const [commentsVisible, setCommentsVisible] = useState(false);
    const styles = getBackgroundStyles();

    // Fetch the blog post on component mount
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

    // Handle comment submission
    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        if (!newComment.trim()) {
            setAlert("Comment cannot be empty", "danger");
            return;
        }

        try {
            const response = await fetch(`/api/blog/${id}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Author: user.email,
                    Content: newComment,
                }),
            });

            if (!response.ok) throw new Error("Failed to submit comment");

            const addedComment = {
                Author: user.email,
                Content: newComment,
            };

            // Add the new comment to the current blog's comments
            setBlog((prevBlog) => ({
                ...prevBlog,
                comments: [...(prevBlog?.comments || []), addedComment],
            }));

            setNewComment("");
            setAlert("Comment submitted successfully", "success");
        } catch (error) {
            setAlert(error.message, "danger");
        }
    };

    // Toggle comment visibility
    const toggleCommentsVisibility = () => {
        setCommentsVisible(!commentsVisible);
    };

    // Loading and Error States
    if (loading) return <p>Loading...</p>;
    if (!blog) return <p>Blog not found.</p>;

    // Format blog content with paragraph breaks
    const formatContent = (content) =>
        content.split("\n\n").map((paragraph, index) => (
            <p key={index} className="text-justify">
                {paragraph}
            </p>
        ));

    return (
        <div style={{ backgroundColor: "var(--background-color)", color: "white" }}>
            {/* Meta Tags for SEO */}
            <Helmet>
                <title>{blog.Title}</title>
                <meta name="description" content={blog.Content.substring(0, 150)} />
                <meta property="og:title" content={blog.Title} />
                <meta property="og:description" content={blog.Content.substring(0, 150)} />
                <meta property="og:image" content={blog.featuredImage?.url || "/default-image.jpg"} />
                <meta property="og:type" content="article" />
            </Helmet>

            <Container className="pt-3">
                {/* Blog Title */}
                <Row className="justify-content-center mb-4">
                    <h1>{blog.Title}</h1>
                </Row>

                {/* Blog Content */}
                <Row className="mb-4">
                    <div>{formatContent(blog.Content)}</div>
                </Row>

                {/* Back to Blog List */}
                <Row className="mb-4">
                    <Link to="/blog">
                        <Button variant="secondary">Back to Blog List</Button>
                    </Link>
                </Row>

                {/* Show/Hide Comments Button */}
                <Row className="justify-content-center mb-4">
                    <Button style={styles.button} onClick={toggleCommentsVisibility}>
                        {commentsVisible
                            ? "Hide Comments"
                            : `Show Comments (${blog.comments?.length || 0})`}
                    </Button>
                </Row>

                {/* Comments Section */}
                {commentsVisible && (
                    <Row className="justify-content-center mt-4">
                        <Container>
                            {blog.comments?.length > 0 ? (
                                blog.comments.map((comment, index) => (
                                    <Card key={index} className="mb-3">
                                        <Card.Body>
                                            <strong>Author: {comment.Author}</strong>
                                            <p className="text-justify">{comment.Content}</p>
                                        </Card.Body>
                                    </Card>
                                ))
                            ) : (
                                <p className="text-center">No comments yet. Be the first to comment!</p>
                            )}
                        </Container>
                    </Row>
                )}

                {/* Comment Submission Form */}
                {user.isAuthenticated ? (
                    <Row className="justify-content-center mt-4">
                        <Container>
                            <h4 className="w-100 text-center">Leave a Comment</h4>
                            <Form onSubmit={handleCommentSubmit}>
                                <Form.Group controlId="commentContent">
                                    <Form.Label>Your Comment</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Write your comment here..."
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                    />
                                </Form.Group>
                                <Button type="submit" style={styles.reverseButton} className="mt-3">
                                    Submit Comment
                                </Button>
                            </Form>
                        </Container>
                    </Row>
                ) : (
                    <Row className="justify-content-center mt-4">
                        <p>
                            You must{" "}
                            <Link
                                to={{
                                    pathname: "/login",
                                    state: { from: location.pathname },
                                }}
                                style={{ color: "#C70C18" }}
                            >
                                log in
                            </Link>{" "}
                            to leave a comment.
                        </p>
                    </Row>
                )}

                {/* Footer Links */}
                <Row className="justify-content-center m-4">
                    <SocialMediaLinks />
                </Row>
                <NavigationLinks user={user} currentPage="blog" />
            </Container>
        </div>
    );
};

export default BlogDetails;
