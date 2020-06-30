import { OauthEndpoints } from "../../config/OauthConfig";
import { NewGuid, GenerateLoginUrl } from "../Utility";


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

  getAccessTokenAsync() {

  }
}