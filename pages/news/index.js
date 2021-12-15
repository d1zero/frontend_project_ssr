import Head from "next/head";
import { MainLayout } from "../../components/MainLayout";
import React from "react";
import { Typography, Button } from "@mui/material";
import Image from "next/image";
import Loader from "../../components/Loader/Loader";
import category from "../../store/category";
import { observer } from "mobx-react-lite";
import Router from "next/router";

const News = observer(() => {
    const [news, setNews] = React.useState();
    const [loading, setLoading] = React.useState(true);

    const linkClickHandler = (item) => {
        console.log(item);
        Router.push(`/news/${item.id}`);
    };

    React.useEffect(() => {
        setLoading(true);
        fetch("https://demo-api.vsdev.space/api/articles")
            .then((res) => res.json())
            .then((data) => {
                setTimeout(() => {
                    setNews(data);
                    setLoading(false);
                    console.log(data);
                }, 1000);
            });
    }, []);

    return (
        <MainLayout>
            <Head>
                <title>News page</title>
            </Head>
            <div className="news">
                <Typography variant="h1" align="center">
                    News
                </Typography>
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        {news.map((post) => (
                            <div key={post.id} style={{ marginTop: "30px" }}>
                                <Typography variant="h4" gutterBottom>
                                    {post.name}
                                </Typography>
                                <Image
                                    src={"/" + post.preview_image}
                                    alt={post.name}
                                    height="400px"
                                    width="600px"
                                />
                                {category?.categories[post.category - 1]
                                    ?.name ? (
                                    <Typography
                                        variant="body1"
                                        gutterBottom
                                        style={{ marginTop: "5px" }}
                                    >
                                        Category:{" "}
                                        {
                                            category?.categories[
                                                post.category - 1
                                            ]?.name
                                        }
                                    </Typography>
                                ) : (
                                    ""
                                )}
                                <Typography
                                    variant="body2"
                                    gutterBottom
                                    style={{ marginTop: "5px" }}
                                >
                                    {post.shortDesc}
                                </Typography>
                                <Button
                                    variant="contained"
                                    style={{ marginTop: "5px" }}
                                    onClick={() =>
                                        Router.push(`/news/${post.id}`)
                                    }
                                >
                                    Подробнее
                                </Button>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </MainLayout>
    );
});

export default News;
