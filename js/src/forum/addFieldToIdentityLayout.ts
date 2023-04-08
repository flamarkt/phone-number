import app from 'flarum/forum/app';
import {extend} from 'flarum/common/extend';
import IdentityLayout from 'flamarkt/identity/forum/layouts/IdentityLayout';
import PhoneNumberInput from '../common/components/PhoneNumberInput';

export default function () {
    // If Flamarkt Identity extension is not enabled, skip
    if (!IdentityLayout) {
        return;
    }

    extend(IdentityLayout.prototype, 'oninit', function () {
        const {user} = app.session;

        this.phoneNumber = user && user.attribute('canEditFlamarktPhoneNumber') ? (user.attribute('flamarktPhoneNumber') || '') : null;
    });

    extend(IdentityLayout.prototype, 'fields', function (fields) {
        if (typeof this.phoneNumber !== 'string') {
            return;
        }

        fields.add('flamarkt-phone-number', m('.Form-group', [
            m('label', {
                for: 'flamarkt-identity-phone-number',
            }, app.translator.trans('flamarkt-phone-number.lib.field.label')),
            PhoneNumberInput.component({
                id: 'flamarkt-identity-phone-number',
                value: this.phoneNumber,
                onchange: (value: string) => {
                    this.phoneNumber = value;
                    this.dirty = true;
                },
                disabled: this.saving,
            }),
        ]));
    });

    extend(IdentityLayout.prototype, 'data', function (data: any) {
        if (typeof this.phoneNumber !== 'string') {
            return;
        }

        data.flamarktPhoneNumber = this.phoneNumber;
    });
}
