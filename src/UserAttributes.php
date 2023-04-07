<?php

namespace Flamarkt\PhoneNumber;

use Flarum\Api\Serializer\UserSerializer;
use Flarum\User\User;

class UserAttributes
{
    public function __invoke(UserSerializer $serializer, User $user): array
    {
        if ($serializer->getActor()->cannot('viewFlamarktPhoneNumber', $user)) {
            return [];
        }

        return [
            'flamarktPhoneNumber' => (string)$user->flamarkt_phone_number,
            'canEditFlamarktPhoneNumber' => $serializer->getActor()->can('editFlamarktPhoneNumber', $user),
        ];
    }
}
