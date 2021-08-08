import React, { useEffect } from 'react';
import styles from './App.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, login, logout } from './features/userSlice';
import { Feeds } from './components/Feeds';
import { Auth } from './components/Auth';

const App: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <>
      {user.id ? (
        <div className={styles.app}>
          <Feeds />
        </div>
      ) : (
        <Auth />
      )}
    </>
  );
};

export default App;
