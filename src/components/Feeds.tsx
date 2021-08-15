import React from 'react';
import { logout } from '../features/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../common/axios';
import { useCookies } from 'react-cookie';

type propTypes = {
  match: any;
  location: any;
  history: any;
};

export const Feeds: React.FC<propTypes> = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(['auth']);
  const logingout = () => {
    axios.get('/api/logout/').then((res) => {
      removeCookie('auth');
      props.history.push('');
    });
  };
  return (
    <div>
      Feed
      <button onClick={() => logingout()}>Logout</button>
    </div>
  );
};
