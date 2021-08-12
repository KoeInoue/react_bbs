import React, { useEffect, useContext } from 'react';
import styles from './App.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, login, logout } from './features/userSlice';
import { BrowserRouter, Route, Switch, Link, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Feeds } from './components/Feeds';
import { Auth } from './components/Auth';
import { Register } from './components/Register';

const App: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      {user.id ? (
        <TransitionGroup>
          <CSSTransition classNames="fade" timeout={300}>
            <Switch>
              <Route path="/home">
                <div className={styles.app}>
                  <Feeds />
                </div>
              </Route>
              <Route>
                <div className={styles.center}>
                  <h1>Not Found</h1>
                  <Link to="/home">←Home</Link>
                </div>
              </Route>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      ) : (
        <TransitionGroup>
          <CSSTransition classNames="fade" timeout={300}>
            <Switch>
              <Route exact path="/">
                <Auth />
              </Route>
              <Route path="/register/:token" component={Register} />
              <Route>
                <div className={styles.center}>
                  <h1>Not Found</h1>
                  <Link to="/">←Home</Link>
                </div>
              </Route>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
    </BrowserRouter>
  );
};

export default App;
