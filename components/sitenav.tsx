"use client";

import { Container, Nav, Navbar, NavbarBrand, NavbarCollapse, NavbarToggle, NavLink } from "react-bootstrap"
import LogOutButton from "@/components/logButton"
import { useSession } from "next-auth/react";

export const SiteNav = () => {
    const {data} = useSession();
    return (
        <Navbar expand="lg" bg="dark" variant="dark" className="custom-navbar">
            <Container>
                <NavbarBrand href="/">LIST APP</NavbarBrand>
                <NavbarToggle aria-controls="basic-navbar-nav" />
                <NavbarCollapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink href="/" className="nav-link">Home</NavLink>
                        {data?.user.role === 'admin' && <NavLink href="/admin" className="nav-link">Admin</NavLink>}
                        {!data && <NavLink href="/register" className="nav-link">Register</NavLink>}
                        {data && <NavLink href="/account" className="nav-link">Account</NavLink>}
                    </Nav>
                </NavbarCollapse>
                <LogOutButton/>
            </Container>
        </Navbar>
    )
}
