import axios from "axios";

export class HubspotApiModel {


    // Temp access until DB has OAuth access tokens
    private HAPIKEY: string;

    constructor(apiKey: string){
        this.HAPIKEY = apiKey;
    }

    /**
     * Gets contact from HubSpot.
     *
     * @param objectId objectID of contact to query
     * @param paramToGet query parameters to filter by. eg. 'email'.
     */
    public async getContact(objectId: number, paramToGet?: string){
        const headers = { accept: 'application/json' };
        const url = `https://api.hubapi.com/crm/v3/objects/contacts/${encodeURIComponent(objectId)}`;
        let qs;
        if (paramToGet){
            qs = {"properties": 'email', "archived": 'false', "hapikey": `${this.HAPIKEY}`};
        }
        else{
            qs = {archived: 'false', hapikey: this.HAPIKEY};
        }
        try{
            const resp = await axios.get( url, { params: qs } );
            if (resp.status != 200) {
                throw Error("Error getting a contact from HubSpot." + resp.data["error"]);
            }
            else{
                //console.log(resp);
                return resp.data;
            }
        }catch(e){
            console.error(e);
        }
    }

    /**
     * Creates an object in Hubspot
     *
     * @param objectType object type to be created. e.g. deals, contacts, company
     * @param createObjectBody body specifiying the create properties of the object
     * @returns axios response
     */
    public async createObject(objectType:string, createObjectBody:object){
        try{
            const createObjectURL = 'https://api.hubapi.com/crm/v3/objects/' + objectType;
            const response = await axios.post(createObjectURL, createObjectBody,{

                params: {
                    hapikey: this.HAPIKEY
                }
            });
            return response;
        } catch (e) {
            console.error("Was not able to create contact");
            console.log(e);
            return JSON.parse(e.response.body);
        }
    }


    /**
     *
     * @param objectType object to search for. e.g. deals, contacts, company
     * @param body body specifiying the search properties of the object
     * @returns axios response
     */
    public async searchObject(objectType:string, body:object){
        const searchObjectURL = 'https://api.hubapi.com/crm/v3/objects/' + objectType + '/search';
        try {
            const response = await axios.post(searchObjectURL,body, {
                params: {
                    hapikey: this.HAPIKEY,
                }
            });
            return response;
        } catch (e) {
            console.error("===== WAS NOT ABLE TO SEARCH FOR PROPERTIES OF OBJECT: " + objectType);
            console.error(e);
            return JSON.parse(e.response.body);
        }
    }

    /**
     * get all users in hubspot
     * @returns axios response
     */
    public async getAllContacts(){
        try {
            const allContactsURL = 'https://api.hubapi.com/contacts/v1/lists/all/contacts/all?hapikey=' + this.HAPIKEY;
            const response = await axios.get(allContactsURL);
            const data = response.data;
            console.log(data);
            return data;
        } catch (e) {
            console.error("===== WAS NOT ABLE TO get the Hubspor user list: ");
            console.error(e);
            return JSON.parse(e.response.body);
        }
    }

    /**
     *Search for a user in Hubspot based on user eamil address
     */
    public async searchUser(emailAdress:string){
        try {
            //                     https://api.hubapi.com/contacts/v1/search/query?q=rr@uvic.ca&hapikey=8a96de23-fb7e-47be-92de-2a37b60e6450
            const searchUserURL = 'https://api.hubapi.com/contacts/v1/search/query?q=' + emailAdress + '&hapikey=' + this.HAPIKEY;
            const response = await axios.get(searchUserURL);
            const data = response.data; // store the target users information
            // console.log(data);

            return data;
        } catch (e) {
            console.error("===== WAS NOT ABLE TO get the Hubspor user list: ");
            console.error(e);
            return JSON.parse(e.response.body);
        }
    }




}
