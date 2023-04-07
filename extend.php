<?php

namespace Flamarkt\PhoneNumber;

use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Api\Serializer\UserSerializer;
use Flarum\Extend;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\Event\Saving;
use Flarum\User\Filter\UserFilterer;
use Flarum\User\Search\UserSearcher;
use Flarum\User\User;

$extenders = [
    (new Extend\Frontend('backoffice'))
        ->js(__DIR__ . '/js/dist/backoffice.js'),

    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/resources/less/forum.less'),

    new Extend\Locales(__DIR__ . '/resources/locale'),

    (new Extend\ApiSerializer(UserSerializer::class))
        ->attributes(UserAttributes::class),

    (new Extend\ApiSerializer(ForumSerializer::class))
        ->attributes(ForumAttributes::class),

    (new Extend\Event())
        ->listen(Saving::class, Listeners\SaveUser::class),

    (new Extend\Filter(UserFilterer::class))
        ->addFilter(Gambit\PhoneNumberGambit::class),
    (new Extend\SimpleFlarumSearch(UserSearcher::class))
        ->addGambit(Gambit\PhoneNumberGambit::class),

    (new Extend\Policy())
        ->modelPolicy(User::class, Access\UserPolicy::class),
];

if (class_exists(Scout::class)) {
    $extenders[] = (new Scout(User::class))
        ->listenSaved(Event\PhoneNumberUpdated::class, function (Event\PhoneNumberUpdated $event) {
            return $event->user;
        })
        ->attributes(function (User $user): array {
            if (!resolve(SettingsRepositoryInterface::class)->get('flamarkt-phone-number.searchable')) {
                return [];
            }

            return [
                'emailPhoneNumber' => $user->flamarkt_phone_number,
            ];
        });
}

return $extenders;
