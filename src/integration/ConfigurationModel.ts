/**
 * ConfigurationModel
 *
 * Stores/manages information about a specific integration's configuration.
 * The current implementation only exposes a configuration for a single user.
 * This should be changed when session-management is implemented.
 *
 * See also: ConfigurationController (for network-based interaction with a user's configuration)
 */

import { Configuration } from '../Types/types';
import { PollDatabase } from '../database';
import { AddToDatabase } from '../database';
import { EditDatabase } from '../database';

export class ConfigurationModel {
    /*
	static configuration: Configuration = {
		SaaSquatchTenantAlias: "",
		PushPartixipantsAsContacts: false, 
		PullParticipantsIntoContacts: false,
		DeleteContactwhenParticipantDeleted: false,
		PushContactsAsParticipants: false,
		PullContactsIntoParticipants: false, 
		DeleteParticipantWhenContactDeleted: false,
		accessToken: "", 
		refreshToken: ""
	}*/

    public static async getConfiguration(tenantAlias: string): Promise<Configuration> {
        return PollDatabase(tenantAlias);
    }

    public static async setConfiguration(hubspotId: string, configuration: Configuration): Promise<void> {
        return AddToDatabase(configuration.SaaSquatchTenantAlias, hubspotId, configuration);
    }

    public static async updateConfiguration(configuration: Configuration): Promise<void> {
        return EditDatabase(configuration.SaaSquatchTenantAlias, configuration);
    }
}
