import React from "react";
import { Typography } from "@mui/material";

const Footer = () => {
    return (
        <footer
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#1976D2",
                width: "100%",
                color: "#fff",
                height: "64px",
                marginTop: "auto",
            }}
        >
            <Typography variant="h6">
                Made by&nbsp;
                <a
                    href="https://t.me/d1z3ro"
                    rel="noreferrer"
                    target="_blank"
                    style={{
                        color: "#ff7961",
                        textDecoration: "none",
                        "&:hover": {
                            color: "#ff7961",
                            textDecoration: "none",
                        },
                        "&:visited": {
                            color: "#ff7961",
                        },
                    }}
                >
                    d1zero
                </a>
            </Typography>
        </footer>
    );
};

export default Footer;
