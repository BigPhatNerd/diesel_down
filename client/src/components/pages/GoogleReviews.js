import { useEffect } from "react";

const GoogleReviews = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://static.elfsight.com/platform/platform.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return (
        <div className="my-4">
            <div
                className="elfsight-app-80158f93-3ced-4d95-8b99-2fdf3a45c161"
                data-elfsight-app-lazy
            ></div>
        </div>
    );
};

export default GoogleReviews;
