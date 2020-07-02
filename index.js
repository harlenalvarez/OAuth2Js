import {  ImplicitService, OauthEndpoints, OauthConfig } from './src/index';

(function(document) {
  const grantType = document.getElementById('authGrant');
  const clientId = document.getElementById('clientIdInput');
  const tokenEndpoint = document.getElementById('tokenUrlInput');
  const authEndpoint = document.getElementById('authUrlInput');
  const audienceInput = document.getElementById('audienceInput');
  const redirectUrl = document.getElementById('redirectUrl');
  const scopes = document.getElementById('scopesInput');
  
  const button = document.getElementById('checkButton');
  button.addEventListener('click', () =>{
    const oathEndpoints = new OauthEndpoints({AuthorizationEndpoint:authEndpoint.value, TokenEndpoint: tokenEndpoint.value});
    const oauthConfig = new OauthConfig({RedirectUrl: redirectUrl.value, ClientId:clientId.value, OauthEndpoints: oathEndpoints, Scope:[...scopes.value.split(',')]});
    const service = new ImplicitService(oauthConfig);
    service.login();
  })
})(document);