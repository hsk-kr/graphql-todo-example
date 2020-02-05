import React, { useState } from 'react';
import './styles.css';
import cookies from 'js-cookie';
import { client } from './ApolloClient';
import { ApolloProvider } from 'react-apollo';
import { COOKIE_TOKEN } from '../../shared/constants';
import Login from '../Login';
import TodoBoard from '../TodoBoard';

const App = () => {
  const [_reload, reload] = useState(false); // for reloading app
  const isLogin = cookies.get(COOKIE_TOKEN) !== undefined;

  return (
    <ApolloProvider client={client}>
      <div className="App">
        {isLogin ? (
          <TodoBoard
            onLogout={() => {
              client.cache.reset();
              cookies.remove(COOKIE_TOKEN); // remove a token cookie
              reload(!_reload);
            }}
          />
        ) : (
          <Login
            onLogin={token => {
              cookies.set(COOKIE_TOKEN, token); // save token into cookies
              reload(!_reload); // reloading
            }}
          />
        )}
      </div>
    </ApolloProvider>
  );
};

export default App;
