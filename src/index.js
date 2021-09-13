
import React from 'react';
import ReactDOM from 'react-dom';
import './Helper/Helper'
import App from './App';
import * as serviceWorker from './serviceWorker';
import Keycloak from 'keycloak-js';

const axios = require('axios');



var server = {
  'common': {
    'APP_NAME': 'ECO SALE',
  },
  'user': {

  }
};
global.App = {};
App.server = server;
var auth = () => {
  if (global.userInfo) return Promise.resolve(global.userInfo);
  var pathName = window.location.pathname;
  App.realm = pathName.replace(/[^\w]/g, '');
  if (!App.realm || App.realm === '') App.realm = 'demo';
  global.keycloak = new Keycloak({
    realm: "demo",
    url: "https://authen.ecolandvn.com/auth",
    clientId: 'base-auth',
  });

  return global.keycloak.init({ onLoad: 'check-sso' }).then(authenticated => {
    if (authenticated) {
      global.keycloak.loadUserInfo().then(userInfo => {
        axios.defaults.headers.common['authorization'] = `Bearer ${global.keycloak.token}`;
        global.userInfo = userInfo;
        global.keycloak.updateToken(15);
      });
    }
    else {
      global.keycloak.login();
    }
  })
}
App.baseApi = (link) => {

  return `https://apigateway.ecolandvn.com/base/v1/${App.realm}${link}`;
}

App.saleApi = (link) => {
  return `https://apigateway.ecolandvn.com/sale/v1/${App.realm}${link}`;
}

App.logout = () => {
  if (!App.keycloak) return;
  App.keycloak.logout();
}
auth().then((res) => {
  ReactDOM.render(<App />,
    document.getElementById('root')
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
