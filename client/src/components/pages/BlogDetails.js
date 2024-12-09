import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Card, Button, Form } from "react-bootstrap";
import { Link, useParams, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet"; // Import Helmet
import RegistrationContext from "../../context/registration/registrationContext";
import NavigationLinks from "../NavigationLinks";
import SocialMediaLinks from "./SocialMediaLinks";
import { getBackgroundStyles } from "../helpers/backgroundStyles";

const BlogDetails = () => {
    const { setAlert, user } = useContext(RegistrationContext);
    const { slug } = useParams();
    const location = useLocation();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState("");
    const [commentsVisible, setCommentsVisible] = useState(false);
    const styles = getBackgroundStyles();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`/api/blog/${slug}`);
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
    }, [slug, setAlert]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) {
            setAlert("Comment cannot be empty", "danger");
            return;
        }

        try {
            const response = await fetch(`/api/blog/${blog.id}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    Author: user.email,
                    Content: newComment,
                }),
            });

            if (!response.ok) throw new Error("Failed to submit comment");

            setBlog((prevBlog) => ({
                ...prevBlog,
                comments: [...(prevBlog?.comments || []), { Author: user.email, Content: newComment }],
            }));

            setNewComment("");
            setAlert("Comment submitted successfully", "success");
        } catch (error) {
            setAlert(error.message, "danger");
        }
    };

    const toggleCommentsVisibility = () => {
        setCommentsVisible(!commentsVisible);
    };

    if (loading) return <p>Loading...</p>;
    if (!blog) return <p>Blog not found.</p>;

    const formatContent = (content) =>
        content.split("\n\n").map((paragraph, index) => (
            <p key={index} className="text-justify">
                {paragraph}
            </p>
        ));

    return (
        <div
            style={{
                backgroundColor: "var(--background-color)",
                color: "white",
                paddingTop: "2rem",
                paddingBottom: "2rem",
            }}
        >
            <Helmet>
                <title>{blog.Title}</title>
                <meta name="description" content={blog.Content.substring(0, 150)} />
                <meta property="og:title" content={blog.Title} />
                <meta property="og:description" content={blog.Content.substring(0, 150)} />
                <meta property="og:image" content={blog.featuredImage?.url || "/default-image.jpg"} />
                <meta property="og:type" content="article" />
            </Helmet>

            <Container
                style={{
                    backgroundColor: "white",
                    color: "black",
                    borderRadius: "10px",
                    padding: "2rem",
                    maxWidth: "800px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Row className="justify-content-center mb-4">
                    <h1 className="text-center">{blog.Title}</h1>
                </Row>

                <Row className="mb-4">
                    <div>{formatContent(blog.Content)}</div>
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

                <Row className="justify-content-center m-4">
                    <SocialMediaLinks />
                </Row>
                <NavigationLinks user={user} currentPage="blog" />
            </Container>
        </div>
    );
};

export default BlogDetails;
