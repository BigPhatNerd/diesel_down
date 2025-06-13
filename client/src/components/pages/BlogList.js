import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Card, Button, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavigationLinks from "../NavigationLinks";
import SocialMediaLinks from "./SocialMediaLinks";
import AddressComponent from "./AddressComponent";
import { getBackgroundStyles } from "../helpers/backgroundStyles";
import RegistrationContext from "../../context/registration/registrationContext";



const BlogList = () => {
    const { setAlert, user } = useContext(RegistrationContext);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(null);
    console.log({ blogs })
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5; // Number of blogs per page

    const styles = getBackgroundStyles();
    const toggleExpand = (index) => {
        setExpanded(expanded === index ? null : index); // Toggle expansion
    };

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch("/api/blog");
                if (!response.ok) throw new Error("Failed to load blog posts");
                const data = await response.json();

                // Sort blogs by createdAt in descending order (newest first)
                const sortedBlogs = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                setBlogs(sortedBlogs);
            } catch (error) {
                setAlert(error.message, "danger");
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, [setAlert]);

    // Pagination logic
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstPost, indexOfLastPost);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) return <p>Loading...</p>;

    return (
        <div style={{ backgroundColor: "var(--background-color)", color: "white" }}>
            <Container className="pt-3">
                <Row className="justify-content-center m-2">
                    <h1>Blog Posts</h1>
                </Row>

                {currentBlogs.map((blog, index) => (
                    <Card key={index} className="mb-3">
                        <Card.Header>
                            <Row
                                className="justify-content-between align-items-center"
                                style={{
                                    cursor: "pointer",
                                    backgroundColor: "var(--primary-color)",
                                    color: "white",
                                    padding: "10px",
                                    borderRadius: "5px",
                                }}
                                onClick={() => toggleExpand(index)}
                            >
                                <strong>{blog.Title}</strong>
                                <span>{expanded === index ? "▲" : "▼"}</span>
                            </Row>
                        </Card.Header>
                        {expanded === index && (
                            <Card.Body>
                                <p className="text-justify">{blog.Content.substring(0, 200)}...</p>
                                <Link to={`/blog/${blog.slug}`}>
                                    <Button style={styles.button}>Read More</Button>
                                </Link>
                            </Card.Body>
                        )}
                    </Card>
                ))}


                {/* Pagination Controls */}
                <Pagination className="justify-content-center custom-pagination">
                    {[...Array(Math.ceil(blogs.length / postsPerPage))].map((_, index) => (
                        <Pagination.Item
                            key={index + 1}
                            active={index + 1 === currentPage}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>

                <AddressComponent />

                <Row className="justify-content-center m-4">
                    <SocialMediaLinks />
                </Row>

                <NavigationLinks user={user} currentPage="blog" />
            </Container>
        </div>
    );
};

export default BlogList;
