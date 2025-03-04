import { Container, Nav, Navbar, NavbarBrand, NavbarCollapse, NavbarToggle, NavLink } from "react-bootstrap"
import LogOutButton from "@/components/logButton"

export const SiteNav = () => (
    <Navbar expand="lg" bg="dark" variant="dark" className="custom-navbar">
      <Container>
        <NavbarBrand href="/">List App</NavbarBrand>
        <NavbarToggle aria-controls="basic-navbar-nav" />
        <NavbarCollapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink href="/" className="nav-link">Home</NavLink>
            <NavLink href="/admin" className="nav-link">Admin</NavLink>
            <NavLink href="/register" className="nav-link">Register</NavLink>
            <NavLink href="/account" className="nav-link">Account</NavLink>
          </Nav>
        </NavbarCollapse>
        <LogOutButton/>
      </Container>
    </Navbar>

)