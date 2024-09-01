import React from 'react';
import { Image, Container, Nav, Navbar } from 'react-bootstrap';
import styles from './Header.module.css';
import { useScroll } from '../hooks/useScroolTop';
import icons from '@/utils/icon';
const Header = () => {
    const isScrolled = useScroll(50);
    const { FaRegUserCircle } = icons;
    return (
        <Navbar
            bg="dark"
            variant="dark"
            expand="lg"
            className={`${styles.navbar} ${isScrolled ? styles['navbar-fixed'] : ''}`}
        >
            <Container>
                <Navbar.Brand href="#home" className={styles['navbar-brand']}>
                    <Image src="./logo.png" alt="logo" className={styles['nav-logo']} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link href="#home" className={styles['nav-text']}>
                            TRANG CHỦ
                        </Nav.Link>
                        <Nav.Link href="#link" className={styles['nav-text']}>
                            DỊCH VỤ
                        </Nav.Link>
                        <Nav.Link href="#link" className={styles['nav-text']}>
                            GARA
                        </Nav.Link>
                        <Nav.Link href="#link" className={styles['nav-text']}>
                            AUTO TECH
                        </Nav.Link>
                        <Nav.Link href="#link" className={styles['nav-text']}>
                            TIN TỨC
                        </Nav.Link>
                        <Nav.Link href="#link" className={styles['nav-icon']}>
                            <FaRegUserCircle size={24} />
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
