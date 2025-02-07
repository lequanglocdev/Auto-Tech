import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/components/context/auth.context';

const Avartar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const { auth, setAuth } = React.useContext(AuthContext);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token'); // Xóa token khi đăng xuất
        setAuth({ isAuthenticated: false, user: null });
        navigate('/auth');
    };

    const handleLogin = () => {
        navigate('/admin');
    };

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Đăng xuất" sx={{ '& .MuiTooltip-tooltip': { fontSize: 20 } }}>
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32, backgroundColor: '#e74c3c' }}>
                            {auth.isAuthenticated && auth.user && auth.user.name ? auth.user.name[0] : 'A'}
                        </Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 50,
                                height: 20,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {auth.isAuthenticated ? (
                    <>
                        <MenuItem sx={{ fontSize: '1.6rem', fontWeight: '400' }}>Thông tin cá nhân</MenuItem>
                        <MenuItem sx={{ fontSize: '1.4rem', fontWeight: '600' }}>{auth.user.name}</MenuItem>
                        <MenuItem onClick={handleLogout} sx={{ fontSize: '1.4rem', fontWeight: '600' }}>
                            <ListItemIcon>
                                <Logout fontSize="large" />
                            </ListItemIcon>
                            Đăng xuất
                        </MenuItem>
                    </>
                ) : (
                    <MenuItem onClick={handleLogin} sx={{ fontSize: '1.4rem', fontWeight: '600' }}>
                        <ListItemIcon>
                            <LoginIcon fontSize="large" />
                        </ListItemIcon>
                        Đăng nhập
                    </MenuItem>
                )}
            </Menu>
        </React.Fragment>
    );
};

export default Avartar;
