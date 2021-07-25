/**
 * ConfigurationController
 *
 * Includes utitlities for exposing configuration data to routes.
 */

import { Configuration } from '../Types/types';
import { ConfigurationModel } from './ConfigurationModel';
import { HubspotApiModel } from './HubspotApiModel';
import { SaasquatchApiModel } from './SaasquatchApiModel';
import { saasquatchUpdatesController } from './saasquatchUpdatesController';

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
        console.log('setConfiguration');
        if (configuration.PullParticipantsIntoContacts == true) {
            saasquatchUpdatesController.historicalSync(
                new SaasquatchApiModel(process.env.SAPIKEY!, configuration.SaaSquatchTenantAlias),
                new HubspotApiModel(),
            );
        }

        // if (configuration.PullParticipantsIntoContacts == true) {
        //     console.log('setConfiguration');
        //     console.log(configuration);
        // }
        return ConfigurationModel.setConfiguration(hubspotId, configuration);
    }

    public static async updateConfiguration(configuration: Configuration): Promise<void> {
        console.log('updateConfiguration');
        if (configuration.PullParticipantsIntoContacts == true) {
            saasquatchUpdatesController.historicalSync(
                new SaasquatchApiModel(process.env.SAPIKEY!, configuration.SaaSquatchTenantAlias),
                new HubspotApiModel(),
            );
        }

        return ConfigurationModel.setConfiguration('20465599', configuration);
    }

    // public static async updateConfiguration(configuration: Configuration): Promise<void> {
    //     return ConfigurationModel.updateConfiguration(configuration);
    // }
}
