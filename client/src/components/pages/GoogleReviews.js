import { useEffect } from "react";

const GoogleReviews = ({ widgetId }) => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://static.elfsight.com/platform/platform.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return (
        <div className="my-4">
            <div
                className={widgetId}
                data-elfsight-app-lazy
            ></div>
        </div>
    );
};

export default GoogleReviews;
