import React from 'react';

//Bootstrap
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

//Component
import SearchBox from './SearchBox';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  logoutActionCreator,
  resetUserUpdateActionCreator,
  resetUserDetailsActionCreator,
  resetUserRegisterActionCreator,
} from '../redux/slices/userSlice';

import {
  resetListActionCreator,
  resetFavoritesActionCreator,
} from '../redux/slices/recipeSlice';

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleLogout = () => {
    dispatch(logoutActionCreator());
    dispatch(resetUserUpdateActionCreator());
    dispatch(resetUserDetailsActionCreator());
    dispatch(resetUserRegisterActionCreator());
    dispatch(resetListActionCreator());
    dispatch(resetFavoritesActionCreator());
    localStorage.removeItem('userInfo');
  };

  return (
    <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>Recipe App</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <SearchBox />
          <Nav className='ms-auto'>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/recipes/favorites'>
                  <NavDropdown.Item>Favorites</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to='/login'>
                <Nav.Link>
                  <i className='fas fa-user'></i> Sign in
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
