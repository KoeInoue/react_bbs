import React, { useEffect, useContext } from 'react';
import styles from './App.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, login, logout } from './features/userSlice';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Feeds } from './components/Feeds';
import { Auth } from './components/Auth';
import { Register } from './components/Register';
import { useCookies } from 'react-cookie';

const App: React.FC = (props) => {
  const [cookies, setCookie] = useCookies(['auth']);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      {cookies.auth ? (
        <TransitionGroup>
          <CSSTransition classNames="fade" timeout={300}>
            <Switch>
              <Route path="/home" component={Feeds}></Route>
              <Route>
                <Redirect to="/home" />
              </Route>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      ) : (
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
      )}
    </BrowserRouter>
  );
};

export default App;
