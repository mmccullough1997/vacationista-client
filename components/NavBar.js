/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { useRouter } from 'next/router';
import logo from '../public/Vacationista Logo.png';
import { useAuth } from '../utils/context/authContext';
import { signIn, signOut } from '../utils/auth';

function NavBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { user } = useAuth();
  const router = useRouter();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="static" style={{ background: 'white' }}>
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              display: { xs: 'flex' },
              flexDirection: 'row',
              backgroundColor: 'white',
              justifyContent: 'space-between',
            }}
          >
            <Paper sx={{
              display: { xs: 'none', md: 'flex' }, mr: 1, width: 100, background: 'none', boxShadow: 'none',
            }}
            >
              <Image src={logo} onClick={() => router.push('/')} />
            </Paper>
            <Typography
              variant="h6"
              noWrap
              component="a"
              onClick={() => router.push('/')}
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'black',
                textDecoration: 'none',
              }}
            >
              Vacationista
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} />

            <Paper sx={{
              display: { xs: 'flex', md: 'none' }, mr: 1, width: 100, background: 'none', boxShadow: 'none',
            }}
            >
              <Image src={logo} onClick={() => router.push('/')} />
            </Paper>
            <Typography
              variant="h5"
              noWrap
              component="a"
              onClick={() => router.push('/')}
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'black',
                textDecoration: 'none',
              }}
            >
              Vacationista
            </Typography>

            <Box sx={{ display: 'flex' }}>

              { user.uid ? (
                <>
                  <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, marginRight: 3 }}>
                    <Button sx={{ color: 'black' }} />
                  </Box>
                  <Tooltip title="User settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar src={user.image} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem>
                      <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                    <MenuItem>
                      <Typography onClick={() => router.push('/trips/mytrips')} textAlign="center">My Trips</Typography>
                    </MenuItem>
                    <MenuItem onClick={signOut}>
                      <Typography sx={{ color: 'red' }} textAlign="center">Sign Out</Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, marginRight: 3 }}>
                  <Button onClick={signIn} className="color">
                    Sign in
                  </Button>
                </Box>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          style={{ background: 'lightgray', opacity: 0.6 }}
          sx={{ justifyContent: 'space-between' }}
        >
          <BottomNavigationAction style={{ color: 'black' }} label="A MM Production" />
          <BottomNavigationAction onClick={() => router.push('/aboutUs')} style={{ color: 'black' }} label="About us" />
        </BottomNavigation>
      </Paper>
    </>
  );
}
export default NavBar;
