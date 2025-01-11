import React, { useState, useEffect } from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

const Header: React.FC = () => {
    const [userName, setUserName] = useState<string>(localStorage.getItem("userName") || "Guest");

    useEffect(() => {
        const handleStorageChange = () => {
            setUserName(localStorage.getItem("userName") || "Guest");
        };

        // Listen for changes to localStorage
        window.addEventListener("storage", handleStorageChange);

        return () => {
            // Cleanup event listener on component unmount
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                    My App
                </Typography>
                <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                    <Typography sx={{ margin: "0 auto", textAlign: "center" }}>Dina Motors</Typography>
                    <Typography variant="subtitle1">User: {userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase()}</Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
