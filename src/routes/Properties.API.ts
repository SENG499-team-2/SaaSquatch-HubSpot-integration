import axios from 'axios'
import express from 'express'
require('dotenv').config();
import * as PropertiesAPI from './Properties.API'
import * as SearchAPI from './Search.API'


const HAPIKEY = process.env.HAPIKEY || '';
const SAPIKEY = process.env.SAPIKEY || '';
const STENANTALIAS = process.env.STENANTALIAS || '';

export async function HasProperty(objectType:string, propertyName:string, ){

    const readPropertyURL = 'https://api.hubapi.com/crm/v3/properties/' + objectType + '/' + propertyName; 
   try {
    const response = await axios.get(readPropertyURL, {
        params: {
            hapikey: HAPIKEY
        }
    });
        
     if (response.status==200 ){
        return true; 
    } else {
        console.error("======== WAS NOT ABLE TO READ PROPERTY ========");
        console.error(response);
    }
   } catch (e) {
    if(e.status==404 && e.data.status == 'error' && e.data.category == "OBJECT_NOT_FOUND"){
        return false;
    } else{
        console.error("======== IN CATCH WAS NOT ABLE TO READ PROPERTY DUE TO ANOTHER ERROR========");
        console.error(e);
    }
    
   }
        
    
        
    
    
        
    
    
   
}
/**
 * 
 * @param objectType
 * @param groupName
 * @returns true if the group exists in the object, otherwise false
 */
export async function HasGroup(objectType:string, groupName: string){
    const readGroupPropertyURL = 'https://api.hubapi.com/crm/v3/properties/'+ objectType + '/groups/' + groupName;
    
    try {
        const response = await axios.get(readGroupPropertyURL, {
            params: {
                hapikey: HAPIKEY
            }
        });

        if (response.status==200 ){
            return true; 
        } else {
            console.error("======== WAS NOT ABLE TO READ GROUP ========");
            console.error(response);
        }
    } catch (e) {
        if(e.status==404 && e.data.status == 'error' && e.data.category == "OBJECT_NOT_FOUND"){
            return false;
        }
        console.error("======== WAS NOT ABLE TO READ GROUP ========");
        console.log(e);
    }
        
    
    
}
/**
 * Create a hubspot deal property for a saasquatch referral property
 * @param objectType object to create property for
 * @param propertyName The internal property name, which must be used when referencing the property via the (hubspot's) API.
 * @param propertyLabel A human-readable property label that will be shown in HubSpot.
 * @param propertyType The data type of the property.
 * @param propertyFieldType Controls how the property appears in HubSpot.
 * @param propertyGroupName The name of the property group the property belongs to.
 */
export async function CreateProperty(objectType:string, propertyName: string, propertyLabel:string, propertyType:string, propertyFieldType:string, propertyGroupName: string){
    const contactCreatePropertyURL = 'https://api.hubapi.com/crm/v3/properties/' + objectType;
    const body = {
        "name": propertyName,
        "label": propertyLabel,
        "type": propertyType,
        "fieldType": propertyFieldType,
        "groupName": propertyGroupName,
        "formField": true

    };
    try {
        await axios.post(contactCreatePropertyURL, body, {
            params: {
                hapikey:HAPIKEY
            }
        })
    } catch (e) {
        console.error("was not able to create for property");
        console.error(e);
    }
}
/**
 * 
 * @param objectType object to create property for
 * @param groupName The internal property group name, which must be used when referencing the property group via the (hubspot's) API.
 * @param groupLabel A human-readable label that will be shown in HubSpot.
 */
export async function CreateGroup(objectType:string, groupName:string, groupLabel:string){
    const groupCreatePropertyURL = 'https://api.hubapi.com/crm/v3/properties/'+ objectType+'/groups';
    const body = {
        "name": groupName,
        "label": groupLabel
    };
    try {
        axios.post(groupCreatePropertyURL, body, {
            params: {
                hapikey:HAPIKEY
            }
        });
    } catch(e){
        console.error("was not able to create for group");
        console.error(e);
    }

}


