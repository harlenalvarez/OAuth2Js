import { OauthConfig, OauthEndpoints } from "../../config/OauthConfig";
import { ImplicitService } from "./Implicit.service";
import { NewGuid } from '../utilities';

import { MockCrypto } from '../utilities/MockUtilities';


MockCrypto();

describe('Implicit service', () => {
  beforeEach(() => {
    delete global.window.location;
    global.window = Object.create(window);
    global.window.location = {
      assign: jest.fn(),
      hash: '',
    };
  });

  it('Should set the oauth endpoints', () => {
    const endpoints = new OauthEndpoints({ AuthorizationEndpoint: 'test.com', TokenEndpoint: 'test.com' });
    const config = createTestConfig(endpoints);
    const service = new ImplicitService(config);
    expect(service.oauthConfig.OauthEndpoints.AuthorizationEndpoint).toEqual('test.com');
  });

  it('Should throw an error if the oauth endpoinst is not of OauthEndpoints Type', () => {
    const config = createTestConfig({ AuthorizationEndpoint: 'test.com', TokenEndpoint: 'test.com' })
    const expectionTest = () => new ImplicitService(config);
    expect(expectionTest).toThrow(TypeError);
  });

  it('Should throw an eror if endpoints is undefined', () => {
    const expectionTest = () => new ImplicitService(null);
    expect(expectionTest).toThrow(TypeError);
  });

  it('Should redirect to login page with correct params', () => {
    const state = NewGuid();
    const config = createTestConfig(new OauthEndpoints({ AuthorizationEndpoint: 'https://test.com', TokenEndpoint: 'https://test.com' }))
    const service = new ImplicitService(config);
    service.login(state);
    expect(window.location.assign).toBeCalledWith(`https://test.com/?response_type=token&client_id=test-clientId&redirect_uri=https%3A%2F%2FredirectUrl.com&scope=user.read%2Cuser.write&state=${state}`);
  });

  it('Should return if no authorization response in url', () => {
    const mockedTokenService = {
      State: jest.fn()
    };
    const service = new ImplicitService(createTestConfig(), { tokenStorage: mockedTokenService });
    expect(service.tokenStorage.State).toHaveBeenCalledTimes(0);
  });

  it('Should log invalid state and return', () => {
    const mockedTokenService = {};
    Object.defineProperty(mockedTokenService, 'State', {
      get: () => NewGuid()
    });
    global.window.location.hash = '#state=1234&access_token=testtoken&token_type=Bearer&expires_in=7200';
    console.error = jest.fn();
    const service = new ImplicitService(createTestConfig(), { tokenStorage: mockedTokenService });
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith('Invalid State');
  });

  it('Should save state and return', () => {
    const mockedTokenService = {};
    const testState = NewGuid();
    let resultAccessToken = '';
    Object.defineProperty(mockedTokenService, 'State', {
      get: () => testState
    });
    Object.defineProperty(mockedTokenService, 'AccessToken', {
      set: value => {resultAccessToken = value}
    });
    global.window.location.hash = `#state=${testState}&access_token=testtoken&token_type=Bearer&expires_in=7200`;
    console.error = jest.fn();
    const service = new ImplicitService(createTestConfig(), { tokenStorage: mockedTokenService });
    expect(console.error).toHaveBeenCalledTimes(0);
    expect(resultAccessToken).toEqual({accessToken: 'testtoken', expiration: '7200', tokenType: 'Bearer'});
  });
});


function createTestConfig(endpoints = new OauthEndpoints({ AuthorizationEndpoint: 'https://test.com', TokenEndpoint: 'https://test.com' })) {
  const testConfig = new OauthConfig({
    Provider: 'AzureAD',
    GrandType: 'implicit',
    Scope: ['user.read', 'user.write'],
    ClientId: 'test-clientId',
    RedirectUrl: 'https://redirectUrl.com',
    AuthorizationMetadataUrl: 'wellknownconfig.com',
    OauthEndpoints: endpoints
  });
  return testConfig;
}