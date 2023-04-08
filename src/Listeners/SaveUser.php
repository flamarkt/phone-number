<?php

namespace Flamarkt\PhoneNumber\Listeners;

use Flamarkt\PhoneNumber\Event\PhoneNumberUpdated;
use Flarum\Foundation\ValidationException;
use Flarum\Locale\Translator;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\Event\Saving;
use Illuminate\Contracts\Validation\Factory;
use Illuminate\Support\Arr;
use libphonenumber\CountryCodeToRegionCodeMap;
use libphonenumber\NumberParseException;
use libphonenumber\PhoneNumberFormat;
use libphonenumber\PhoneNumberUtil;

class SaveUser
{
    public function __construct(
        protected SettingsRepositoryInterface $settings,
        protected Factory                     $validation,
        protected Translator                  $translator
    )
    {
    }

    public function handle(Saving $event): void
    {
        $attributes = (array)Arr::get($event->data, 'attributes');
        $required = (bool)$this->settings->get('flamarkt-phone-number.required');

        // If field is required but missing on creation, force it to be validated
        if ($required && !$event->user->exists && !Arr::exists($attributes, 'flamarktPhoneNumber') && $event->user->hasPermission('flamarkt-phone-number.editOwn')) {
            $attributes['flamarktPhoneNumber'] = '';
        }

        if (Arr::exists($attributes, 'flamarktPhoneNumber')) {
            if ($event->actor->cannot('editFlamarktPhoneNumber', $event->user)) {
                // Throw validation error instead of PermissionDeniedException to allow for easier troubleshooting
                throw new ValidationException([
                    'flamarktPhoneNumber' => $this->translator->trans('flamarkt-phone-number.api.error.cannotEdit'),
                ]);
            }

            // TODO: use User validator so errors can be shown at the same time as others
            $this->validation->make($attributes, [
                'flamarktPhoneNumber' => ['required', 'regex:~^\+[0-9() .]+$~'],
            ])->validate();

            $phoneUtil = PhoneNumberUtil::getInstance();

            $rawPhoneNumber = (string)Arr::get($attributes, 'flamarktPhoneNumber');
            $newPhoneNumber = null;

            // If the number is way too short, we'll assume only the prefix got selected by the frontend UI
            // And there's no actual number following
            if (strlen($rawPhoneNumber) > 4) {
                try {
                    $proto = $phoneUtil->parse($rawPhoneNumber);

                    if (!$phoneUtil->isValidNumber($proto)) {
                        throw new ValidationException([
                            'flamarktPhoneNumber' => $this->translator->trans('flamarkt-phone-number.api.error.invalidPattern'),
                        ]);
                    }

                    // Should also be caught by the initial regex but just to be certain before doing tests on the value
                    if (!$proto->hasCountryCode()) {
                        throw new ValidationException([
                            'flamarktPhoneNumber' => $this->translator->trans('flamarkt-phone-number.api.error.missingCountryCode'),
                        ]);
                    }

                    if ($event->actor->cannot('flamarkt-phone-number.useAnyPrefix')) {
                        $countryCodes = explode(',', $this->settings->get('flamarkt-phone-number.selectedPrefixes'));

                        if (count(array_intersect($countryCodes, array_values(CountryCodeToRegionCodeMap::$countryCodeToRegionCodeMap[$proto->getCountryCode()]))) === 0) {
                            throw new ValidationException([
                                'flamarktPhoneNumber' => $this->translator->trans('flamarkt-phone-number.api.error.countryCodeNotAllowed', [
                                    'prefix' => '+' . $proto->getCountryCode(),
                                ]),
                            ]);
                        }
                    }

                    $newPhoneNumber = $phoneUtil->format($proto, PhoneNumberFormat::E164);
                } catch (NumberParseException $exception) {
                    if ($exception->getErrorType() == NumberParseException::INVALID_COUNTRY_CODE) {
                        throw new ValidationException([
                            'flamarktPhoneNumber' => $this->translator->trans('flamarkt-phone-number.api.error.invalidCountryCode'),
                        ]);
                    }

                    throw new ValidationException([
                        'flamarktPhoneNumber' => $this->translator->trans('flamarkt-phone-number.api.error.invalidFormat'),
                    ]);
                }
            }

            $oldPhoneNumber = $event->user->flamarkt_phone_number;

            if ($newPhoneNumber !== $oldPhoneNumber) {
                $event->user->flamarkt_phone_number = $newPhoneNumber;

                $event->user->raise(
                    new PhoneNumberUpdated($event->user, $event->actor, $oldPhoneNumber)
                );
            }
        }
    }
}
