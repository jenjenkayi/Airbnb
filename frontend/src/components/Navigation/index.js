import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();

  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser}/>
    )
  } else {
    sessionLinks = (
      <>
      <div className='nav-buttons'>
        <LoginFormModal />
        <SignupFormModal />
      </div>
      </>
    );
  }

  return (
      <div className='nav_wrapper'>
        <img
          className='nav_logo'
          src='https://user-images.githubusercontent.com/92122927/191908093-f94f94f2-c679-4e28-94e5-4d0ac62f8ba6.png'
          alt=""
          onClick={() => history.push('/')}
          >
          </img>
            {isLoaded && sessionLinks}
      </div>
  )
}

export default Navigation;