import axios from "axios";
import { SaasquatchPayload } from "../Types/types";
const HAPIKEY = process.env.HAPIKEY || '';


/**
 * Sample boilerplate functions
 */



/**
 * Received webhook of event type 'user.created'
 * @param saasquatchPayload Payload of SaaSquatch webhook
 */
export async function NewUser(saasquatchPayload: any){
    console.log('Received SaaSquatch user.created. This is not yet implemented.');
    
    /**
     * TODO:
     * Steps
     * 1. Check if user exists as contact in HubSpot (match by email)
     * 2. If it does not exist, create new contact in HubSpot
     * 3. If it does exist, send referral link to HubSpot for that contact.
     * 4. Done?
     */
     const newEmail = saasquatchPayload.data.email;
     console.log("email is");
     console.log(newEmail);
     const searchContactsURL = '/crm/v3/objects/contacts/search';
     const createContactURL = '/crm/v3/objects/contacts';
     const saasquatchPayloadData = saasquatchPayload.data;

     const searchContactBody =  {
        filterGroups: [
          {
              filters: [
              {
                "value": newEmail, 
                "propertyName": 'email', 
                "operator": 'EQ'
            }
             ]
            }
        ],
        limit: 1,
      };
    
    //Search for contact in hubspot
    try{
        
        const contacts = await axios.post(searchContactsURL, searchContactBody,{
                params: {
                    hapikey: HAPIKEY
                }
        });
        //the contact is not in hubspot
        if(contacts.data.total){
            //post new contact to hubspot
            const createContactBody = {
                "properties":{
                    "email": saasquatchPayloadData.email,
                    "firstname": saasquatchPayloadData.firstName,
                    "lastname": saasquatchPayloadData.lastName,

                }

            };
            const response = await axios.post(createContactURL, createContactBody,{

                params: {
                    hapikey: HAPIKEY
                }
            });
            console.log(response);
        }
        
    } catch (e) {
        console.error("was not able to search for contact");
        console.error(e);
    }
    
    console.log("end of function")
}


/**
 * Received webhook of event type 'test'. No processing required as this is a test webhook.
 * 
 * @param saasquatchPayload Payload of SaaSquatch webhook
 */
 export function Test(saasquatchPayload: SaasquatchPayload){
    console.log('Received SaaSquatch test webhook.');  
}