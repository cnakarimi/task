import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <div style={{ flex: 1 }}>
                <Header />
                <main style={{ padding: "16px" }}>{children}</main>
            </div>
        </div>
    );
};

export default Layout;
