import Extend from 'flarum/common/extenders';
import User from 'flarum/common/models/User';

export const extend = [
    new Extend.Model(User)
        .attribute('flamarktPhoneNumber'),
];
