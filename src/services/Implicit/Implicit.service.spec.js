import { OauthConfig, OauthEndpoints } from "../../config/OauthConfig";
import { ImplicitService } from "./Implicit.service";
import { URLSearchParams } from "url";
import { NewGuid } from '../Utility';

var nodeCrypto = require('crypto');
global.crypto = {
    getRandomValues: function(buffer) { return nodeCrypto.randomFillSync(buffer);}
};

fdescribe('Implicit service', () => {
  it('Should set the oauth endpoints', ()=>{
    const endpoints = new OauthEndpoints({AuthorizationEndpoint: 'test.com', TokenEndpoint: 'test.com'});
    const config = createTestConfig(endpoints);
    const service = new ImplicitService(config);
    expect(service.oauthConfig.OauthEndpoints.AuthorizationEndpoint).toEqual('test.com');
  });

  it('Should throw an error if the oauth endpoinst is not of OauthEndpoints Type', () => {
    const config = createTestConfig({AuthorizationEndpoint: 'test.com', TokenEndpoint: 'test.com'})
    const expectionTest = () => new ImplicitService(config);
    expect(expectionTest).toThrow(TypeError);
  });

  it('Should throw an eror if endpoints is undefined', () => {
    const expectionTest = () => new ImplicitService(null);
    expect(expectionTest).toThrow(TypeError);
  });

  it('Should redirect to login page with correct params', () => {
    window.location.assign = jest.fn();
    const state = NewGuid();
    const config = createTestConfig(new OauthEndpoints({AuthorizationEndpoint: 'https://test.com', TokenEndpoint: 'https://test.com'}))
    const service = new ImplicitService(config);
    service.login(state);
    expect(window.location.assign).toBeCalledWith(`https://test.com/?response_type=id_token&client_id=test-clientId&redirect_uri=https%253A%252F%252FredirectUrl.com&scope=user.read%252Cuser.write&state=${state}`);
  });
});


function createTestConfig(endpoints) {
  const testConfig = new OauthConfig({
    Provider: 'AzureAD',
    GrandType: 'implicit',
    Scope: ['user.read', 'user.write'],
    ClientId: 'test-clientId',
    RedirectUrl: 'https://redirectUrl.com',
    AuthorizationMetadataUrl: 'wellknownconfig.com',
    OauthEndpoints: endpoints});
    return testConfig;
}