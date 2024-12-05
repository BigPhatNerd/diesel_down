import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Card, Button, Form } from "react-bootstrap";
import { Link, useParams, useLocation } from "react-router-dom";
import RegistrationContext from "../../context/registration/registrationContext";
import NavigationLinks from "../NavigationLinks";
import SocialMediaLinks from "./SocialMediaLinks";
import { getBackgroundStyles } from "../helpers/backgroundStyles";

const BlogDetails = () => {
    const { setAlert, user } = useContext(RegistrationContext);
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState("");
    const [commentsVisible, setCommentsVisible] = useState(false);
    const styles = getBackgroundStyles();
    const location = useLocation();
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
                    Author: user.email, // Replace with user info if available
                    Content: newComment,
                }),
            });

            if (!response.ok) throw new Error("Failed to submit comment");

            const addedComment = {
                Author: user.email,
                Content: newComment,
            };

            setBlog((prevBlog) => ({
                ...prevBlog,
                comments: [...(prevBlog?.comments || []), addedComment], // Add the new comment
            }));

            setNewComment(""); // Clear the input field
            setAlert("Comment submitted successfully", "success");
        } catch (error) {
            setAlert(error.message, "danger");
        }
    };


    if (loading) return <p>Loading...</p>;
    if (!blog) return <p>Blog not found.</p>;

    const toggleCommentsVisibility = () => {
        setCommentsVisible(!commentsVisible);
    };

    return (
        <div style={{ backgroundColor: "var(--background-color)", color: "white" }}>
            <Container className="pt-3">
                <Row className="justify-content-center mb-4">
                    <h1>{blog.Title}</h1>
                </Row>
                <Row className="mb-4">
                    <p>{blog.Content}</p>
                </Row>
                <Row className="mb-4">
                    <Link to="/blog">
                        <Button variant="secondary">Back to Blog List</Button>
                    </Link>
                </Row>
                <Row className="justify-content-center mb-4">
                    <Button style={styles.button} onClick={toggleCommentsVisibility}>
                        {commentsVisible
                            ? "Hide Comments"
                            : `Show Comments (${blog.comments?.length || 0})`}
                    </Button>
                </Row>
                {commentsVisible && (
                    <>
                        <Row className="justify-content-center mt-4">
                            <Container>
                                {blog.comments?.length > 0 ? (
                                    blog.comments.map((comment, index) => (
                                        <Card key={index} className="mb-3">
                                            <Card.Body>
                                                <strong>Author: {comment.Author}</strong>
                                                <p>Comment: {comment.Content}</p>
                                            </Card.Body>
                                        </Card>
                                    ))
                                ) : (
                                    <p className="text-center">No comments yet. Be the first to comment!</p>
                                )}
                            </Container>
                        </Row>
                    </>
                )}
                {user.isAuthenticated ? (
                    <>
                        <Row className="justify-content-center mt-4">
                            <h4 className="w-100 text-center">Leave a Comment</h4>
                        </Row>
                        <Row className="justify-content-center">
                            <Container>
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
                    </>
                ) : (
                    <Row className="justify-content-center mt-4">
                        <p>
                            You must <Link
                                to={{
                                    pathname: "/login",
                                    state: { from: location.pathname }, // Pass current page as `from`
                                }} style={{ color: '#C70C18' }}>log in</Link> to leave a comment.
                        </p>
                    </Row>
                )}

                <Row className="justify-content-center m-4">
                    <SocialMediaLinks />
                </Row>

                <NavigationLinks user={user} currentPage="blog" />

            </Container>
        </div >
    );
};

export default BlogDetails;
