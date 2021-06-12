import app from '../src'
import {getHubspotAccessToken, tokenStore} from '../src/routes/oath'
import "mocha";
const chai = require( 'chai')
var assert = chai.assert;
const supertest = require('supertest');



it('invalid refresh token should return status "BAD_REFRESH_TOKEN"',async function () {

   const res =  await getHubspotAccessToken("abcd");

    assert(res.response.data.status, 'BAD_REFRESH_TOKEN');

})

