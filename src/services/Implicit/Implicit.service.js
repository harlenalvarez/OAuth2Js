import { OauthEndpoints, OauthConfig } from '../../config/OauthConfig';
import { NewGuid, GenerateLoginUrl } from '../utilities';
import { TokenStorage } from '../storage';


export class ImplicitService {
  /**
   * 
   * @param { OauthConfig } oauthConfig
   * @param { Object } dependencies - Mainly used for testing
   * @param { TokenStorage } dependencies.tokenStorage
   */
  constructor(oauthConfig, { tokenStorage = null } = {}) {
    if(!oauthConfig?.OauthEndpoints){
      throw new TypeError('OauthEndpoints is required');
    }
    if(!(oauthConfig?.OauthEndpoints instanceof OauthEndpoints)){
      throw new TypeError('OauthEndpoints most be of type OauthEndpoints');
    }
    
    this.oauthConfig = oauthConfig;
    this.login = this.login.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.tokenStorage = tokenStorage ?? new TokenStorage({storageType: oauthConfig.StorageType});
    this.onLoad();
  }

  /**
   * Directs user to login page
   * @param {string} state - Optional state, mainly used for testing
   */
  login(state=null) {
    const authUrl = GenerateLoginUrl({
      authEndpoint: this.oauthConfig?.OauthEndpoints?.AuthorizationEndpoint,
      responseType: 'token',
      clientId: this.oauthConfig?.ClientId,
      redirectUrl: this.oauthConfig?.RedirectUrl,
      scope: this.oauthConfig?.Scope,
      state: state || NewGuid()
    });
    window.location.assign(authUrl.href);
  }

  /**
   * Checks if token is in url
   * @returns {(string | null)} - Access Token or null
   */
  onLoad() {
    const redirectResponse = window.location.hash;
    if(!redirectResponse.includes('token_type')){
      return;
    }

    const tokenResponse = new URLSearchParams(window.location.hash.substring(1));
    if(tokenResponse.get('state') !== this.tokenStorage.State) {
      console.error('Invalid State');
      return;
    }
    const token = {
      accessToken: tokenResponse.get('access_token'),
      tokenType: tokenResponse.get('token_type'),
      expiration: tokenResponse.get('expires_in')
    };
    this.tokenStorage.AccessToken = token;
  }
}