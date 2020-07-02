import { NewGuid, GenerateLoginUrl } from "./Oauth.utilities";
import { MockCrypto } from '../utilities/MockUtilities';

MockCrypto();

describe('Oauth Utilities', () => {
    const responseType = 'testResponse';
    const clientId = '1234';
    const scope = 'user.read';
    const state = NewGuid();
    const authEndpoint = 'http://testlogin.com';
    const redirectUrl = 'http://testredirect.com';

  it('Should Generate Login Url', () => {
    const actualLogin = GenerateLoginUrl({
      responseType,
      clientId,
      redirectUrl,
      scope,
      state,
      authEndpoint
    });

    expect(actualLogin.searchParams.get('response_type')).toEqual(responseType);
    expect(actualLogin.searchParams.get('client_id')).toEqual(clientId);
    expect(actualLogin.searchParams.get('state')).toEqual(state);
    expect(actualLogin.searchParams.get('scope')).toEqual(scope);
    expect(actualLogin.searchParams.get('redirect_uri')).toEqual(redirectUrl);
  });

  it('Should throw if auth endpoint is missing', () => {
    const executeGenerate = () => GenerateLoginUrl({
      responseType,
      clientId,
      redirectUrl,
      scope,
      state
    });
    expect(executeGenerate).toThrow('Missing auth endpoint');
  });

it('Should throw if response type is missing', () => {
    const executeGenerate = () => GenerateLoginUrl({
      authEndpoint,
      clientId,
      redirectUrl,
      scope,
      state
    });
    expect(executeGenerate).toThrow('Missing response type');
  });

  it('Should throw if client id is missing', () => {
    const executeGenerate = () => GenerateLoginUrl({
      authEndpoint,
      responseType,
      redirectUrl,
      scope,
      state
    });
    expect(executeGenerate).toThrow('Missing client id');
  });

  it('Should throw if redirect uri is missing', () => {
    const executeGenerate = () => GenerateLoginUrl({
      authEndpoint,
      responseType,
      clientId,
      scope,
      state
    });
    expect(executeGenerate).toThrow('Missing redirect url');
  });

it('Should throw if scope is missing', () => {
    const executeGenerate = () => GenerateLoginUrl({
      authEndpoint,
      responseType,
      clientId,
      redirectUrl,
      state
    });
    expect(executeGenerate).toThrow('Missing scope');
  });

  it('Should throw if state is missing', () => {
    const executeGenerate = () => GenerateLoginUrl({
      authEndpoint,
      responseType,
      clientId,
      redirectUrl,
      scope
    });
    expect(executeGenerate).toThrow('Missing state');
  });
});