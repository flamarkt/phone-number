import Component, {ComponentAttrs} from 'flarum/common/Component';
import User from 'flarum/common/models/User';

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
    view() {
        return m('input.FormControl', {
            id: this.attrs.id,
            type: 'text',
            value: this.attrs.value,
            onchange: (event: InputEvent) => {
                this.attrs.onchange?.((event.target as HTMLInputElement).value);
            },
            readonly: this.attrs.readonly,
            disabled: this.attrs.disabled,
            required: this.attrs.required,
        });
    }
}
