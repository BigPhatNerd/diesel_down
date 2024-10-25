import background from "../../img/diesel_down_black.jpg";

export const getBackgroundStyles = () => {
    const styles = {
        container: {
            backgroundImage: `linear-gradient(rgba(0, 0, 0, .9), rgba(0, 0, 0, .9)),url(${background})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            width: "100vw",
            minHeight: "100vh",
        },
        italicText: {
            fontStyle: 'italic',
            fontFamily: 'Georgia, serif',
            textAlign: 'center',
            marginBottom: '20px',
        },
        serviceOptions: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
        },
        serviceOptionItem: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '8px',
        },
        serviceLabel: {
            marginLeft: '8px',
        },
        button: {
            backgroundColor: '#C70C18', // Red color
            color: 'white',
            borderColor: '#C70C18',
            transition: 'background-color 0.3s, color 0.3s'
        },
    };

    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        styles.container = {
            ...styles.container,
            backgroundSize: "100%",
        };
    }

    return styles;
};
