import { Container, Nav, Navbar, NavbarBrand, NavbarCollapse, NavbarToggle, NavLink } from "react-bootstrap"
import LogOutButton from "@/components/logButton"

export const SiteNav = () => (
    <Navbar expand="lg">
    <Container>
      <NavbarBrand href="/">List App</NavbarBrand>
      <NavbarToggle/>
      <NavbarCollapse>
        <Nav>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/admin">Admin</NavLink>
          <NavLink href="/register">Register</NavLink>
        </Nav>
      </NavbarCollapse>
      <LogOutButton/>
    </Container>
  </Navbar>
)