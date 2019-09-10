import { OauthConfig } from "./OauthConfig";

describe('OauthConfig', () => {
  it('Should Init With Implicit GrantType', () => {
    const config = new OauthConfig();
    expect(config.GrandType).toEqual('Implicit');
  })
})