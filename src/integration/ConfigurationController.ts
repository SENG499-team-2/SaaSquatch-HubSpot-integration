/**
 * ConfigurationController
 *
 * Includes utitlities for exposing configuration data to routes.
 */

import { Configuration } from '../Types/types';
import { ConfigurationModel } from './ConfigurationModel';
import { HubspotApiModel } from './HubspotApiModel';
import { SaasquatchApiModel } from './SaasquatchApiModel';
import axios from 'axios';

export class ConfigurationController {
    private hubApiModel: HubspotApiModel;
    private saasApiModel: SaasquatchApiModel;
    constructor(hApiKey: string, sApiKey: string, sTenantAlias: string) {
        this.saasApiModel = new SaasquatchApiModel(sApiKey, sTenantAlias);
        this.hubApiModel = new HubspotApiModel();
    }

    public static async getConfiguration(tenantAlias: string): Promise<Configuration> {
        return ConfigurationModel.getConfiguration(tenantAlias);
    }
    public static async setConfiguration(hubspotId: string, configuration: Configuration): Promise<void> {
        if (configuration.PullParticipantsIntoContacts == true) {
            console.log('setConfiguration');
            console.log(configuration);
        }
        return ConfigurationModel.setConfiguration(hubspotId, configuration);
    }

    public async updateConfiguration(configuration: Configuration): Promise<void> {
        if (configuration.PullParticipantsIntoContacts == true) {
            console.log('updateConfiguration');
            // const participants = await this.saasApiModel.getAllParticipants();
            // console.log(participants);

            const data = await this.saasApiModel.getAllParticipants();
            if (data.count != 0) {
                console.log('there are total ' + data.count + ' contacts');
                for (let i = 0; i < data.totalCount; i++) {
                    console.log(data.users[i].id);
                    // this.hubApiModel.createContact(data.users[i]);
                    const basicContactInfo = {
                        email: data.users[i].email,
                        firstname: data.users[i].firstName,
                        lastname: data.users[i].lastName,
                    };
                    const basicInfo = Object.assign(basicContactInfo);
                    const createContactBody = {
                        properties: basicInfo,
                    };
                    await this.hubApiModel.createObject('contacts', createContactBody);
                }
            }

            console.log(configuration);
        }
        return ConfigurationModel.updateConfiguration(configuration);
    }
}
