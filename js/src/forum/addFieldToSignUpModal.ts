import app from 'flarum/forum/app';
import {extend} from 'flarum/common/extend';
import SignUpModal from 'flarum/forum/components/SignUpModal';
import PhoneNumberInput from '../common/components/PhoneNumberInput';

export default function () {
    extend(SignUpModal.prototype, 'oninit', function () {
        this.flamarktPhoneNumber = app.forum.attribute('flamarktPhoneNumberOnSignup') ? '' : null;
    });

    extend(SignUpModal.prototype, 'fields', function (fields) {
        if (typeof this.flamarktPhoneNumber !== 'string') {
            return;
        }

        fields.add('flamarkt-phone-number', m('.Form-group', [
            m('label', {
                for: 'flamarkt-signup-phone-number',
            }, app.translator.trans('flamarkt-phone-number.lib.field.phoneNumber')),
            PhoneNumberInput.component({
                id: 'flamarkt-signup-phone-number',
                value: this.flamarktPhoneNumber,
                onchange: (value: string) => {
                    this.flamarktPhoneNumber = value;
                },
                disabled: this.loading,
                required: app.forum.attribute('flamarktPhoneNumberOnSignup') === 'required',
                user: app.session.user,
            }),
        ]));
    });

    extend(SignUpModal.prototype, 'submitData', function (data: any) {
        if (typeof this.flamarktPhoneNumber !== 'string') {
            return;
        }

        data.flamarktPhoneNumber = this.flamarktPhoneNumber;
    });
}
