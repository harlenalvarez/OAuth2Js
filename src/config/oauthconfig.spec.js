import { OauthConfig, OauthEndpoints } from "./OauthConfig";

describe('OauthConfig', () => {
  it('Should Init With Implicit GrantType', () => {
    const config = new OauthConfig({ClientId: '123', RedirectUrl: 'test.com', AuthorizationMetadataUrl: 'test.com'});
    expect(config.GrandType).toEqual('Implicit');
  });

  it('Should set grant type', () => {
    const config = new OauthConfig({ GrandType: 'implicit', ClientId: '123', RedirectUrl: 'test.com', AuthorizationMetadataUrl: 'test.com' });
    expect(config.GrandType).toEqual('implicit');
  });

  it('Should set the clientId', () => {
    const config = new OauthConfig({ ClientId: '123', ClientId: '123', RedirectUrl: 'test.com', AuthorizationMetadataUrl: 'test.com'});
    expect(config.ClientId).toEqual('123');
  });

  it('Should throw error if client id is not passed in', () => {
    const testException = () => new OauthConfig({RedirectUrl: 'test.com'});
    expect(testException).toThrow(TypeError);
  });

  it('Should set RedirectUrl', () => {
    const config = new OauthConfig({ClientId: '123', RedirectUrl: 'test.com', AuthorizationMetadataUrl: 'test.com'});
    expect(config.RedirectUrl).toEqual('test.com');
  });

  it('Should throw if RedirectUrl is missing',() =>{
    const testException = () => new OauthConfig({ClientId: 123});
    expect(testException).toThrow(TypeError);
  });

  it('Should set scope', () => {
    const config = new OauthConfig({ClientId: 123, RedirectUrl: 'test.com', Scope: ['user.read', 'user.write'], AuthorizationMetadataUrl: 'test.com'});
    expect(config.Scope.length).toEqual(2);
    expect(config.Scope[0]).toEqual('user.read');
    expect(config.Scope[1]).toEqual('user.write');
  });

  it('Should set the scope to undefined if not provided', () => {
    const config =  new OauthConfig({ClientId: 123, RedirectUrl: 'test.com', AuthorizationMetadataUrl: 'test.com'});
    expect(config.Scope).toBeUndefined();
  });

  it('Should turn scope to array if is not array', () => {
    const config =  new OauthConfig({ClientId: 123, RedirectUrl: 'test.com', Scope: 'user.read', AuthorizationMetadataUrl: 'test.com'});
    expect(config.Scope).toBeInstanceOf(Array);
  });

  it('Should set OauthConfig', () => {
    const oauthEndpoints = new OauthEndpoints({AuthorizationEndpoint: 'test.com', TokenEndpoint: 'test.com'});
    const config = new OauthConfig({ClientId: 123, RedirectUrl: 'test.com', Scope: 'user.read', OauthEndpoints:oauthEndpoints});
    expect(config.OauthEndpoints.AuthorizationEndpoint).toEqual('test.com');
  });
});