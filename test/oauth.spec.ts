import app from '../src'
import {getHubspotAccessToken} from '../src/routes/oath'
import "mocha";
const chai = require( 'chai')
var assert = chai.assert;
const supertest = require('supertest');


it('1 should equal 1',function () {
    assert(1,1)
})

// before signin and get hubspot refresh token
it('invalid refresh token should return an error',async function () {

    getHubspotAccessToken("abcd");

})
//after call getHubSpotAccessToken with the refresh token
