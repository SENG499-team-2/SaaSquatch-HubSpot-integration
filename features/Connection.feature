Feature: Connection

    Describes how a user can connect the SaaSquatch and
    Hubspot accounts using the integration.

    Background:
        Given I have a SaaSquatch account
        And a Hubspot account

    Scenario: Enabling the integration
        Given I am logged into my SaaSquatch account
        And I am in the integrations portion of the SaaSquatch app
        Then I can connect my SaaSquatch and Hubspot accounts under Integrations
        When I turn on the integration
        And login with Hubspot oauth
        Then the two systems can communicate
    
    Scenario: Disabling the integration
        Given I am logged into my SaaSquatch account
        And I am in the integrations portion of the SaaSquatch app
        When I disable the integration in my account
        Then then the integration should be disabled
        And should only be re-enabled when the user connects the integration again

    Scenario: Disconnecting Hubspot from integration
        Given I have installed the integration in Hubspot
        And I have Hubspot access and refresh tokens stored
    	When I disconnect the integration from my Hubspot account
    	And  the current access token expires
        Then requests from the integration to protected endpoints in Hubspot fail
        And the integration attempts to get a new access token from Hubspot
        Then a bad request error is returned