import app from 'flamarkt/backoffice/backoffice/app';
import {extend} from '../common/extendModels';
import {common} from '../common/compat';
import addFieldToProductShowPage from './addFieldToProductShowPage';

export {
    extend,
    common,
};

app.initializers.add('flamarkt-phone-number', () => {
    app.extensionData.for('flamarkt-phone-number')
        .registerSetting({
            setting: 'flamarkt-phone-number.searchable',
            type: 'switch',
            label: app.translator.trans('flamarkt-phone-number.backoffice.settings.searchable'),
            help: app.translator.trans('flamarkt-phone-number.backoffice.settings.searchableHelp'),
        })
        .registerSetting({
            setting: 'flamarkt-phone-number.required',
            type: 'switch',
            label: app.translator.trans('flamarkt-phone-number.backoffice.settings.required'),
        })
        .registerSetting({
            setting: 'flamarkt-phone-number.selectedPrefixes',
            type: 'text',
            label: app.translator.trans('flamarkt-phone-number.backoffice.settings.selectedPrefixes'),
            help: app.translator.trans('flamarkt-phone-number.backoffice.settings.selectedPrefixesHelp'),
        })
        .registerPermission({
            icon: 'fas fa-mobile-alt',
            label: app.translator.trans('flamarkt-phone-number.backoffice.permissions.editOwn'),
            permission: 'flamarkt-phone-number.editOwn',
            allowGuest: true,
        }, 'reply')
        .registerPermission({
            icon: 'fas fa-mobile-alt',
            label: app.translator.trans('flamarkt-phone-number.backoffice.permissions.useAnyPrefix'),
            permission: 'flamarkt-phone-number.useAnyPrefix',
            allowGuest: true,
        }, 'reply');

    addFieldToProductShowPage();
});
