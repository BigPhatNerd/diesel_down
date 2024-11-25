import React, { useEffect, useState } from "react";

const GoogleReviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(
                    `https://maps.googleapis.com/maps/api/place/details/json?place_id=YOUR_PLACE_ID&fields=reviews&key=YOUR_API_KEY`
                );
                const data = await response.json();
                setReviews(data.result.reviews || []);
            } catch (error) {
                console.error("Error fetching Google reviews:", error);
            }
        };

        fetchReviews();
    }, []);

    return (
        <div>
            <h4>What Our Customers Say</h4>
            <div>
                {reviews.map((review, index) => (
                    <div key={index} style={{ marginBottom: "15px" }}>
                        <h5>{review.author_name}</h5>
                        <p>
                            {Array(review.rating)
                                .fill("⭐")
                                .join("")}
                        </p>
                        <p>{review.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GoogleReviews;
