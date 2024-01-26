import React from "react";

import './style.scss';
import { Container } from "react-bootstrap";

import Sidebar from "Component/Sidebar";

interface DefaultLayoutProps {
    children?: React.ReactNode;
}
export default function DefaultLayout({ children }: DefaultLayoutProps) {
    return (
        <Container fluid className="p-0 default-layout w-100 h-100">
            <Sidebar />
            <div className="content w-100">{children}</div>
        </Container>
    );
}