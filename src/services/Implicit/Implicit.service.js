import { OauthEndpoints } from "../../config/OauthConfig";
import { NewGuid } from "../Utility";


export class ImplicitService {
  constructor(oauthConfig) {
    if(!oauthConfig?.OauthEndpoints){
      throw new TypeError('OauthEndpoints is required');
    }
    if(!(oauthConfig?.OauthEndpoints instanceof OauthEndpoints)){
      throw new TypeError('OauthEndpoints most be of type OauthEndpoints');
    }
    
    this.oauthConfig = oauthConfig;
    this.login = this.login.bind(this);
    this.getAccessTokenAsync = this.getAccessTokenAsync.bind(this);
  }

  login(state='') {
    const authUrl = new URL(this.oauthConfig.OauthEndpoints.AuthorizationEndpoint);
    authUrl.searchParams.append('response_type', 'token');
    authUrl.searchParams.append('client_id', this.oauthConfig?.ClientId);
    authUrl.searchParams.append('redirect_uri', this.oauthConfig.RedirectUrl);
    authUrl.searchParams.append('scope', this.oauthConfig.Scope);
    authUrl.searchParams.append('state', state || NewGuid());
    window.location.assign(authUrl.href);
  }

  getAccessTokenAsync() {

  }
}