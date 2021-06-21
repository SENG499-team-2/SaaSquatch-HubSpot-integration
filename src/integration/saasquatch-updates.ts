import axios from "axios";
import { SaasquatchPayload } from "../Types/types";
const HAPIKEY = process.env.HAPIKEY || '';
import * as DealAPI from "../routes/Deals.API";
import * as ContactAPI from "../routes/Contacts.API";
import * as SearchAPI from "../routes/Search.API"
import * as AssociationsAPI from "../routes/Associations.API"


/**
 * Sample boilerplate functions
 */



export async function NewReward(saasquatchPayload: any){
    console.log('Received SaaSquatch coupon.create. This is not yet implemented.');
}

export async function NewCoupon(saasquatchPayload: any){
    console.log('Received SaaSquatch coupon.create. This is not yet implemented.');
    
}
/**
 * Received webhook of event type 'user.created' 
 * @param saasquatchPayload Payload of SaaSquatch webhook
 */
export async function NewUser(saasquatchPayload: any){
    console.log('Received SaaSquatch user.created.');
    console.log(saasquatchPayload);
    
     const saasquatchPayloadData = saasquatchPayload.data;
     const searchContactBody =  {
        filterGroups: [
          {
              filters: [
              {
                "value": saasquatchPayloadData.email, 
                "propertyName": 'email', 
                "operator": 'EQ'
            }
             ]
            }
        ],
        limit: 1,
      };
      //Need to check if user is in hubspot
      console.log("checking for contact");
      const hasContactResponse = await ContactAPI.HasContact(searchContactBody);
    if((hasContactResponse?.data.total == 0)){
        const createContactBody = {
            "properties":{
                "email": saasquatchPayloadData.email,
                "firstname": saasquatchPayloadData.firstName,
                "lastname": saasquatchPayloadData.lastName,
            }

        };
        const contactResponse = await ContactAPI.CreateContact(createContactBody);
        var contactResponseID = contactResponse?.data.id;
        //they are so need to get their contact id to associate the deal with
    } else {
        var contactResponseID = hasContactResponse?.data.id;
    }
        //now creating deals for that user in hubspot
        //Check if property exists in deal object
        //from user.create just need: referralCodes, programShareLinks
        //maybe add more fields later like expirary date, start date
        console.log("=================now creating deal properties=========== ")
        
        //this might be changed
       
        const programIdResponse = await DealAPI.DealHasProperty("programId");
        if(!(programIdResponse)){
            await DealAPI.CreateDealProperty("programId", "Program", "string", "textarea", "referral")
        }
      
        // if (!await DealAPI.DealHasProperty("referralCode")){
        //     await DealAPI.CreateDealProperty("referralCodes", "referral code", "string", "textarea", "referral");
        // }
        
       
        // if(!await DealAPI.DealHasProperty("programShareLink")){
        //     await DealAPI.CreateDealProperty("programShareLink", "Program share link","string", "textarea", "referral");
        // }
        
        console.log("now creating deals for each program in saasquatchpayload");
        // for (const [programId, referralCode] of Object.entries(saasquatchPayloadData.referralCodes)){
        //     const cleanShareLink = saasquatchPayloadData.programShareLinks["programId"].cleanShareLink;
        //     const properties = {
        //         "programId": programId,
        //         "referralCode":referralCode,
        //         "programShareLink": cleanShareLink
            
        //     }
        //     const dealResponse = await DealAPI.CreateDeal(properties);
        //     var createAssociationBody =
        //         {
        //             "fromObjectId": dealResponse?.data.id,
        //             "toObjectId": contactResponseID,
        //             "category": "HUBSPOT_DEFINED",
        //             "definitionId": 3
        //         }
        //     AssociationsAPI.createAssociation(createAssociationBody);
            

        // }
        
        console.log("end of function");
    
    
}


/**
 * Received webhook of event type 'test'. No processing required as this is a test webhook.
 * 
 * @param saasquatchPayload Payload of SaaSquatch webhook
 */
 export function Test(saasquatchPayload: SaasquatchPayload){
    console.log('Received SaaSquatch test webhook.');  
}