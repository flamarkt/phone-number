import app from 'flarum/common/app';
import Component, {ComponentAttrs} from 'flarum/common/Component';
import Select from 'flarum/common/components/Select';
import User from 'flarum/common/models/User';
import extractText from 'flarum/common/utils/extractText';

export interface PhoneNumberInputAttrs extends ComponentAttrs {
    id?: string
    value: string
    onchange?: (value: string) => void
    readonly?: boolean
    disabled?: boolean
    required?: boolean
    user?: User
}

export default class PhoneNumberInput extends Component<PhoneNumberInputAttrs> {
    customMode: boolean = false

    oninit(vnode: any) {
        super.oninit(vnode);

        const countryCodes = (app.forum.attribute<[string, string, number][]>('flamarktPhoneNumberCountryCodes') || []);
        const value = this.attrs.value || '';

        this.customMode = !!value && !countryCodes.some(cc => value.indexOf('+' + cc[2]) === 0);
    }

    view() {
        const countryCodes = (app.forum.attribute<[string, string, number][]>('flamarktPhoneNumberCountryCodes') || []);

        const value = this.attrs.value || '';
        const options: any = {};
        let selectedPrefix: string | null = null;
        let selectedRegion: string | null = null;

        countryCodes.forEach((countryCode, index) => {
            const prefix = '+' + countryCode[2];
            options[countryCode[0]] = countryCode[1] + ' ' + prefix;

            // If the current value contains this prefix
            // Or if no value is set mark the first entry as selected
            if (!this.customMode && (value.indexOf(prefix) === 0 || (!value && index === 0))) {
                selectedPrefix = prefix;
                selectedRegion = countryCode[0];
            }
        });

        if (app.forum.attribute('flamarktPhoneNumberUseAnyPrefix') || this.customMode) {
            options.custom = extractText(app.translator.trans('flamarkt-phone-number.lib.field.custom'));
        }

        const valueWithoutPrefix = value.replace(selectedPrefix || '?' /* don't match anything if there was no prefix selected */, '');

        return m('.FlamarktPhoneNumberInput', [
            countryCodes.length > 0 ? Select.component({
                className: 'FlamarktPhoneNumberInput-select',
                options,
                value: selectedRegion || 'custom',
                onchange: (region: string) => {
                    if (region === 'custom') {
                        this.customMode = true;

                        // If the value only contained a prefix (nothing visible in the text input)
                        // clear the value since it's probably unwanted from browsing through the select options
                        if (value === selectedPrefix) {
                            this.attrs.onchange?.('');
                        }

                        return;
                    }

                    this.customMode = false;

                    const newPrefix = ('+' + countryCodes.find(cc => cc[0] === region)![2]);

                    // Remove any "+" in the input to make it pretty obvious that any value typed in custom mode will not be valid in explicit prefix mode
                    this.attrs.onchange?.(newPrefix + valueWithoutPrefix.replace('+', ''));
                },
                readonly: this.attrs.readonly,
                disabled: this.attrs.disabled,
            }) : null,
            m('input.FlamarktPhoneNumberInput-text.FormControl', {
                id: this.attrs.id,
                type: 'text',
                value: valueWithoutPrefix,
                onchange: (event: InputEvent) => {
                    const newValue = (event.target as HTMLInputElement).value;

                    // If the user manually typed a number with an international prefix, and it's a valid pre-selected prefix
                    // We will exit custom mode and/or change the prefix in the dropdown
                    // Likewise if the number isn't valid we will switch to custom mode (even if custom is not allowed, validation will take care of that)
                    // Warning, this code will need refactoring if we use oninput instead of onchange because it could match on something partially typed
                    if (newValue.indexOf('+') === 0) {
                        // TODO: when enabling custom mode from here, the Select doesn't seem to refresh the active item
                        this.customMode = !countryCodes.some(cc => newValue.indexOf(cc[2] + '') === 1);
                        this.attrs.onchange?.(newValue);
                        return;
                    }

                    this.attrs.onchange?.((selectedPrefix || '') + newValue);
                },
                readonly: this.attrs.readonly,
                disabled: this.attrs.disabled,
                required: this.attrs.required,
            }),
        ]);
    }
}
