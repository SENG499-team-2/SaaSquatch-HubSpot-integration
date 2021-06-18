import { loadFeature, defineFeature } from 'jest-cucumber';
import {tokenStore} from "../routes/oath";
import {HubApiCall} from "../routes/oath";
const connection = loadFeature('features/Connection.feature');
const axios = require("axios");


const errorCall = async () => {
    try {
        //#todo update this api url below to have access token
        var options = {
            method: 'GET',
            url: 'https://api.hubapi.com/crm/v3/objects/contacts',
            qs: {limit: '10', archived: 'false'},
            headers: {accept: 'application/json', authorization: 'expired_access_token'}
        };

        const response = await axios.get(options);
        const data = response.data;
        return data;
    } catch (e) {
        console.error('  > Unable to retrieve contact');
        return JSON.parse(e.response.body);
    }

}

defineFeature(connection, test => {
    //#todo UPDATE LINE BELOW TO RECIEVE access and refresh token from DB
    let refresh_token: string, access_token: string;

    test('Disconnecting Hubspot from integration', ({given, when, then, and}) => {
        given(' I have installed the integration in Hubspot', () => {
                // this can be verified by checking if the user has a refresh token.
        });

        and('I have Hubspot access and refresh tokens stored', () => {
        //#todo UPDATE LINE BELOW TO RECIEVE access and refresh token from DB
           refresh_token = "refreshtokenfromDB";
           access_token = "accesstokenfromDB";
        });

        when('I disconnect the integration from my Hubspot account', () => {
         // this implies that the refresh token has been invalidated
            // unable to get selenium working as of yet but for testing
            // purposes we can use an invalid refresh token (random string)
            refresh_token = 'invalid token example';
        });

        and('the current access token expires', () => {
            //
            access_token = "nowexpiredaccess_token";
        });

        then('Then requests from the integration to protected endpoints in Hubspot fail\n', () => {
            // the api call will happen in the final then
        });

        and('the integration attempts to get a new access token from Hubspot\n', () => {
            // this step is done in step a call to hubspotAPi function in the then below
        });

        then('Then a bad request error is returned\n', () => {
            const res = HubApiCall(errorCall,refresh_token);
            expect(res.statusText.toBe('Bad Request'));
        });

    });
});