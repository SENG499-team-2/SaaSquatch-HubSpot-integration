import axios from 'axios'
import express from 'express'
require('dotenv').config();
import * as PropertiesAPI from './Properties.API'
import * as SearchAPI from './Search.API'

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
/**
 * Create a hubspot deal property for a saasquatch referral property
 * @param propertyName The internal property name, which must be used when referencing the property via the API.
 * @param propertyLabel A human-readable property label that will be shown in HubSpot.
 * @param propertyType The data type of the property.
 * @param propertyFieldType Controls how the property appears in HubSpot.
 * @param propertyGroupName The name of the property group the property belongs to.
 */
export async function CreateDealProperty( propertyName: string, propertyLabel:string, propertyType:string, propertyFieldType:string, propertyGroupName: string){
    if(!await PropertiesAPI.HasGroup("deals", propertyGroupName)){
        await PropertiesAPI.CreateGroup("deals", propertyGroupName, propertyLabel);
    }
    await PropertiesAPI.CreateProperty("deals", propertyName, propertyLabel, propertyType, propertyFieldType, propertyGroupName);
}

export async function CreateDeal(properties:object){
    const createDealURL = 'https://api.hubapi.com/crm/v3/objects/deals';
    try{
        const response = await axios.post(createDealURL, properties, {
            params:{
                hapikey:HAPIKEY
            }
        });
        return response;
    }catch(e){
        console.error("was not able to create deal");
        console.error(e);
    }
    
}

/**
 * Check if property is in Hubspot deal object
 * @param property property to check for 
 */
export async function DealHasProperty(property:string){
    return await PropertiesAPI.HasProperty("deals", property);
    
    
    
}



