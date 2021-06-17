import axios from 'axios'
import express from 'express'
require('dotenv').config();
var dealsRouter = express.Router();
const HAPIKEY = process.env.HAPIKEY || '';
const SAPIKEY = process.env.SAPIKEY || '';
const STENANTALIAS = process.env.STENANTALIAS || '';


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


/*hubspot api call
    Need to associate Saasquatch referral data with Hubspot deal data

*/
export async function postSaasquatchReferralToHubspotDeal(data: JSON) {

    try {
        const dealUrl = 'https://api.hubapi.com/crm/v3/objects/deals';
        await axios.post(dealUrl, data, {
            params: {
                hapikey: HAPIKEY
            } 
            
        });
       

    } catch (e) {

        console.error('  > Unable to post new hubspot deal');
        console.error(e);
    }
    

}


export default dealsRouter