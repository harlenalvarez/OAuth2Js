/**
 * TokenService
 * @class
 * @classdesc Token storage service
 */
export class TokenStorage {
  constructor({storageType = 'local', accessTokenKey = 'ACT_OAUTH2_JS', stateKey = 'STATE_OAUTH2_JS'} = {}){
    this.StorageType = storageType;
    this.ACCESS_TOKEN_KEY = accessTokenKey;
    this.STATE_KEY = stateKey;
  }

  get storage() {
    return this.StorageType == 'local' ? localStorage : sessionStorage;
  }

  get AccessToken(){
    const stringValue = this.storage.getItem(this.ACCESS_TOKEN_KEY);
    return stringValue ? JSON.parse(stringValue) : null;
  }

  get State() {
    return this.storage.getItem(this.STATE_KEY);
  }

  set AccessToken(payload){
    this.storage.setItem(this.ACCESS_TOKEN_KEY, JSON.stringify(payload));
  }

  set State(payload) {
    this.storage.setItem(this.STATE_KEY, payload);
  }
}
