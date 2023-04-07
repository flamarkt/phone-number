import app from 'flarum/forum/app';
import {extend} from '../common/extendModels';
import {common} from '../common/compat';
import addFieldToIdentityLayout from './addFieldToIdentityLayout';
import addFieldToSignUpModal from './addFieldToSignUpModal';

export {
    extend,
    common,
};

app.initializers.add('flamarkt-phone-number', () => {
    addFieldToIdentityLayout();
    addFieldToSignUpModal();
});
