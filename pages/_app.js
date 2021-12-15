import "normalize.css";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />
            <style jsx global>
                {`
                    #__next {
                        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
                        display: flex;
                        flex-direction: column;
                        min-height: 100vh;
                    }
                    html {
                        overflow-y: scroll;
                    }
                `}
            </style>
        </>
    );
}

export default MyApp;
