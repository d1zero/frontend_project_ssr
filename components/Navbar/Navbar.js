import Link from "next/link";
import Image from "next/image";
import logo from "../../logo.svg";
import {
    AppBar,
    Toolbar,
    Link as MUILink,
    Typography,
    Container,
    TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import category from "../../store/category";

export function Navbar() {
    const [searchText, setSearchText] = React.useState("");

    React.useState(() => {
        fetch("https://demo-api.vsdev.space/api/categories")
            .then((res) => res.json())
            .then((data) => {
                category.setCategories(data);
            });
    }, []);

    const search = () => {
        console.log(searchText);
        setSearchText("");
    };

    return (
        <AppBar position="static">
            <Container
                fixed
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Toolbar disableGutters>
                    <Image src={logo} alt="logo" height="64px" width="64px" />
                    <MUILink component={Link} href="/">
                        <Typography
                            variant="h6"
                            style={{
                                margin: "0 10px",
                                cursor: "pointer",
                                color: "#fff !important",
                                paddingRight: "20px",
                                textDecoration: "none !important",
                                "&:hover": {
                                    color: "#fff",
                                    textDecoration: "none",
                                },
                                "&:visited": {
                                    color: "#fff",
                                    textDecoration: "none",
                                },
                            }}
                        >
                            Home
                        </Typography>
                    </MUILink>
                    <MUILink component={Link} href="/news">
                        <Typography
                            variant="h6"
                            style={{
                                cursor: "pointer",
                                color: "#fff !important",
                                paddingRight: "20px",
                                textDecoration: "none !important",
                                "&:hover": {
                                    color: "#fff",
                                    textDecoration: "none",
                                },
                                "&:visited": {
                                    color: "#fff",
                                    textDecoration: "none",
                                },
                            }}
                        >
                            News
                        </Typography>
                    </MUILink>
                </Toolbar>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <TextField
                        variant="standard"
                        label="Search"
                        color="warning"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{
                            marginBottom: "17px",
                            marginLeft: "10px",
                            marginTop: "-1px",
                        }}
                    />
                    <SearchIcon onClick={search} />
                </div>
            </Container>
        </AppBar>
    );
}
