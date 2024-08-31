import React from 'react';
import { Image, Container, Nav, Navbar } from 'react-bootstrap';
import './Header.css';
import { useScroll } from '../hooks/useScroolTop';
const Header = () => {
    const isScrolled = useScroll(50);

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className={`navbar ${isScrolled ? 'navbar-fixed' : ''}`}>
            <Container>
                <Navbar.Brand href="#home" className="navbar-brand">
                    <Image src="./logo.png" alt="logo" className="nav-logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link href="#home" className="nav-text">
                            TRANG CHỦ
                        </Nav.Link>
                        <Nav.Link href="#link" className="nav-text">
                            DỊCH VỤ
                        </Nav.Link>
                        <Nav.Link href="#link" className="nav-text">
                            GARA
                        </Nav.Link>
                        <Nav.Link href="#link" className="nav-text">
                            AUTO TECH
                        </Nav.Link>
                        <Nav.Link href="#link" className="nav-text">
                            TIN TỨC
                        </Nav.Link>
                        <Nav.Link href="#link" className="nav-text">
                            ĐĂNG NHẬP
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
