import React from 'react';
import { logout } from '../features/userSlice';
import { useSelector, useDispatch } from 'react-redux';

export const Feeds: React.FC = () => {
  const dispatch = useDispatch();
  const logingout = () => {
    dispatch(logout());
  };
  return (
    <div>
      Feed
      <button onClick={() => logingout()}>Logout</button>
    </div>
  );
};
