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
        .registerPermission({
            icon: 'fas fa-mobile-alt',
            label: app.translator.trans('flamarkt-phone-number.backoffice.permissions.editOwn'),
            permission: 'flamarkt-phone-number.editOwn',
            allowGuest: true,
        }, 'moderate');

    addFieldToProductShowPage();
});
