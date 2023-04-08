import app from 'flamarkt/backoffice/backoffice/app';
import {extend} from 'flarum/common/extend';
import UserShowPage from 'flamarkt/backoffice/backoffice/pages/UserShowPage';
import PhoneNumberInput from '../common/components/PhoneNumberInput';

export default function () {
    extend(UserShowPage.prototype, 'oninit', function () {
        this.phoneNumber = '';
    });

    extend(UserShowPage.prototype, 'show', function (returnValue, user) {
        this.phoneNumber = user.attribute('flamarktPhoneNumber') || '';
    });

    extend(UserShowPage.prototype, 'fields', function (fields) {
        fields.add('categories', m('.Form-group', [
            m('label', {
                for: 'user-edit-phone-number',
            }, app.translator.trans('flamarkt-phone-number.lib.field.label')),
            PhoneNumberInput.component({
                id: 'user-edit-phone-number',
                value: this.phoneNumber,
                onchange: (value: string) => {
                    this.phoneNumber = value;
                    this.dirty = true;
                },
                disabled: this.saving,
            }),
        ]));
    });

    extend(UserShowPage.prototype, 'data', function (data) {
        data.flamarktPhoneNumber = this.phoneNumber;
    });
}
