import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './BrowserNavigation.css';

function BrowserNavigation({ isLoaded }){
//   const sessionUser = useSelector(state => state.session.user);

//   let sessionLinks;
//   if (sessionUser) {
//     sessionLinks = (
//       <ProfileButton user={sessionUser} />
//     );
//   } else {
//     Redirect
//   }

  return (
    <div>
        <ProfileButton />
    <ul>

      <li>

        <NavLink exact to="/browser/dashboard">Home</NavLink>
        <NavLink exact to="/browser/notes">Notes</NavLink>
        <NavLink exact to="/browser/notebooks">Notebooks</NavLink>
        <NavLink exact to="/browser/tags">Tags</NavLink>
      </li>
    </ul>
    </div>
  );
}

export default BrowserNavigation;
