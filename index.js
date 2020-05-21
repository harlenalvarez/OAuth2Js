import {  ImplicitService } from './src/index';

(function(document) {
  const grantType = document.getElementById('authGrant');
  const clientId = document.getElementById('clientIdInput');
  const metadataUrlInput = document.getElementById('metadataUrlInput');
  const audienceInput = document.getElementById('audienceInput');
  const redirectUrl = document.getElementById('redirectUrl');

  const button = document.getElementById('checkButton');
  button.addEventListener('click', () =>{
    console.log('clicked');
  })
})(document);