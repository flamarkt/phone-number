<?php

namespace Flamarkt\PhoneNumber\Access;

use Flarum\User\Access\AbstractPolicy;
use Flarum\User\User;

class UserPolicy extends AbstractPolicy
{
    public function viewFlamarktPhoneNumber(User $actor, User $user)
    {
        if ($actor->can('backoffice')) {
            return $this->allow();
        }

        if ($user->id === $actor->id) {
            return $this->allow();
        }
    }

    public function editFlamarktPhoneNumber(User $actor, User $user)
    {
        if ($actor->can('backoffice')) {
            return $this->allow();
        }

        if ($user->id === $actor->id || !$user->exists) {
            return $actor->hasPermission('flamarkt-phone-number.editOwn');
        }
    }
}
