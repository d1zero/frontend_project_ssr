import Head from "next/head";
import { MainLayout } from "../components/MainLayout";
import React from "react";
import Loader from "../components/Loader/Loader";
import Image from "next/image";
import { Container, Typography } from "@mui/material";
import Link from "next/link";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Autoplay, Pagination, Navigation]);

export default function Index() {
    const [news, setNews] = React.useState();
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setLoading(true);
        fetch("https://demo-api.vsdev.space/api/articles")
            .then((res) => res.json())
            .then((data) => {
                setTimeout(() => {
                    setNews(data);
                    setLoading(false);
                }, 1000);
            });
    }, []);

    return (
        <MainLayout>
            <Head>
                <title>Main page</title>
            </Head>
            <div style={{ marginTop: "100px" }}>
                <Typography variant="h2" align="center" gutterBottom>
                    Hello and welcome to our news portal!
                </Typography>
                <Typography variant="h4" align="center" gutterBottom>
                    Go to{" "}
                    <Link
                        href="/news"
                        style={{
                            color: "#ff7961",
                            textDecoration: "none !important",
                            "&:hover": {
                                color: "#ff7961",
                                textDecoration: "none",
                            },
                            "&:visited": {
                                color: "#ff7961",
                            },
                        }}
                    >
                        news
                    </Link>{" "}
                    to check out fresh news
                </Typography>
                {!loading ? (
                    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
                        <Swiper
                            spaceBetween={100}
                            slidesPerView={1}
                            navigation={true}
                            autoplay={{ delay: 3000 }}
                            pagination={{ clickable: true }}
                            allowTouchMove
                            loop
                        >
                            {news
                                .filter((news) => news.slider === true)
                                .map((news) => (
                                    <SwiperSlide
                                        key={news.id}
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Image
                                            src={"/" + news.preview_image}
                                            alt={news.id}
                                            height="300px"
                                            width="450px"
                                            objectFit="cover"
                                        />
                                    </SwiperSlide>
                                ))}
                        </Swiper>
                    </Container>
                ) : (
                    <Loader />
                )}
            </div>
        </MainLayout>
    );
}
