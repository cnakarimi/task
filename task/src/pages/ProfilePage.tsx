import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Typography, Box } from "@mui/material";

const ProfilePage: React.FC = () => {
    const [name, setName] = useState<string>(() => localStorage.getItem("userName") || "");
    const [theme, setTheme] = useState<string>(() => localStorage.getItem("theme") || "light");
    const [language, setLanguage] = useState<string>(() => localStorage.getItem("language") || "en");

    useEffect(() => {
        localStorage.setItem("theme", theme);
        localStorage.setItem("language", language);
    }, [theme, language]);

    const handleSaveName = () => {
        localStorage.setItem("userName", name);
        window.location.reload(); // Reload the page after saving the name
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={4}
        >
            <Typography variant="h4" gutterBottom>
                Profile
            </Typography>

            {/* Update Name */}
            <Box mb={4}>
                <Typography variant="h6">Update Name</Typography>
                <TextField
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    variant="outlined"
                    fullWidth
                />
                <Button onClick={handleSaveName} variant="contained" color="primary" sx={{ mt: 2 }}>
                    Save
                </Button>
            </Box>

            {/* App Theme */}
            <Box mb={4}>
                <Typography variant="h6">App Theme</Typography>
                <FormControl fullWidth margin="dense">
                    <InputLabel>Theme</InputLabel>
                    <Select
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                        label="Theme"
                    >
                        <MenuItem value="light">Light</MenuItem>
                        <MenuItem value="dark">Dark</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Preferred Language */}
            <Box>
                <Typography variant="h6">Preferred Language</Typography>
                <FormControl fullWidth margin="dense">
                    <InputLabel>Language</InputLabel>
                    <Select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        label="Language"
                    >
                        <MenuItem value="en">English</MenuItem>
                        <MenuItem value="fa">فارسی</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Box>
    );
};

export default ProfilePage;
