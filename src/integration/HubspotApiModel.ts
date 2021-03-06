import axios from 'axios';
import { PollTokensFromDatabase } from '../database';
import { IntegrationTokens } from '../Types/types';

/**
 * This is the model between the HubSpot API and our controller.
 */

export class HubspotApiModel {
    /**
     * Gets contact from HubSpot.
     *
     * @param objectId objectID of contact to query
     * @param paramToGet query parameters to filter by. eg. 'email'.
     */
    public async getContact(contactObjectID: number, hub_id: number, paramToGet?: string) {
        try {
            const token: any = await PollTokensFromDatabase(hub_id.toString());

            const access_token = token.accessToken;

            const url = `https://api.hubapi.com/crm/v3/objects/contacts/${encodeURIComponent(contactObjectID)}`;

            let options: any = {
                qs: { properties: 'email', archived: 'false' },
                headers: { accept: 'application/json', authorization: `Bearer ${access_token}` },
            };
            if (paramToGet) {
                options = {
                    qs: { properties: 'email', archived: 'false' },
                    headers: { accept: 'application/json', authorization: `Bearer ${access_token}` },
                };
            } else {
                options = {
                    qs: { archived: 'false' },
                    headers: { accept: 'application/json', authorization: `Bearer ${access_token}` },
                };
            }

            try {
                const resp = await axios.get(url, options);
                if (resp.status != 200) {
                    throw Error('Error getting a contact from HubSpot.' + resp.data['error']);
                } else {
                    return resp.data;
                }
            } catch (e) {
                console.error(e);
            }
        } catch (e) {
            console.log('ERROR FETCHING TOKENS FROM THE DB');
            // #todo redirect to signin
            //axios.get(/hubspot);
        }
    }

    /**
     * Creates an object in Hubspot
     *
     * @param objectType object type to be created. e.g. deals, contacts, company
     * @param createObjectBody body specifiying the create properties of the object
     * @returns axios response
     */
    public async createObject(objectType: string, createObjectBody: any, hub_id: number) {
        try {
            const token: any = await PollTokensFromDatabase(hub_id.toString());
            const access_token = token.accessToken;
            try {
                const createObjectURL = 'https://api.hubapi.com/crm/v3/objects/' + objectType;
                const response = await axios.post(createObjectURL, createObjectBody, {
                    params: {
                        headers: { accept: 'application/json', authorization: `Bearer ${access_token}` },
                    },
                });
                return response;
            } catch (e) {
                console.error('Was not able to create contact');
                console.log(e);
                return JSON.parse(e.response.body);
            }
        } catch (e) {
            console.log('ERROR FETCHING TOKENS FROM THE DB');
            // #todo redirect to signin
            //axios.get(/hubspot);
        }
    }

    /**
     *
     * @param objectType object to create property to check property for
     * @param propertyName the name of the property, not the label
     * @returns true if the property exists, otherwise false
     */
    public async objectHasProperty(objectType: string, propertyName: string, hub_id: number) {
        try {
            const token: any = await PollTokensFromDatabase(hub_id.toString());
            const access_token = token.accessToken;
            const readPropertyURL = 'https://api.hubapi.com/crm/v3/properties/' + objectType + '/' + propertyName;

            try {
                const response = await axios.get(readPropertyURL, {
                    params: {
                        headers: { accept: 'application/json', authorization: `Bearer ${access_token}` },
                    },
                });
                if (response.status == 200) {
                    return true;
                } else {
                    console.error('======== WAS NOT ABLE TO READ PROPERTY ========');
                    console.error(response);
                }
            } catch (e) {
                if (e.response.status == 404) {
                    return false;
                } else {
                    console.error(
                        '======== WAS NOT ABLE TO MAKE CALL: STATUS CODE: ' + e.response.status + ' ========',
                    );
                    console.log(e);
                    return JSON.parse(e.response.body);
                }
            }
        } catch (e) {
            console.log('ERROR FETCHING TOKENS FROM THE DB');
            // #todo redirect to signin
            //axios.get(/hubspot);
        }
    }

    /**
     * Create a hubspot property for an object
     *
     * @param objectType object to create property for
     * @param propertyName The internal property name, which must be used when referencing the property via the (hubspot's) API.
     * @param propertyLabel A human-readable property label that will be shown in HubSpot.
     * @param propertyType The data type of the property.
     * @param propertyFieldType Controls how the property appears in HubSpot.
     * @param propertyGroupName The name of the property group the property belongs to.
     * https://developers.hubspot.com/docs/api/crm/properties
     */
    public async createObjectProperty(
        objectType: string,
        propertyName: string,
        propertyLabel: string,
        propertyType: string,
        propertyFieldType: string,
        propertyGroupName: string,
        hub_id: number,
    ) {
        try {
            const token: any = await PollTokensFromDatabase(hub_id.toString());
            const access_token = token.accessToken;
            const contactCreatePropertyURL = 'https://api.hubapi.com/crm/v3/properties/' + objectType;
            const body = {
                name: propertyName,
                label: propertyLabel,
                type: propertyType,
                fieldType: propertyFieldType,
                groupName: propertyGroupName,
                formField: true,
            };
            try {
                await axios.post(contactCreatePropertyURL, body, {
                    params: {
                        headers: { accept: 'application/json', authorization: `Bearer ${access_token}` },
                    },
                });
            } catch (e) {
                console.error('==== WAS NOT ABLE TO POST NEW PROPERTY ===');
                console.log(e);
                return JSON.parse(e.response.body);
            }
        } catch (e) {
            console.log('ERROR FETCHING TOKENS FROM THE DB');
            // #todo redirect to signin
            //axios.get(/hubspot);
        }
    }

    /**
     *
     * @param objectType object to search for. e.g. deals, contacts, company
     * @param body body specifiying the search properties of the object
     * @returns axios response
     */
    public async searchObject(objectType: string, body: any, hub_id: number) {
        try {
            const token: any = await PollTokensFromDatabase(hub_id.toString());
            const access_token = token.accessToken;
            try {
                const searchObjectURL = 'https://api.hubapi.com/crm/v3/objects/' + objectType + '/search';

                const response = await axios.post(searchObjectURL, body, {
                    params: {
                        headers: { accept: 'application/json', authorization: `Bearer ${access_token}` },
                    },
                });
                return response;
            } catch (e) {
                console.error('===== WAS NOT ABLE TO SEARCH FOR PROPERTIES OF OBJECT: ' + objectType);
                return JSON.parse(e.response.body);
            }
        } catch (e) {
            console.log('ERROR FETCHING TOKENS FROM THE DB');
            // #todo redirect to signin
            //axios.get(/hubspot);
        }
    }
}
