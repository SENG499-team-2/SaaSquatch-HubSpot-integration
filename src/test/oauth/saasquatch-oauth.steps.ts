/**
 * Integration tests for testing the interaction between the integration and Saasquatch's API JWT.
 */

import { loadFeature, defineFeature } from 'jest-cucumber';
import { getSaasquatchToken } from '../../routes/oath';

const SaasquatchOauthDetails = loadFeature('features/Oauth/Low-Level/Saasquatch-Oauth-Details.feature', {
    tagFilter: 'not @manual',
});

defineFeature(SaasquatchOauthDetails, (test) => {
    test('Integration requests auth0 JWT from Saasquatch correctly', ({ given, when, then, and }) => {
        let data: any;

        given("The integration is enabled on the tennant's integrations page", () => {
            // Done manually
        });

        and('The integration needs a new JWT from Saasquatch', () => {
            // The previous JWT is expired, etc.
        });

        when("The integration sends a post request to Saasquatch's auth0 sever", async () => {
            try {
                data = await getSaasquatchToken();
            } catch (e) {
                expect(e).toBeUndefined();
            }
        });

        and("Includes a 'grant_type' parameter that has a value of 'client_credentials'", () => {
            // Done in getSaasquatchToken()
        });

        and("Includes a 'client_id' parameter that has a value of the integration's client ID", () => {
            // Done in getSaasquatchToken()
        });

        and("Includes a 'client_secret' parameter that has a value of the integration's client secret", () => {
            // Done in getSaasquatchToken()
        });

        and("Includes a 'audience' parameter that has a value of 'https://staging.referralsaasquatch.com'", () => {
            // Done in getSaasquatchToken()
        });

        then('A new JWT should be included in the response', () => {
            expect(data['access_token']).toBeDefined();
        });
    });
});
