import React, { useEffect, useRef, useState } from 'react';

const TuningCatalogue = () => {
    const iframeRef = useRef(null);
    const [expandIframe, setExpandIframe] = useState(false);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://tuningconfigurator.com/assets/app-assets/vendors/iframe-resizer/iframeResizer.min.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            if (iframeRef.current && window.iFrameResize) {
                window.iFrameResize({ heightCalculationMethod: 'taggedElement' }, iframeRef.current);
            }
        };

        const handleMessage = (event) => {
            if (event.origin !== 'https://tuningconfigurator.com') return;
            try {
                const data = JSON.parse(event.data);
                if (data?.tfIframeEvent === 'showRemapSubmitted') {
                    setExpandIframe(true); // Expand when "View remaps" clicked
                }
            } catch (e) { }
        };

        window.addEventListener('message', handleMessage);
        return () => {
            document.body.removeChild(script);
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    return (
        <div
            style={{
                overflow: 'hidden',
                transition: 'max-height 0.3s ease',
                maxHeight: expandIframe || window.innerWidth < 1024 ? '2000px' : '250px',
                width: '100%',
            }}

        >
            <iframe
                ref={iframeRef}
                title="Tuning Catalogue"
                id="tuningconfigurator-iframe"
                src="https://tuningconfigurator.com/catalogue/iframe/eb2a8183-2995-408c-98f1-610e56dd7d02"
                width="100%"
                frameBorder="0"
                scrolling="no"
                style={{ width: '100%' }}
            />
        </div>
    );
};

export default TuningCatalogue;
