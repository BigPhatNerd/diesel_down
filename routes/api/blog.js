const express = require('express');
const axios = require('axios');
const router = express.Router();

// Get all blog posts
router.get('/', async (req, res) => {
    try {
        const response = await axios.get(
            'https://diesel-down-blog-21d26aae320a.herokuapp.com/api/blog-posts'
        );
        res.json(response.data.data); // Return the response data
    } catch (error) {
        console.error('Error fetching blog posts:', error.message);
        res.status(500).json({ error: 'Failed to fetch blog posts' });
    }
});

// Get a single blog post by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(
            `https://diesel-down-blog-21d26aae320a.herokuapp.com/api/blog-posts/${id}?populate=comments`
        );
        console.log({ responseData: response.data.data })
        res.json(response.data.data); // Return the response data
    } catch (error) {
        console.error('Error fetching blog post:', error);
        res.status(500).json({ error: 'Failed to fetch blog post' });
    }
});

// Get blog and comments for a blog post
router.get('/:id/comments', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(
            `https://diesel-down-blog-21d26aae320a.herokuapp.com/api/blog-posts/${id}?populate=comments
`
        );
        res.json(response.data.data); // Return the response data
    } catch (error) {
        console.error('Error fetching comments:', error.message);
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
});

// Post a new comment
router.post('/:id/comments', async (req, res) => {
    try {
        const { id } = req.params;
        const { Author, Content } = req.body;
        const response = await axios.post(
            'https://diesel-down-blog-21d26aae320a.herokuapp.com/api/comments',
            {
                data: { blog_post: id, Author, Content },
            },
            {
                headers: { 'Content-Type': 'application/json' },
            }
        );

        res.json(response.data.data); // Return the response data
    } catch (error) {
        console.error('Error posting comment:', error.message);
        res.status(500).json({ error: 'Failed to post comment' });
    }
});

module.exports = router;
