import * as SearchAPI from "./Search.API"
import axios from "axios";
require('dotenv').config();
const HAPIKEY = process.env.HAPIKEY || '';
export async function HasContact(body:object){
    try{
        const response = await SearchAPI.searchObject("contacts", body);
        return response;
    } catch (e){
        console.error("Error searching for contact");
        console.error(e);
    }
    
    
}



export async function CreateContact(createContactBody: object){
    try{
        const createContactURL = 'https://api.hubapi.com/crm/v3/objects/contacts';
        const response = await axios.post(createContactURL, createContactBody,{
    
            params: {
                hapikey: HAPIKEY
            }
        });
        return response;
    } catch (e) {
        console.error("Was not able to create contact");
        console.log(e);
    }
   
}