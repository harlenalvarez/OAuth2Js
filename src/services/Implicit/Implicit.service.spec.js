import { OauthConfig, OauthEndpoints } from "../../config/OauthConfig";
import { ImplicitService } from "./Implicit.service";
import { NewGuid } from '../Utility';

var nodeCrypto = require('crypto');
global.crypto = {
    getRandomValues: function(buffer) { return nodeCrypto.randomFillSync(buffer);}
};

describe('Implicit service', () => {
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
    expect(window.location.assign).toBeCalledWith(`https://test.com/?response_type=token&client_id=test-clientId&redirect_uri=https%3A%2F%2FredirectUrl.com&scope=user.read%2Cuser.write&state=${state}`);
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