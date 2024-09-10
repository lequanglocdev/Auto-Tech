import React from 'react';
import { Image, Container, Nav, Navbar } from 'react-bootstrap';
import styles from './Header.module.css';
import { useScroll } from '../hooks/useScroolTop';
import icons from '@/utils/icon';
import logo from "@/assets/logo.png"
const Header = () => {
    const isScrolled = useScroll(50);
    const { FaRegUserCircle } = icons;
    return (
        <Navbar
            bg="dark"
            variant="dark"
            expand="lg"
            className={`${styles.navbar} ${isScrolled ? styles.navbarFixed : ''}`}
        >
            <Container>
                <Navbar.Brand href="#home" className={styles.navbarBrand}>
                    <Image src={logo} alt="logo" className={styles.navLogo} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link href="#" className={styles.navText}>
                            TRANG CHỦ
                        </Nav.Link>
                        <Nav.Link href="#" className={styles.navText}>
                            DỊCH VỤ
                        </Nav.Link>
                        <Nav.Link href="#" className={styles.navText}>
                            THÔNG TIN
                        </Nav.Link>
                        <Nav.Link href="#" className={styles.navText}>
                            AUTO TECH
                        </Nav.Link>
                        <Nav.Link href="#" className={styles.navText}>
                            TIN TỨC
                        </Nav.Link>
                        <Nav.Link href='/auth' className={styles.navIcon}>
                            <FaRegUserCircle size={24} />
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
