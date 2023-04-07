import SignUpModal from 'flarum/forum/components/SignUpModal';

declare module 'flarum/forum/components/SignUpModal' {
    export default interface SignUpModal {
        flamarktPhoneNumber: string | null
    }
}

declare module 'flamarkt/backoffice/backoffice/pages/UserShowPage' {
    export default interface UserShowPage {
        phoneNumber: string
    }
}

declare module 'flamarkt/identity/forum/layouts/IdentityLayout' {
    export default interface IdentityLayout {
        phoneNumber: string | null
    }
}
