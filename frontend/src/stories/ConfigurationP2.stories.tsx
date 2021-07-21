import { Meta } from '@storybook/react';
import { View } from '../components/ConfigurationP2';

const defaultProps = {
    config: {
        saasquatchTenantAlias: '',
        pushIntoContacts: false,
        pullIntoContacts: false,
        pushIntoParticipants: false,
        pullIntoParticipants: false,
        contactsImported: false,
        participantsImported: false,
    },
    handleBack: () => {},
    handleSubmit: () => {},
    handleToggles: {
        toggleSaasPush: () => {},
        toggleSaasPull: () => {},
    },
};

export default {
  title: 'Integration/ConfigurationP2',
  component: View,
  parameters: {
    cucumber: {
      data: 'SyncParticipantsWithHubSpot.feature',
    },
  },
} as Meta;

export const Default = () => <View {...defaultProps} />;
export const TogglesSelected = () => (
    <View
        {...defaultProps}
        config={{
            saasquatchTenantAlias: '',
            pushIntoContacts: false,
            pullIntoContacts: false,
            pushIntoParticipants: true,
            pullIntoParticipants: true,
            contactsImported: false,
            participantsImported: false,
        }}
    />
);
export const PreviousImport = () => (
    <View
        {...defaultProps}
        config={{
            saasquatchTenantAlias: '',
            pushIntoContacts: false,
            pullIntoContacts: false,
            pushIntoParticipants: true,
            pullIntoParticipants: true,
            contactsImported: false,
            participantsImported: false,
        }}
    />
);
export const ImportModal = () => (
    <View
        {...defaultProps}
        config={{
            saasquatchTenantAlias: '',
            pushIntoContacts: false,
            pullIntoContacts: false,
            pushIntoParticipants: true,
            pullIntoParticipants: true,
            contactsImported: false,
            participantsImported: false,
        }}
    />
);
export const NowayError = () => (
    <View
        {...defaultProps}
        config={{
            saasquatchTenantAlias: '',
            pushIntoContacts: false,
            pullIntoContacts: false,
            pushIntoParticipants: true,
            pullIntoParticipants: true,
            contactsImported: true,
            participantsImported: true,
        }}
    />
);
export const NowayModal = () => (
    <View
        {...defaultProps}
        config={{
            saasquatchTenantAlias: '',
            pushIntoContacts: false,
            pullIntoContacts: false,
            pushIntoParticipants: true,
            pullIntoParticipants: true,
            contactsImported: true,
            participantsImported: true,
        }}
    />
);
