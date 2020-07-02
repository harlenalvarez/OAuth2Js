import { TokenStorage } from "./token.storage";
import { NewGuid } from '../utilities';

import { MockCrypto } from '../utilities/MockUtilities';

MockCrypto();

describe('Token storage service', () => {
  it('Should create service with defaults', () => {
    const tokenService = new TokenStorage();
    expect(tokenService.StorageType).toEqual('local');
    expect(tokenService.ACCESS_TOKEN_KEY).toEqual('ACT_OAUTH2_JS');
    expect(tokenService.STATE_KEY).toEqual('STATE_OAUTH2_JS');
  });
  it('Should return instance of local storage', () => {
    const tokenService = new TokenStorage();
    expect(tokenService.storage).toBe(localStorage);
    expect(tokenService.storage).not.toBe(sessionStorage);
  });

  it('Shouldreturn instance of session storage', () => {
    const tokenService = new TokenStorage({storageType:'session'});
    expect(tokenService.storage).toBe(sessionStorage);
    expect(tokenService.storage).not.toBe(localStorage);
  })

  it('Should save token to storage', () => {
    Storage.prototype.setItem = jest.fn();
    const testObject = { var: 'foo'};
    const tokenService = new TokenStorage();
    tokenService.AccessToken = testObject;
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(window.localStorage.setItem).toBeCalledWith(tokenService.ACCESS_TOKEN_KEY, JSON.stringify(testObject));
  });

  it('Should get token from storage', () => {
    const testObject = { var: 'foo'};
    Storage.prototype.getItem = jest.fn().mockReturnValue(JSON.stringify(testObject));
    const tokenService = new TokenStorage();
    const tokenValue = tokenService.AccessToken;
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(window.localStorage.getItem).toBeCalledWith(tokenService.ACCESS_TOKEN_KEY);
    expect(tokenValue).toEqual(testObject);
  });

  it('Should save state to storage', () => {
    Storage.prototype.setItem = jest.fn();
    const testObject = { var: 'foo'};
    const tokenService = new TokenStorage();
    const testState = NewGuid();
    tokenService.State = testState;
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(window.localStorage.setItem).toBeCalledWith(tokenService.STATE_KEY, testState);
  });

  it('Should get state from storage', () => {
    const testState = NewGuid();
    Storage.prototype.getItem = jest.fn().mockReturnValue(testState);
    const tokenService = new TokenStorage();
    const actualState = tokenService.State;
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(window.localStorage.getItem).toBeCalledWith(tokenService.STATE_KEY);
    expect(actualState).toEqual(testState);
  });

});