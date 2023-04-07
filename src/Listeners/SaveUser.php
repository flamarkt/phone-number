<?php

namespace Flamarkt\PhoneNumber\Listeners;

use Flamarkt\PhoneNumber\Event\PhoneNumberUpdated;
use Flarum\Foundation\ValidationException;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\Event\Saving;
use Illuminate\Contracts\Validation\Factory;
use Illuminate\Support\Arr;
use libphonenumber\NumberParseException;
use libphonenumber\PhoneNumberFormat;
use libphonenumber\PhoneNumberUtil;

class SaveUser
{
    public function __construct(
        protected SettingsRepositoryInterface $settings,
        protected Factory                     $validation
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
            $event->actor->assertCan('editFlamarktPhoneNumber', $event->user);

            // TODO: use User validator so errors can be shown at the same time as others
            $this->validation->make($attributes, [
                'flamarktPhoneNumber' => ['required', 'regex:~^\+[0-9() .]+$~'],
            ])->validate();

            $phoneUtil = PhoneNumberUtil::getInstance();

            $rawPhoneNumber = (string)Arr::get($attributes, 'flamarktPhoneNumber');
            $newPhoneNumber = null;

            if ($rawPhoneNumber) {
                try {
                    $proto = $phoneUtil->parse($rawPhoneNumber);

                    if (!$phoneUtil->isValidNumber($proto)) {
                        throw new ValidationException([
                            'flamarktPhoneNumber' => 'Invalid phone number',
                        ]);
                    }

                    $newPhoneNumber = $phoneUtil->format($proto, PhoneNumberFormat::E164);
                } catch (NumberParseException $exception) {
                    throw new ValidationException([
                        'flamarktPhoneNumber' => 'Invalid phone number #' . $exception->getErrorType(),
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
