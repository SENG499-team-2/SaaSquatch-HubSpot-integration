import axios from "axios";
require('dotenv').config();
const HAPIKEY = process.env.HAPIKEY || '';

export async function createAssociation(createAssociationBody: object){
    const createAssociationURL = 'https://api.hubapi.com/crm-associations/v1/associations';
   try{
        axios.put(createAssociationURL, createAssociationBody, {
            params:{
                hapikey:HAPIKEY
            }
        });
   } catch(e){
       console.error("was not able to create association");
       console.error(e);
   }
}