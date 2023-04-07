<?php

namespace Flamarkt\PhoneNumber\Event;

use Flarum\User\User;

class PhoneNumberUpdated
{
    public function __construct(
        public User    $user,
        public User    $actor,
        public ?string $oldPhoneNumber = null
    )
    {
    }
}
