import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import icons from '@/utils/icon';
import styles from './NavAdmin.module.css';
import logo from '@/assets/logoAdmin.png';
import staff from '@/assets/staff1.jpg';
const NavAdmin = ({ Toggle }) => {
    const { FaBarsStaggered, FaRegBell } = icons;
    return (
        <div className={styles.navAdmin}>
            <div className={styles.navAdminLeft}>
                <img src={logo} alt="loggo" className={styles.navAdminImage} />
            </div>
            <div className={styles.navAdminCenter}>
                <FaBarsStaggered onClick={Toggle} className={styles.navAdminIcon} />
                <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className={`${styles.navAdminInput} me-2`}
                        size="lg"
                        aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                </Form>
            </div>
            <div className={styles.navAdminRight}>
                <FaRegBell className={styles.navAdminIconBell}  />
                <div></div>
                <Navbar expand="lg" className="bg-body-tertiary p-0">
                    <img src={staff} alt="" className={styles.navAdminAvatar} />
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown" align="end">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Navbar>
            </div>
        </div>
    );
};

export default NavAdmin;
