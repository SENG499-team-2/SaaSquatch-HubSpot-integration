import app from '../src'
import {getHubspotAccessToken, tokenStore} from '../src/routes/oath'
import "mocha";
const chai = require( 'chai')
var assert = chai.assert;
const supertest = require('supertest');




//before need to call /hubspot

// need to login and redirect



it('1 should equal 1',function () {
    assert(1,1)
})

// before signin and get hubspot refresh token
it('invalid refresh token should return an error',async function () {

    console.log(tokenStore)
    getHubspotAccessToken("abcd");

})
//after call getHubSpotAccessToken with the refresh token
