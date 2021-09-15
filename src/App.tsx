import React, { useEffect, useContext } from 'react';
import styles from './App.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, login, logout } from './features/userSlice';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Home } from './components/Home';
import { Auth } from './components/Auth';
import { Register } from './components/Register';
import { useCookies } from 'react-cookie';

const App: React.VFC = (props) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      login({
        id: localStorage.getItem('id'),
        name: localStorage.getItem('name'),
        token: localStorage.getItem('token'),
      }),
    );
  }, [dispatch]);

  return (
    <BrowserRouter>
      {!user.token && localStorage.getItem('token') == null ? (
        <TransitionGroup>
          <CSSTransition classNames="fade" timeout={300}>
            <Switch>
              <Route exact path="/" component={Auth} />
              <Route path="/register/:token" component={Register} />
              <Route>
                <Redirect to="/" />
              </Route>
              <Route>
                <div className={styles.center}>
                  <h1>Not Found</h1>
                  <Link to="/">←Home</Link>
                </div>
              </Route>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      ) : (
        <TransitionGroup>
          <CSSTransition classNames="fade" timeout={300}>
            <Switch>
              <Route exact path="/home" render={(props) => <Home page={0} {...props} />}></Route>
              <Route path="/post" render={(props) => <Home page={1} {...props} />}></Route>
              <Route path="/concurrency" render={(props) => <Home page={2} {...props} />}></Route>
              <Route>
                <Redirect to="/home" />
              </Route>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
    </BrowserRouter>
  );
};

export default App;
