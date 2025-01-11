import React from "react";
import { List, ListItem, ListItemText, Drawer } from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
    return (
        <Drawer variant="permanent" anchor="left">
            <List>
                <ListItem
                    button
                    component={Link as React.ElementType}
                    to="/"
                >
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem
                    button
                    component={Link as React.ElementType}
                    to="/todo"
                >
                    <ListItemText primary="To-Do List" />
                </ListItem>
                <ListItem
                    button
                    component={Link as React.ElementType}
                    to="/weather"
                >
                    <ListItemText primary="Weather" />
                </ListItem>
                <ListItem
                    button
                    component={Link as React.ElementType}
                    to="/profile"
                >
                    <ListItemText primary="Profile" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;
