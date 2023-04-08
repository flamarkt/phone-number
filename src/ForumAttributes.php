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
        $countryCodesRaw = $this->settings->get('flamarkt-phone-number.selectedPrefixes');

        $payloadCountryCodes = [];

        if ($countryCodesRaw) {
            $countryCodes = explode(',', $countryCodesRaw);
            $relevantCountryCodesMap = [];

            foreach (CountryCodeToRegionCodeMap::$countryCodeToRegionCodeMap as $code => $regions) {
                foreach ($regions as $region) {
                    if (in_array($region, $countryCodes)) {
                        $relevantCountryCodesMap[$region] = $code;
                    }
                }
            }

            foreach ($countryCodes as $region) {
                if (array_key_exists($region, $relevantCountryCodesMap)) {
                    $payloadCountryCodes[] = [
                        $region,
                        // Based on https://nick.blog/2018/07/27/php-display-country-flag-emoji-from-iso-3166-1-alpha-2-country-codes/
                        mb_convert_encoding('&#' . (127397 + ord($region[0])) . ';', 'UTF-8', 'HTML-ENTITIES')
                        . mb_convert_encoding('&#' . (127397 + ord($region[1])) . ';', 'UTF-8', 'HTML-ENTITIES'),
                        $relevantCountryCodesMap[$region],
                    ];
                }
            }
        }

        return [
            'flamarktPhoneNumberCountryCodes' => $payloadCountryCodes,
            'flamarktPhoneNumberUseAnyPrefix' => $serializer->getActor()->hasPermission('flamarkt-phone-number.useAnyPrefix'),
            'flamarktPhoneNumberOnSignup' => $serializer->getActor()->hasPermission('flamarkt-phone-number.editOwn') ? ($this->settings->get('flamarkt-phone-number.required') ? 'required' : 'optional') : false,
        ];
    }
}
