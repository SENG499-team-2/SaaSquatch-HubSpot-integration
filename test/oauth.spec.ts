import app from '../src'
import {getHubspotAccessToken, tokenStore} from '../src/routes/oath'
import "mocha";
const chai = require( 'chai')
var assert = chai.assert;
const supertest = require('supertest');




//before need to call /hubspot

// need to login and redirect


// before signin and get hubspot refresh token
it('invalid refresh token should return status "BAD_REFRESH_TOKEN"',async function () {

    console.log(tokenStore)
   const res =  await getHubspotAccessToken("abcd");

    assert(res.response.data.status, 'BAD_REFRESH_TOKEN');

})
//
// it("expired access token should return error ",async function () {
//
//     console.log(tokenStore)
//     const res =  await getHubspotAccessToken("abcd");
//
//     assert(res.response.data.status, 'BAD_REFRESH_TOKEN');
//
// })
//after call getHubSpotAccessToken with the refresh token
