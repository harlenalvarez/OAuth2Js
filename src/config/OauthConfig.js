export class OauthEndpoints {
  constructor({AuthorizationEndpoint, TokenEndpoint, JwksUri, SupportedResponseType, LogoutRedirectUrl, Issuer }){
    const required = [];
    if(!AuthorizationEndpoint) {
      required.push('AuthorizationEndpoint');
    }
    if(!TokenEndpoint) {
      required.push('TokenEndpoint');
    }
    
    if(required.length) {
      throw new TypeError(`${required.join(', ')} param(s) required`);
    }
    this.AuthorizationEndpoint = AuthorizationEndpoint;
    this.TokenEndpoint = TokenEndpoint;
    this.JwksUri = JwksUri;
    this.SupportedResponseType = SupportedResponseType;
    this.LogoutRedirectUrl = LogoutRedirectUrl;
    this.Issuer = Issuer;
  }
}

export class OauthConfig {
  constructor({ Provider = 'AzureAD', GrandType = 'Implicit', Audience = '', Scope, ClientId, RedirectUrl, AuthorizationMetadataUrl, OauthEndpoints } = {}) {
    const required = [];
    const allowedProviders = ['AzureAD', 'Custom' ]
    if(!ClientId){
      required.push('ClientId');
    }
    if(!RedirectUrl) {
      required.push('RedirectUrl');
    }
    if(required.length){
      throw new TypeError(`${required.join(', ')} param(s) required`);
    }
    if(Scope && !(Scope instanceof Array)) {
      Scope = [Scope];
    }

    if(!allowedProviders.includes(Provider)) {
      throw new TypeError(`${Provider} is not yet allowed`);
    }
    if(!AuthorizationMetadataUrl && !OauthEndpoints) {
      throw new TypeError('AuthorizationMetadataUrl or OauthEndpoints object is required');
    }
    if(Provider === 'Custom' && !OauthEndpoints) {
      throw new TypeError('OauthEndpoints are required for custom provider');
    }
    this.Provider = Provider;
    this.GrandType = GrandType,
    this.ClientId = ClientId;
    this.RedirectUrl = RedirectUrl;
    this.Scope = Scope;
    this.AuthorizationMetadataUrl = AuthorizationMetadataUrl;
    this.OauthEndpoints = OauthEndpoints;
    this.Audience = Audience;
  }
}