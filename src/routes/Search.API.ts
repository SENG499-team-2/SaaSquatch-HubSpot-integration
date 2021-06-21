
require('dotenv').config();
const HAPIKEY = process.env.HAPIKEY || '';
import axios from "axios";

/**
 * 
 * @param object object to search in
 * @param body body of request
 * @returns response from successful post
 */
export async function searchObject(object:string, body:object){
    const searchURL = 'https://api.hubapi.com/crm/v3/objects/'+object+'/search';
    try {
        const response = await axios.post(searchURL,body, {
            params: {
                hapikey: HAPIKEY,
            }
        });
        return response;
    } catch (e) {
        console.error("was not able to search for " + object);
        console.error(e);
    }
}