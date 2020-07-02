/**
 * Generates Unique Identifier
 * @returns {string} - Guid
 */
export function NewGuid() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

/**
 * 
 * @param {Object} UrlQueryValues - Auth url query property values
 * @param {string} UrlQueryValues.authEndpoint - Authorization endpoint
 * @param {string} UrlQueryValues.responseType - Response type for this request [token, idtoken, code, ...]
 * @param {string} UrlQueryValues.clientId - Client or Application Id
 * @param {string} UrlQueryValues.redirectUrl - Redirect url after login
 * @param {string} UrlQueryValues.scope - Scopes
 * @param {string} UrlQueryValues.state - Random guid to validate the response
 * @returns {URL} authUrl - URL with query params to redirect to
 */
export function GenerateLoginUrl({authEndpoint, responseType, clientId, redirectUrl, scope, state = ''}){
  if(!authEndpoint) throw new TypeError('Missing auth endpoint');
  if(!responseType) throw new TypeError('Missing response type');
  if(!clientId) throw new TypeError('Missing client id');
  if(!redirectUrl) throw new TypeError('Missing redirect url');
  if(!scope) throw new TypeError('Missing scope');
  if(!state) throw new TypeError('Missing state');
  
  const authUrl = new URL(authEndpoint);
  authUrl.searchParams.append('response_type', responseType);
  authUrl.searchParams.append('client_id', clientId);
  authUrl.searchParams.append('redirect_uri', redirectUrl);
  authUrl.searchParams.append('scope', scope);
  authUrl.searchParams.append('state', state);
  return authUrl;
}