import React from "react";
import { CircularProgress } from "@mui/material";

const Loader = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                minHeight: "200px",
                alignItems: "center",
            }}
        >
            <CircularProgress color="secondary" />
        </div>
    );
};

export default Loader;
