export class OauthConfig {
  constructor({ GrandType = 'Implicit', ClientId = 's'} = {}) {
    this.GrandType = GrandType,
    this.ClientId = ClientId;
  }
}