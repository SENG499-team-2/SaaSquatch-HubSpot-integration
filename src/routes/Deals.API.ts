import router from './index'
import axios from 'axios'
import express from 'express'
import http from 'http'
import chalk from 'chalk'
require('dotenv').config();
import { Router } from 'express';
import * as jwt from "jsonwebtoken";
import jwksRsa = require("jwks-rsa");
import { Base64 } from "js-base64";
import crypto from "crypto";
import { validateSaaSquatchWebhook } from './webhooks';
import { validateWithSaaSquatchJwks } from './webhooks';
import { validateHubSpotWebhook } from './webhooks';


const HAPIKEY = process.env.HAPIKEY || '';
const SAPIKEY = process.env.SAPIKEY || '';
const STENANTALIAS = process.env.STENANTALIAS || '';


const HUBSPOT_CLIENT_SECRET = process.env.HUBSPOT_CLIENT_SECRET;
const HUBSPOT_WEBHOOK_URI = process.env.HUBSPOT_WEBHOOK_URI;
const SAASQUATCH_JWKS_URI = process.env.SAASQUATCH_JWKS_URI;

var dealsRouter = express.Router();
let saasquatchJwksClient: jwksRsa.JwksClient;
if (SAASQUATCH_JWKS_URI) {
    saasquatchJwksClient = jwksRsa({
        jwksUri: SAASQUATCH_JWKS_URI,
        cache: false,
    });
} else {
    console.error("SAASQUATCH_JWKS_URI is not defined in environment variables and is required for SaaSquatch Webhooks.\
     For staging this should be https://staging.referralsaasquatch.com/.well-known/jwks.json.");
}

const getDeals = async () => {
    try {
        
        const dealsUrl = 'https://api.hubapi.com/crm/v3/objects/deals';
        const response = await axios.get(dealsUrl, {
            params: {
                hapikey: HAPIKEY,
                limit: 10,

            }
        });
        const data = response.data;
        return JSON.stringify(data);
    } catch (e) {
        console.error('  > Unable to retrieve participants');
        console.log(e);
        return JSON.parse(e);
    }
   

}


//hubspot api call
const dealInHubspot = async (id: any) => {

    try {
        const url = 'https://api.hubapi.com/crm/v3/objects/deals/{id}';
        const response = await axios.get(url, {
            params: {
                hapikey: HAPIKEY
            }
        });
        if (response.status == 200) {
            return true;
        }
        return false;
    } catch (e) {
        console.error('  > Unable to retrieve participants');
        console.log(e);
        return JSON.parse(e);
    }
};


//saasquatch api call
const getReferralLink = async (id: any) => {
    const url = '/api/v1/${STENANTALIAS}/open/code/${id}';
    const response = await axios.get(url, {
        auth: {
            username: '',
            password: SAPIKEY
        }
    });


}

const getReferrals = async () => {
    const url = '/api/v1/${STENANTALIAS}/referrals';
    const response = await axios.get(url, {
        params: {

        }
    });

    return response.data;

};


//hubspot api call
const postToHubspot = async () => {

    const body = {
        "properties": {
            "dealname": "really good deal"
        }
    };
    try {
        const dealUrl = 'https://api.hubapi.com/crm/v3/objects/deals';
        const response = await axios.post(dealUrl, body, {
            params: {
                hapikey: HAPIKEY
            } 
            
            });
        return response;

    } catch (e) {

        console.error('  > Unable to post new hubspot deal');
        console.error(e);
 
        return '';
    }
    

}


dealsRouter.post("/update-referral-to-deals", async (req, res) => {
    const jwsNoPayloadHeader: string | undefined = req.get("X-Hook-JWS-RFC-7797");
    if (jwsNoPayloadHeader) {
        validateSaaSquatchWebhook(JSON.stringify(req.body), jwsNoPayloadHeader)
            .then(decoded => {
               
                const referralId = req.body.data.code || '';
                const respondo = postToHubspot();
                
                //if (dealInHubspot(referralId)) {
                   

                //}
                //check if referral is in hubspot via a get
                //if no, create a new deal and send that to hubspot with the referral link
                /**
                 * Here you would process the webhook. ie. determine "type" and from there post to 
                 * Hubspot API with update, etc.
                 * While we can confirm this came from SaaSquatch, they make no guarantees the JSON is 
                 * formatted correctly, so we will need to verify that as well.
                 */
                res.status(200).end();
            })
            .catch(error => {
                console.warn("Received invalid SaaSquatch Webhook.")
                console.error(error);
                res.status(500).end();
            });
    } else {
        res.status(401).end();
    }
});

/**
 * Endpoint for webhooks from HubSpot
 */
//dealsRouter.post("/update-referral-to-deals", async (req, res) => {
//    console.log("inside update referrals");
//    console.log(req);
//    const signatureVersion = req.get("X-HubSpot-Signature-Version");
//    const signature = req.get("X-HubSpot-Signature");
//    if (signatureVersion && signature) {
//        const isValid: boolean = validateHubSpotWebhook(signatureVersion, signature, JSON.stringify(req.body));
//        if (isValid) {
//            console.log("Received valid HubSpot Webhook.");
//            //const referrals = await getReferrals();
//            res.json({ Referral: "1234", code: "5678" });
//            /**
//             * Here you would process the webhook. ie. determine "type" and from there post to 
//             * SaaSquatch API with update, etc.
//             * While we can confirm this came from HubSpot, they make no guarantees the JSON is 
//             * formatted correctly, so we will need to verify that as well.
//             */
//            res.status(200).end();
//        }
//        else {
//            console.warn("Received invalid HubSpot Webhook.")
//            console.warn(JSON.stringify(req.body))
//            res.status(401).end();
//        }
//    } else {
//        res.status(401).end();
//    }
//});

dealsRouter.get("/", async (req, res) => {

    const deals = await getDeals();
    res.write(deals);
    res.end();


});



export default dealsRouter