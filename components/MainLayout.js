import React from "react";
import Footer from "./Footer/Footer";
import { Navbar } from "./Navbar/Navbar";
import { Container } from "@mui/material";

export function MainLayout({ children }) {
    return (
        <React.Fragment>
            <Navbar />
            <Container fixed style={{ paddingBottom: "64px" }}>
                {children}
            </Container>

            <Footer />
        </React.Fragment>
    );
}
