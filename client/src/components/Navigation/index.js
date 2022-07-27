import React from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Box from "@material-ui/core/Box";
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import history from './history';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

const Navigation = ({ authUser }) => (
  <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
);

const NavigationAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);


const NavBar = ({pages}) => {

  return (
    <AppBar position="static" style={{ padding:'12px',background: '#003F87' }}>
      <Container maxWidth="xl">
          <Box justifyContent='center'>
            {pages.map((page) => (
              <Button
                style={{ color:'white' }}
                key={page}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link to={page[1]} style={{color:'white', cursor:'pointer', textDecoration: 'none'}}>{page[0]}</Link>
              </Button>
            ))}
          </Box>
      </Container>
    </AppBar>
  );
};

export default NavBar;