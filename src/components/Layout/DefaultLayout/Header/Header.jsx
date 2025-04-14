import React, { useContext } from 'react';
import { Image, Container, Nav, Navbar } from 'react-bootstrap';
import styles from './Header.module.css';
import icons from '@/utils/icon';
import logo from '@/assets/logo.png';
import { AuthContext } from '@/components/context/auth.context';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Header = () => {
    const { FaRegUserCircle, IoMdLogOut } = icons;
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        setAuth({
            isAuthenticated: false,
            user: null,
        });
        navigate('/'); 
    };
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className={styles.navbar}>
            <Container>
                <Navbar.Brand href="/" className={styles.navbarBrand}>
                    <Image src={logo} alt="logo" className={styles.navLogo} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link as={Link} to="/" className={styles.navText}>
                            TRANG CHỦ
                        </Nav.Link>
                        <Nav.Link as={Link} to="/services" className={styles.navText}>
                            DỊCH VỤ
                        </Nav.Link>
                        <Nav.Link as={Link} to="/intro" className={styles.navText}>
                            VỀ CHÚNG TÔI
                        </Nav.Link>
                        <Nav.Link as={Link} to="/blog" className={styles.navText}>
                            TIN TỨC
                        </Nav.Link>
                        {auth.isAuthenticated ? (
                            <>
                                <Nav.Link className={styles.navText}>
                                    <p>{auth?.user?.email}</p>
                                </Nav.Link>
                                <Nav.Link onClick={handleLogout} className={styles.navIcon}>
                                    <IoMdLogOut size={24} />
                                </Nav.Link>
                            </>
                        ) : (
                            <Nav.Link as={Link} to="/auth" className={styles.navIcon}>
                                <FaRegUserCircle size={24} />
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
