import React, { useState, useContext } from 'react';
import RegistrationContext from '../../context/registration/registrationContext';

const CommentForm = ({ blogId }) => {
    const { setAlert } = useContext(RegistrationContext); // Access setAlert from context
    const [commentText, setCommentText] = useState('');
    const [loading, setLoading] = useState(false);
    console.log({ commentText })
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({ commentText })
        try {
            setLoading(true);
            const response = await fetch(`/api/blog/${blogId}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: commentText }),
            });
            if (!response.ok) throw new Error('Failed to submit comment');
            setAlert('Comment submitted successfully!', 'success');
            setCommentText('');
        } catch (error) {
            setAlert(error.message, 'danger');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                disabled={loading}
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Comment'}
            </button>
        </form>
    );
};

export default CommentForm;
