// @ts-ignore
import axios from "axios";

export class SaasquatchApiModel {


    // Temp access until DB has OAuth access tokens
    private SAPIKEY: string;
    private TENANTALIAS: string;

    constructor(apiKey: string, tenantAlias: string){
        this.SAPIKEY = apiKey;
        this.TENANTALIAS = tenantAlias;
    }

    /**
     * Get users from SaaSquatch that match paramToFilterBy
     * Currently gets all users or zero users as filter is not working
     *
     * @param paramToFilterBy list of query parameters to filter by. eg. 'email:example@example.com'?
     */
    public async getUsers(paramToFilterBy?: string){
        const headers = { accept: 'application/json' };
        const url = `https://staging.referralsaasquatch.com/api/v1/${encodeURIComponent(this.TENANTALIAS)}/users`;
        let qs = '';
        if (paramToFilterBy){
            qs = paramToFilterBy;
        }
        try {
            const resp = await axios.get( url, {
                params: {
                    query: qs,
                    limit: 10,
                    offset: 0
                },
                headers: headers,
                auth: {
                    username: '',
                    password: this.SAPIKEY
                }
             } );
            if (resp.status != 200) {
                throw Error("Error getting a contact from SaaSquatch." + resp.data["error"]);
            }
            else{
                console.log(resp);
                return resp.data;
            }
        } catch(e){
            console.error(e);
        }
        }

        public async createParticipant(email:string, createParticipantBody:object){
            try{
                //URL should be built using express URL class
                const createParticipantURL = 'https://staging.referralsaasquatch.com/api/v1/' +this.TENANTALIAS+ '/open/account/' + email + '/user/' + email;
                const response = await axios.post(createParticipantURL, createParticipantBody,{
                    headers: {
                      'Authorization':'token '+this.SAPIKEY
                  }
                  });
                return response;
            } catch (e) {
                console.error("Was not able to delete contact");
                console.log(e);
            }
        }

    /**
     * Get all users from SaaSquatch
     * the limit of this api call is that will only return
     * 2,147,483,647 participants in one time. if there are over
     * 2,147,483,647 participants, it will fail to return the resting
     * participants.
     *
     */
    public async getAllParticipants(){
        try{
            //                             https://app.referralsaasquatch.com/api/v1/{tenant_alias}/users?query=&limit=&offset=
            const getAllParticipantsURL = 'https://staging.referralsaasquatch.com/api/v1/' +this.TENANTALIAS+ '/users?query=&limit=2147483647';
            const response = await axios.get(getAllParticipantsURL, {
                auth: {
                    username: '',
                    password: this.SAPIKEY
                }
            });
            console.log('test' + response);
            const data = response.data;
            //console.log(data);
            return data;
        } catch (e) {
            console.error("Was not able to get the participants list");
            console.log(e);
        }
    }

    public async deleteParticipant(userId:string, accountId:string){
        try{
            const createParticipantURL = 'https://staging.referralsaasquatch.com/api/v1/' +this.TENANTALIAS+ '/open/account/' + accountId + '/user/' + userId;
            const response = await axios.delete(createParticipantURL,{
                headers: {
                    'Authorization':'token '+this.SAPIKEY
                }
            });
            return response;
        } catch (e) {
            console.error("Was not able to delete contact");
            console.log(e);
        }
    }

}
