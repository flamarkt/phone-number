<?php

namespace Flamarkt\PhoneNumber;

use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Settings\SettingsRepositoryInterface;
use libphonenumber\CountryCodeToRegionCodeMap;

class ForumAttributes
{
    public function __construct(
        protected SettingsRepositoryInterface $settings
    )
    {
    }

    public function __invoke(ForumSerializer $serializer): array
    {
        //TODO CountryCodeToRegionCodeMap::$countryCodeToRegionCodeMap;

        return [
            'flamarktPhoneNumberOnSignup' => $serializer->getActor()->hasPermission('flamarkt-phone-number.editOwn') ? ($this->settings->get('flamarkt-phone-number.required') ? 'required' : 'optional') : false,
        ];
    }
}
