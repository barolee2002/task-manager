import React from "react";

import './style.scss';
import { Container } from "react-bootstrap";

// import Sidebar from "Component/Sidebar";
import TopBar from "Component/TopBar";

interface DefaultLayoutProps {
    children?: React.ReactNode;
}
export default function DefaultLayout({ children }: DefaultLayoutProps) {
    return (
        <Container fluid className="p-0 default-layout w-100 h-100">
            {/* <Sidebar /> */}
            <TopBar />
            <div className="content h-100">{children}</div>
        </Container>
    );
}