import Component, { ComponentAttrs } from 'flarum/common/Component';
import User from 'flarum/common/models/User';
export interface PhoneNumberInputAttrs extends ComponentAttrs {
    id?: string;
    value: string;
    onchange?: (value: string) => void;
    readonly?: boolean;
    disabled?: boolean;
    required?: boolean;
    user?: User;
}
export default class PhoneNumberInput extends Component<PhoneNumberInputAttrs> {
    view(): any;
}
