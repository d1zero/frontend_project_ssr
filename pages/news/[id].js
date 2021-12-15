import { useRouter } from "next/router";
import Head from "next/head";
import { MainLayout } from "../../components/MainLayout";
import { Typography } from "@mui/material";
import Image from "next/image";
import Loader from "../../components/Loader/Loader";
import React from "react";
import { observer } from "mobx-react-lite";
import category from "../../store/category";
import Comments from "../../components/Comments/Comments";

const NewsDetail = observer(() => {
    const router = useRouter();

    const [news, setNews] = React.useState();
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setLoading(true);
        fetch(`https://demo-api.vsdev.space/api/articles/${router.query.id}`)
            .then((res) => res.json())
            .then((data) => {
                setTimeout(() => {
                    setNews(data);
                    setLoading(false);
                }, 1000);
            });
    }, [router.query.id]);

    return (
        <MainLayout>
            <Head>
                <title>Post #{router.query.id}</title>
            </Head>
            <div className="news-detail">
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <Typography variant="h2" align="center" gutterBottom>
                            {news.name}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {news.desc}
                        </Typography>
                        <Image
                            src={"/" + news.full_image}
                            alt={news.name}
                            height="400px"
                            width="600px"
                            loading="lazy"
                        />
                        <br />
                        {category?.categories[news.category]?.name ? (
                            <Typography variant="body1" gutterBottom>
                                Category:{" "}
                                {category?.categories[news.category]?.name}
                            </Typography>
                        ) : (
                            ""
                        )}

                        <Typography variant="caption" gutterBottom>
                            Published on {news.date}
                        </Typography>
                        <Comments article_id={router.query.id} />
                    </>
                )}
            </div>
        </MainLayout>
    );
});

export default NewsDetail;
